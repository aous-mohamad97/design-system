import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import type {
  AuthState,
  AuthStatus,
  AuthUser,
  LoginPayload,
  TenantInfo,
} from './types';
import { AuthApiClient } from './api-client';
import { defaultTokenStorage } from './token-storage';

export interface AuthProviderProps {
  children: ReactNode;
  baseUrl: string;
  initialUser?: AuthUser | null;
  initialTenant?: TenantInfo | null;
}

interface AuthContextValue extends AuthState {
  login(payload: LoginPayload): Promise<void>;
  logout(): Promise<void>;
  refresh(): Promise<void>;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({
  children,
  baseUrl,
  initialUser = null,
  initialTenant = null,
}: AuthProviderProps) {
  const [status, setStatus] = useState<AuthStatus>('idle');
  const [user, setUser] = useState<AuthUser | null>(initialUser);
  const [tenant] = useState<TenantInfo | null>(initialTenant);

  const [accessToken, setAccessToken] = useState<string | null>(() =>
    defaultTokenStorage.getAccessToken(),
  );

  const api = useMemo(
    () =>
      new AuthApiClient({
        baseUrl,
      }),
    [baseUrl],
  );
  void api; // NOTE(dev-auth): api kept for future real implementation

  // NOTE(dev-auth): temporary simplified bootstrap logic.
  // Trust presence of a stored access token and avoid calling /auth/me or /auth/refresh.
  // TODO(auth): restore full bootstrap that calls api.me() and api.refresh().
  useEffect(() => {
    if (!accessToken) {
      if (status === 'idle') {
        setStatus('unauthenticated');
      }
      return;
    }

    if (!user) {
      // Use a fixed dev user while backend auth is simplified.
      setUser({
        id: 'dev-user-id',
        email: 'dev@example.com',
        tenantId: 'dev-tenant-id',
        roles: ['TENANT_ADMIN'],
      });
    }

    if (status !== 'authenticated') {
      setStatus('authenticated');
    }
  }, [accessToken, status, user]);

  // NOTE(dev-auth): temporary login implementation – accepts any credentials and
  // sets a fixed dev user + token. The real backend login call is disabled for now.
  // TODO(auth): switch back to api.login(payload) and use real tokens/user.
  const login = useCallback(
    async (payload: LoginPayload) => {
      setStatus('loading');
      try {
        const devUser: AuthUser = {
          id: 'dev-user-id',
          email: payload.email.toLowerCase(),
          tenantId: 'dev-tenant-id',
          roles: ['TENANT_ADMIN'],
        };

        // NOTE(dev-auth): derive a tenant key from email for per-customer behavior.
        // TODO(auth): replace with real tenantId from backend user record.
        const lowerEmail = payload.email.toLowerCase();
        let tenantKey = 'default';
        if (lowerEmail.includes('customer-a')) {
          tenantKey = 'customer-a';
        } else if (lowerEmail.includes('customer-b')) {
          tenantKey = 'customer-b';
        }
        if (typeof window !== 'undefined') {
          window.localStorage.setItem('ds_tenant_key', tenantKey);
        }

        defaultTokenStorage.setAccessToken('dev-access-token');
        setAccessToken('dev-access-token');
        setUser(devUser);
        setStatus('authenticated');
      } catch (error) {
        setUser(null);
        setStatus('unauthenticated');
        throw error;
      }
    },
    [],
  );

  // NOTE(dev-auth): temporary logout – clear local state/storage only.
  // TODO(auth): re-enable api.logout() call when real backend auth is restored.
  const logout = useCallback(async () => {
    try {
      // await api.logout();
    } finally {
      defaultTokenStorage.clear();
      setAccessToken(null);
      setUser(null);
      setStatus('unauthenticated');
    }
  }, []);

  // NOTE(dev-auth): temporary refresh – no-op, as tokens are fixed dev values.
  // TODO(auth): re-enable calling api.refresh() and updating access token.
  const refresh = useCallback(async () => {
    return;
  }, []);

  const value: AuthContextValue = {
    status,
    user,
    tenant,
    tokens: {
      accessToken,
      // We intentionally do not expose the raw refresh token via context;
      // keep it internal to storage, but maintain the AuthState shape.
      refreshToken: null,
    },
    login,
    logout,
    refresh,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return ctx;
}

export function useIsAuthenticated(): boolean {
  const { status } = useAuth();
  return status === 'authenticated';
}

export function useAuthUser(): AuthUser | null {
  const { user } = useAuth();
  return user;
}

