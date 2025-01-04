import { useTranslation } from '@/i18n';

function FarmerPage() {
  const { t } = useTranslation();

  return (
    <main>
      <form>
        <h2>{t('createNewFarmer')}</h2>
        <label>
          {t('farmerName')}
          <input />
        </label>
        <label>
          {t('identifier')}
          <input />
        </label>
        <button>{t('create')}</button>
      </form>
    </main>
  );
}

export default FarmerPage;
