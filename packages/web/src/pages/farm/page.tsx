import type { SubmitHandler } from 'react-hook-form';
import { useForm } from 'react-hook-form';
import { useFetcher } from 'react-router';

import { yupResolver } from '@hookform/resolvers/yup';

import { Box } from '@/components/box';
import { Button } from '@/components/button';
import { FieldForm } from '@/components/field-form';
import { Text } from '@/components/text';
import { useTranslation } from '@/i18n';
import type { FarmCreateSchema } from '@/validators/farm-create-schema';
import { farmCreateSchema } from '@/validators/farm-create-schema';

function FarmCreatePage() {
  const { t } = useTranslation();
  const fetcher = useFetcher();

  const methods = useForm({
    resolver: yupResolver(farmCreateSchema),
  });

  const handleSubmit: SubmitHandler<FarmCreateSchema> = (data) => {
    return fetcher.submit(
      { ...data, farmOwner: data.farmOwner.id },
      { action: '/farm/create', method: 'POST' },
    );
  };

  return (
    <Box as="main" p="5">
      <fetcher.Form onSubmit={methods.handleSubmit(handleSubmit)}>
        <Box display="flex" flexDirection="column" gap="3">
          <Text as="h2">{t('createNewFarm')}</Text>
          <FieldForm
            control={methods.control}
            items={[{ id: 1, name: 'John Doe' }]}
            itemToString={(option) => option?.name ?? ''}
            label={t('farmOwner')}
            name="farmOwner"
            type="combobox"
          />
          <FieldForm
            control={methods.control}
            label={t('farmName')}
            name="farmName"
            type="text"
          />
          <FieldForm
            control={methods.control}
            label={t('farmState')}
            name="farmState"
            type="text"
          />
          <FieldForm
            control={methods.control}
            label={t('farmCity')}
            name="farmCity"
            type="text"
          />
          <FieldForm
            control={methods.control}
            helperText={t('inHectare')}
            label={t('farmArea')}
            maskOpts={{ mask: Number, min: 1, thousandsSeparator: '.' }}
            name="farmArea"
            type="mask"
          />
          <FieldForm
            control={methods.control}
            helperText={t('inHectare')}
            label={t('arableArea')}
            maskOpts={{ mask: Number, min: 1, thousandsSeparator: '.' }}
            name="arableArea"
            type="mask"
          />
          <FieldForm
            control={methods.control}
            helperText={t('inHectare')}
            label={t('vegetationArea')}
            maskOpts={{ mask: Number, min: 1, thousandsSeparator: '.' }}
            name="vegetationArea"
            type="mask"
          />
          <Button alignSelf="end" type="submit">
            {t('createFarm')}
          </Button>
        </Box>
      </fetcher.Form>
    </Box>
  );
}

export default FarmCreatePage;
