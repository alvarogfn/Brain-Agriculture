import type {
  FarmerFindAllResponse,
  PaginationParams,
} from 'brain-agriculture-backend-types';

import { defineInfiniteQuery } from '@/helpers/define-infinite-query';

export const fetchFarmerFindAll = jest.fn(
  (queryParams: PaginationParams): Promise<FarmerFindAllResponse> => {
    return Promise.resolve({
      content: [],
      first: true,
      last: true,
      page: 0,
      pages: 0,
      size: 0,
      total: 0,
      ...queryParams,
    });
  },
);

export const queryInfiniteFarmerFindAll = defineInfiniteQuery<
  typeof fetchFarmerFindAll
>((fetchParams, queryOptions) => ({
  getNextPageParam: ({ last, page }) => (last ? page + 1 : undefined),
  getPreviousPageParam: ({ first, page }) => (first ? page - 1 : undefined),
  initialPageParam: 1,
  queryFn: ({ pageParam }) =>
    fetchFarmerFindAll({ page: Number(pageParam), ...fetchParams[0] }),
  queryKey: ['', ...fetchParams] as const,
  ...queryOptions,
}));
