import {
  QueryClient,
  type DefaultOptions,
  type QueryClientConfig,
  useMutation,
  useQuery,
  type UseMutationOptions,
  type UseMutationResult,
  type UseQueryOptions,
  type UseQueryResult,
} from '@tanstack/react-query';
import { defaultTokenStorage } from './token-storage';
import { useAuth } from './auth-context';
import { AuthError } from './api-client';

export interface CreateAuthedQueryClientOptions {
  baseConfig?: QueryClientConfig;
}

export function createAuthedQueryClient(
  options: CreateAuthedQueryClientOptions = {},
): QueryClient {
  const defaultOptions: DefaultOptions = {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
    mutations: {
      retry: 0,
    },
  };

  const config: QueryClientConfig = {
    ...options.baseConfig,
    defaultOptions: {
      ...defaultOptions,
      ...(options.baseConfig?.defaultOptions ?? {}),
    },
  };

  const client = new QueryClient(config);

  client.setDefaultOptions({
    ...client.getDefaultOptions(),
    queries: {
      ...client.getDefaultOptions().queries,
      queryFn: async ({ queryKey }) => {
        const [url, init] = queryKey as [string, RequestInit?];
        const accessToken = defaultTokenStorage.getAccessToken();
        const res = await fetch(url, {
          ...(init ?? {}),
          headers: {
            ...(init?.headers ?? {}),
            ...(accessToken
              ? { Authorization: `Bearer ${accessToken}` }
              : {}),
          },
        });
        if (!res.ok) {
          throw new Error('Request failed');
        }
        return res.json();
      },
    },
  });

  return client;
}

function isAuthError401(error: unknown): boolean {
  return (
    error instanceof AuthError &&
    (error.status === 401 || error.code === 'UNAUTHENTICATED')
  );
}

export function useAuthedQuery<TQueryFnData, TError = unknown, TData = TQueryFnData, TQueryKey extends readonly unknown[] = readonly unknown[]>(
  options: UseQueryOptions<TQueryFnData, TError, TData, TQueryKey> & {
    queryFn: () => Promise<TQueryFnData>;
  },
): UseQueryResult<TData, TError> {
  const { refresh, logout } = useAuth();

  const wrappedQueryFn = async () => {
    try {
      return await options.queryFn();
    } catch (err) {
      if (isAuthError401(err)) {
        try {
          await refresh();
          return await options.queryFn();
        } catch {
          await logout();
        }
      }
      throw err;
    }
  };

  return useQuery({
    ...options,
    queryFn: wrappedQueryFn,
  });
}

export function useAuthedMutation<TData = unknown, TError = unknown, TVariables = void, TContext = unknown>(
  options: UseMutationOptions<TData, TError, TVariables, TContext> & {
    mutationFn: (variables: TVariables) => Promise<TData>;
  },
): UseMutationResult<TData, TError, TVariables, TContext> {
  const { refresh, logout } = useAuth();

  const wrappedMutationFn = async (variables: TVariables) => {
    try {
      return await options.mutationFn(variables);
    } catch (err) {
      if (isAuthError401(err)) {
        try {
          await refresh();
          return await options.mutationFn(variables);
        } catch {
          await logout();
        }
      }
      throw err;
    }
  };

  return useMutation({
    ...options,
    mutationFn: wrappedMutationFn,
  });
}

