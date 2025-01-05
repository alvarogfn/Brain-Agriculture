import type { SubmitHandler } from 'react-hook-form';
import { useForm } from 'react-hook-form';
import { useFetcher } from 'react-router';

import { yupResolver } from '@hookform/resolvers/yup';

import { Box } from '@/components/box';
import { Button } from '@/components/button';
import { FieldForm } from '@/components/field-form';
import { Text } from '@/components/text';
import { useTranslation } from '@/i18n';
import type { FarmerCreateSchema } from '@/validators/farmer-create-schema';
import { farmerCreateSchema } from '@/validators/farmer-create-schema';

function FarmerPage() {
  const { t } = useTranslation();

  const fetcher = useFetcher();

  const methods = useForm({
    resolver: yupResolver(farmerCreateSchema),
  });

  const handleSubmit: SubmitHandler<FarmerCreateSchema> = (data) => {
    return fetcher.submit(data, { action: '/farmer/create', method: 'POST' });
  };

  return (
    <main>
      <fetcher.Form method="post" onSubmit={methods.handleSubmit(handleSubmit)}>
        <Box display="flex" flexDirection="column" gap="5" p="4">
          <Text as="h2">{t('addNewFarmer')}</Text>
          <FieldForm
            control={methods.control}
            label={t('farmerName')}
            name="farmerName"
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
            name="identifier"
            type="mask"
          />
          <Button alignSelf="end">{t('create')}</Button>
        </Box>
      </fetcher.Form>
    </main>
  );
}

export default FarmerPage;
