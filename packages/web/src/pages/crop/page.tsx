import type { SubmitHandler } from 'react-hook-form';
import { useForm } from 'react-hook-form';
import { useFetcher } from 'react-router';

import { yupResolver } from '@hookform/resolvers/yup';

import { Box } from '@/components/box';
import { Button } from '@/components/button';
import { FieldForm } from '@/components/field-form';
import { Text } from '@/components/text';
import { useTranslation } from '@/i18n';
import type { CropCreateSchema } from '@/validators/crop-create-schema';
import { cropCreateSchema } from '@/validators/crop-create-schema';

function CropCreatePage() {
  const { t } = useTranslation();

  const fetcher = useFetcher();

  const methods = useForm({
    resolver: yupResolver(cropCreateSchema),
  });

  const handleSubmit: SubmitHandler<CropCreateSchema> = (data) => {
    return fetcher.submit(data, { action: '/crop/create', method: 'POST' });
  };

  return (
    <main>
      <fetcher.Form method="post" onSubmit={methods.handleSubmit(handleSubmit)}>
        <Box display="flex" flexDirection="column" gap="5" p="4">
          <Text as="h2">{t('createNewCrop')}</Text>
          <FieldForm
            control={methods.control}
            label={t('cropName')}
            name="cropName"
            type="text"
          />
          <Button alignSelf="end">{t('create')}</Button>
        </Box>
      </fetcher.Form>
    </main>
  );
}

export default CropCreatePage;
