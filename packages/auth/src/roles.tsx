import type { ReactNode } from 'react';
import { useAuthUser } from './auth-context';

export function useHasRole(requiredRoles: string[]): boolean {
  const user = useAuthUser();
  if (!user || !user.roles?.length || !requiredRoles.length) {
    return false;
  }
  return requiredRoles.some((role) => user.roles.includes(role));
}

export interface RoleProtectedProps {
  requiredRoles: string[];
  fallback?: ReactNode;
  children: ReactNode;
}

export function RoleProtected({
  requiredRoles,
  fallback = null,
  children,
}: RoleProtectedProps) {
  const allowed = useHasRole(requiredRoles);
  if (!allowed) {
    return <>{fallback}</>;
  }
  return <>{children}</>;
}

