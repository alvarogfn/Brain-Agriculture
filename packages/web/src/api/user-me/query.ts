import { defineQuery } from '@/helpers/define-query';

import { fetchUserMe } from './fetch';

export const queryUserMe = defineQuery<typeof fetchUserMe>(
  (fetchParams, queryOptions) => ({
    queryFn: () => fetchUserMe(...fetchParams),
    queryKey: [''] as const,
    ...queryOptions,
  }),
);
