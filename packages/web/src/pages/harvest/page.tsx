import type { SubmitHandler } from 'react-hook-form';
import { useForm } from 'react-hook-form';
import { useFetcher } from 'react-router';

import { yupResolver } from '@hookform/resolvers/yup';
import { MaskedRange } from 'imask';

import { Box } from '@/components/box';
import { Button } from '@/components/button';
import { FieldForm } from '@/components/field-form';
import { useTranslation } from '@/i18n';
import type { HarvestCreateSchema } from '@/validators/harvest-create-schema';
import { harvestCreateSchema } from '@/validators/harvest-create-schema';

function HarvestCreatePage() {
  const { t } = useTranslation();

  const fetcher = useFetcher();

  const methods = useForm({
    resolver: yupResolver(harvestCreateSchema),
  });

  const handleSubmit: SubmitHandler<HarvestCreateSchema> = (data) => {
    return fetcher.submit(
      { ...data, farmName: data.farmName.id },
      { action: '/harvest/create', method: 'POST' },
    );
  };

  return (
    <main>
      <fetcher.Form method="post" onSubmit={methods.handleSubmit(handleSubmit)}>
        <Box display="flex" flexDirection="column" gap="5" p="4">
          <h2>{t('createNewHarvest')}</h2>

          <FieldForm
            control={methods.control}
            items={[{ id: '1', name: 'Fazenda São João' }]}
            itemToString={(item) => item?.name ?? ''}
            label={t('farmName')}
            name="farmName"
            type="combobox"
          />

          <FieldForm
            control={methods.control}
            label={t('harvestName')}
            name="harvestName"
            type="text"
          />

          <FieldForm
            control={methods.control}
            label={t('harvestYear')}
            maskOpts={{
              from: 1900,
              lazy: false,
              mask: MaskedRange,
              placeholderChar: '#',
              to: 2999,
            }}
            name="harvestYear"
            type="mask"
          />

          <FieldForm
            control={methods.control}
            items={['milho', 'soja', 'café']}
            itemToKey={(item) => item ?? ''}
            itemToString={(item) => item ?? ''}
            label={t('crops')}
            name="crops"
            type="multi-select"
          />

          <Button alignSelf="end" mt="10">
            {t('createHarvest')}
          </Button>
        </Box>
      </fetcher.Form>
    </main>
  );
}

export default HarvestCreatePage;
