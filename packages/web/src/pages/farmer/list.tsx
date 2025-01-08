import { useInfiniteQuery } from '@tanstack/react-query';

import { queryInfiniteFarmerFindAll } from '@/api/farmer-find-all';
import { Box } from '@/components/box';
import { Button } from '@/components/button';
import { Text } from '@/components/text';
import { useTranslation } from '@/i18n';

function FarmerListPage() {
  const { t } = useTranslation();
  const { data, fetchNextPage, hasNextPage, isPending } = useInfiniteQuery(
    queryInfiniteFarmerFindAll([], { refetchOnMount: 'always' }),
  );

  const content = data?.pages.flatMap((page) => page.content) || [];

  return (
    <Box as="main" p="4">
      {isPending && <Text>{t('loading')}</Text>}
      <Box as="table" w="100%">
        <Box as="thead" fontWeight="bold">
          <tr>
            <td>{t('farmerName')}</td>
            <td>{t('farmerName')}</td>
          </tr>
        </Box>
        <tbody>
          {content.map((farmer) => {
            return (
              <tr key={farmer.documentId}>
                <td>{farmer.name}</td>
                <td>{farmer.documentId}</td>
              </tr>
            );
          })}
        </tbody>
      </Box>
      {hasNextPage && (
        <Button onClick={() => fetchNextPage()}>{t('next')}</Button>
      )}
    </Box>
  );
}

export default FarmerListPage;
