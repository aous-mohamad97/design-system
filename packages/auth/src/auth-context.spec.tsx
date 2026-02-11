import { renderHook, act } from '@testing-library/react-hooks';
import { ReactNode } from 'react';
import { AuthProvider, useAuth } from './auth-context';
import type { AuthUser } from './types';

vi.mock('./api-client', () => {
  class MockClient {
    async login() {
      return {
        accessToken: 'token',
        user: {
          id: '1',
          email: 'admin@example.com',
          tenantId: 'tenant-1',
          roles: ['TENANT_ADMIN'],
        } as AuthUser,
      };
    }
    async logout() {}
    async refresh() {
      return { accessToken: 'token-2' };
    }
    async me() {
      return null;
    }
  }
  return {
    AuthApiClient: MockClient,
  };
});

function wrapper({ children }: { children: ReactNode }) {
  return (
    <AuthProvider baseUrl="http://localhost:3000">
      {children}
    </AuthProvider>
  );
}

describe('AuthProvider', () => {
  it('logs in and sets user', async () => {
    const { result } = renderHook(() => useAuth(), { wrapper });

    await act(async () => {
      await result.current.login({
        email: 'admin@example.com',
        password: 'x',
        tenantKey: 'default',
      });
    });

    expect(result.current.user?.email).toBe('admin@example.com');
    expect(result.current.status).toBe('authenticated');
  });
});

