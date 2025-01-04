import { Box } from '@/components/box';
import { Button } from '@/components/button';
import { Input } from '@/components/input';
import { Text } from '@/components/text';
import { useTranslation } from '@/i18n';

function FarmerPage() {
  const { t } = useTranslation();

  return (
    <main>
      <Box as="form" display="flex" flexDirection="column" gap="5" p="4">
        <Text as="h2">{t('createNewFarmer')}</Text>
        <Input labelText={t('farmerName')} />
        <Input labelText={t('identifier')} />
        <Button alignSelf="end">{t('create')}</Button>
      </Box>
    </main>
  );
}

export default FarmerPage;
