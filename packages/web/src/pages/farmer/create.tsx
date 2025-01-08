import type { SubmitHandler } from 'react-hook-form';
import { useForm } from 'react-hook-form';
import { useFetcher, useRouteError } from 'react-router';

import { yupResolver } from '@hookform/resolvers/yup';

import { Box } from '@/components/box';
import { Button } from '@/components/button';
import { FieldForm } from '@/components/field-form';
import { Text } from '@/components/text';
import type { HttpError } from '@/helpers/http-error';
import { useTranslation } from '@/i18n';
import type { FarmerCreateSchema } from '@/validators/farmer-create-schema';
import { farmerCreateSchema } from '@/validators/farmer-create-schema';

function FarmerCreatePage() {
  const { t } = useTranslation();

  const fetcher = useFetcher();

  const error = useRouteError() as HttpError;

  const methods = useForm({
    resolver: yupResolver(farmerCreateSchema),
  });

  const handleSubmit: SubmitHandler<FarmerCreateSchema> = (data) => {
    return fetcher.submit(data, { action: '/farmer/create', method: 'POST' });
  };

  return (
    <Box as="main" p="4">
      <fetcher.Form method="post" onSubmit={methods.handleSubmit(handleSubmit)}>
        <Box display="flex" flexDirection="column" gap="5">
          <Text as="h2">{t('addNewFarmer')}</Text>
          <FieldForm
            control={methods.control}
            label={t('farmerName')}
            name="name"
            type="text"
          />
          <FieldForm
            control={methods.control}
            label={t('identifier')}
            maskOpts={{
              mask: [
                { mask: '000.000.000-00' },
                { mask: '00.000.000/0000-00' },
              ],
            }}
            name="documentId"
            type="mask"
          />
          <Button alignSelf="end">{t('create')}</Button>
        </Box>
        {error !== null && <Text>{error.toString()}</Text>}
      </fetcher.Form>
    </Box>
  );
}

export default FarmerCreatePage;
