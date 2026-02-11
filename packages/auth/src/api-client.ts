import type { LoginPayload, AuthUser } from './types';
import { defaultTokenStorage } from './token-storage';

export interface AuthApiClientOptions {
  baseUrl: string;
}

export interface LoginResponse {
  accessToken: string;
  refreshToken: string;
  user: AuthUser;
}

export class AuthError extends Error {
  constructor(
    message: string,
    public readonly status: number,
    public readonly code?: string,
  ) {
    super(message);
    this.name = 'AuthError';
  }
}

export class AuthApiClient {
  private readonly baseUrl: string;

  constructor(options: AuthApiClientOptions) {
    this.baseUrl = options.baseUrl.replace(/\/+$/, '');
  }

  private get authHeaders(): HeadersInit {
    const accessToken = defaultTokenStorage.getAccessToken();
    if (!accessToken) {
      return {};
    }
    const headers = new Headers();
    headers.set('Authorization', `Bearer ${accessToken}`);
    return headers;
  }

  async login(payload: LoginPayload): Promise<LoginResponse> {
    const res = await fetch(`${this.baseUrl}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      } satisfies HeadersInit,
      credentials: 'include',
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      const status = res.status;
      let message = 'Login failed';
      let code = 'LOGIN_FAILED';

      try {
        const body = (await res.json()) as { message?: string; code?: string };
        if (typeof body.message === 'string') message = body.message;
        if (typeof body.code === 'string') code = body.code;
      } catch {
        // ignore parse errors
      }

      if (status === 401 || status === 400) {
        code = 'INVALID_CREDENTIALS';
      }

      throw new AuthError(message, status, code);
    }

    const data = (await res.json()) as LoginResponse;
    defaultTokenStorage.setAccessToken(data.accessToken);
    defaultTokenStorage.setRefreshToken(data.refreshToken);
    return data;
  }

  async refresh(): Promise<{ accessToken: string; refreshToken: string }> {
    const storedRefreshToken = defaultTokenStorage.getRefreshToken();
    if (!storedRefreshToken) {
      throw new AuthError('Missing refresh token', 401, 'NO_REFRESH_TOKEN');
    }

    const res = await fetch(`${this.baseUrl}/auth/refresh`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      } satisfies HeadersInit,
      credentials: 'include',
      body: JSON.stringify({ refreshToken: storedRefreshToken }),
    });

    if (!res.ok) {
      const status = res.status;
      throw new AuthError('Failed to refresh token', status, 'REFRESH_FAILED');
    }

    const data = (await res.json()) as {
      accessToken: string;
      refreshToken: string;
    };

    defaultTokenStorage.setAccessToken(data.accessToken);
    defaultTokenStorage.setRefreshToken(data.refreshToken);

    return data;
  }

  async logout(): Promise<void> {
    await fetch(`${this.baseUrl}/auth/logout`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...this.authHeaders,
      } satisfies HeadersInit,
      credentials: 'include',
    });
    defaultTokenStorage.clear();
  }

  async me(): Promise<AuthUser | null> {
    const accessToken = defaultTokenStorage.getAccessToken();
    const url = accessToken
      ? `${this.baseUrl}/auth/me?access_token=${encodeURIComponent(
          accessToken,
        )}`
      : `${this.baseUrl}/auth/me`;

    const res = await fetch(url, {
      headers: {
        ...this.authHeaders,
      } satisfies HeadersInit,
      credentials: 'include',
    });

    if (!res.ok) {
      const status = res.status;
      if (status === 401) {
        throw new AuthError('Unauthenticated', status, 'UNAUTHENTICATED');
      }
      throw new AuthError('Failed to load current user', status, 'ME_FAILED');
    }

    const data = (await res.json()) as AuthUser | null;
    return data;
  }
}

