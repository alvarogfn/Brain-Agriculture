import { useTranslation } from '@/i18n';

function FarmCreatePage() {
  const { t } = useTranslation();

  return (
    <main>
      <form>
        <h2>{t('createNewFarm')}</h2>
        <label>
          {t('farmerOwner')}
          <input />
        </label>
        <label>
          {t('farmName')}
          <input />
        </label>
        <label>
          {t('farmState')}
          <input />
        </label>
        <label>
          {t('farmCity')}
          <input />
        </label>
        <label>
          {t('arableArea')}
          <input />
          {t('inHectare')}
        </label>
        <label>
          {t('vegetationArea')}
          <input />
          {t('inHectare')}
        </label>
        <button>{t('createFarm')}</button>
      </form>
    </main>
  );
}

export default FarmCreatePage;
