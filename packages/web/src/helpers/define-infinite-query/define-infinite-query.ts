import type {
  UseInfiniteQueryOptions,
  InfiniteData,
} from '@tanstack/react-query';

import type { HttpError } from '@/helpers/http-error';

type QueryOptions<QueryFnData extends (...args: any[]) => any> =
  UseInfiniteQueryOptions<
    Awaited<ReturnType<QueryFnData>>,
    HttpError,
    InfiniteData<Awaited<ReturnType<QueryFnData>>>,
    Awaited<ReturnType<QueryFnData>>,
    Readonly<[string, ...Parameters<QueryFnData>]>
  >;

type QueryReturnFn<QueryFnData extends (...args: any[]) => any> = (
  fetchParams: Parameters<QueryFnData>,
  options?: Omit<
    QueryOptions<QueryFnData>,
    | 'getNextPageParam'
    | 'getPreviousPageParam'
    | 'initialPageParam'
    | 'queryFn'
    | 'queryKey'
  >,
) => QueryOptions<QueryFnData>;

export function defineInfiniteQuery<
  QueryFnData extends (...args: any[]) => any,
>(query: QueryReturnFn<QueryFnData>): QueryReturnFn<QueryFnData> {
  return (...args) => query(...args);
}
