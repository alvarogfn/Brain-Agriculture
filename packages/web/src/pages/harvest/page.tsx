import { useTranslation } from '@/i18n';

function HarvestCreatePage() {
  const { t } = useTranslation();

  return (
    <main>
      <form>
        <h2>{t('createNewHarvest')}</h2>
        <label>
          {t('farmName')}
          <input />
        </label>
        <label>
          {t('harvestName')}
          <input />
        </label>
        <label>
          {t('Planted Crops')}
          <input type="checkbox" />
          <input type="checkbox" />
          <input type="checkbox" />
          <input type="checkbox" />
          <input type="checkbox" />
        </label>
        <button>{t('createHarvest')}</button>
      </form>
    </main>
  );
}

export default HarvestCreatePage;
