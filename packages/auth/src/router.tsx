import type { ReactNode } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from './auth-context';

export interface ProtectedRouteProps {
  redirectTo?: string;
  children?: ReactNode;
}

export function ProtectedRoute({
  redirectTo = '/login',
  children,
}: ProtectedRouteProps) {
  const { status } = useAuth();

  if (status === 'loading') {
    return null;
  }

  if (status !== 'authenticated') {
    return <Navigate to={redirectTo} replace />;
  }

  return children ? <>{children}</> : <Outlet />;
}

export interface PublicOnlyRouteProps {
  redirectTo?: string;
  children?: ReactNode;
}

export function PublicOnlyRoute({
  redirectTo = '/',
  children,
}: PublicOnlyRouteProps) {
  const { status } = useAuth();

  if (status === 'loading') {
    return null;
  }

  if (status === 'authenticated') {
    return <Navigate to={redirectTo} replace />;
  }

  return children ? <>{children}</> : <Outlet />;
}

