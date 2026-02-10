export interface AuthUser {
  id: string;
  email: string;
  tenantId: string;
  roles: string[];
}

export interface TenantInfo {
  id: string;
  key?: string;
  name?: string;
}

export interface AuthTokens {
  accessToken: string | null;
  refreshToken: string | null;
}

export interface LoginPayload {
  email: string;
  password: string;
  /**
   * Optional explicit tenant key. When omitted, the backend will resolve
   * the tenant from the user record (email) instead.
   */
  tenantKey?: string;
}

export type AuthStatus =
  | 'idle'
  | 'loading'
  | 'authenticated'
  | 'unauthenticated';

export interface AuthState {
  status: AuthStatus;
  user: AuthUser | null;
  tenant: TenantInfo | null;
  tokens: AuthTokens;
}

