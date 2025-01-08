import type { AxiosError } from 'axios';
import type {
  FarmerFindAllResponse,
  PaginationParams,
} from 'brain-agriculture-backend-types';

import { defineInfiniteQuery } from '@/helpers/define-infinite-query';
import { HttpError } from '@/helpers/http-error';
import { mountURL } from '@/helpers/mount-url';
import axios from '@/lib/axios';

export const PATH_FARMER_FIND_ALL = '/farmer';

export async function fetchFarmerFindAll(
  queryParams?: PaginationParams,
): Promise<FarmerFindAllResponse> {
  try {
    const data = await axios.get<FarmerFindAllResponse>(
      mountURL(PATH_FARMER_FIND_ALL, { queryParams: queryParams }),
    );
    return data.data;
  } catch (error) {
    throw new HttpError(error as AxiosError);
  }
}

export const queryInfiniteFarmerFindAll = defineInfiniteQuery<
  typeof fetchFarmerFindAll
>((fetchParams, queryOptions) => ({
  getNextPageParam: ({ last, page }) => (last ? undefined : page + 1),
  getPreviousPageParam: ({ first, page }) => (first ? undefined : page - 1),
  initialPageParam: 1,
  queryFn: ({ pageParam }) =>
    fetchFarmerFindAll({ page: Number(pageParam), ...fetchParams[0] }),
  queryKey: [PATH_FARMER_FIND_ALL, ...fetchParams] as const,
  ...queryOptions,
}));
