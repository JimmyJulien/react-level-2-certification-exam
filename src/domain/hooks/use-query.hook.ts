import { useEffect, useState } from "react";

export type QueryState<T> = {
  data: T | undefined;
  error: unknown;
  pending: boolean;
};

export type UseQueryProps<T> = {
  queryFn: (params: unknown) => Promise<T>;
  queryParams?: unknown;
  pendingFn?: () => void;
  successFn?: (data: T) => void;
  errorFn?: (error: unknown) => void;
  enabled?: boolean;
};

export function useQuery<T>({
  queryFn,
  queryParams,
  pendingFn,
  successFn,
  errorFn,
  enabled = true,
}: Readonly<UseQueryProps<T>>) {
  const [state, setState] = useState<QueryState<T>>({
    data: undefined,
    error: null,
    pending: false,
  });

  useEffect(() => {
    async function query() {
      try {
        setState({ ...state, pending: true });
        const data = await queryFn(queryParams);
        setState({ ...state, data, pending: false });
      } catch (error: unknown) {
        setState({ ...state, error, pending: false });
      }
    }

    if (enabled) {
      query();
    }
  }, [queryParams]);

  useEffect(() => {
    const { data, error, pending } = state;

    if (pending && pendingFn) {
      pendingFn();
    }

    if (data && successFn) {
      successFn(data);
    }

    if (error && errorFn) {
      errorFn(error);
    }
  }, [state]);

  return state;
}
