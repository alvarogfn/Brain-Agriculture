import type { UseQueryOptions } from '@tanstack/react-query';

import type { HttpError } from '@/helpers/http-error';

type QueryOptions<QueryFnData extends (...args: unknown[]) => unknown> =
  UseQueryOptions<
    Awaited<ReturnType<QueryFnData>>,
    HttpError,
    Awaited<ReturnType<QueryFnData>>,
    Readonly<[string, ...Parameters<QueryFnData>]>
  >;

type QueryReturnFn<QueryFnData extends (...args: unknown[]) => unknown> = (
  fetchParams: Parameters<QueryFnData>,
  options?: Omit<QueryOptions<QueryFnData>, 'queryFn' | 'queryKey'>,
) => QueryOptions<QueryFnData>;

export function defineQuery<
  QueryFnData extends (...args: unknown[]) => unknown,
>(query: QueryReturnFn<QueryFnData>): QueryReturnFn<QueryFnData> {
  return (...args) => query(...args);
}
