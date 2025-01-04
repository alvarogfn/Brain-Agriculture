import { useTranslation } from '@/i18n';

function CropCreatePage() {
  const { t } = useTranslation();

  return (
    <main>
      <form>
        <h2>{t('createNewCrop')}</h2>
        <label>
          {t('cropName')}
          <input />
        </label>
        <button>{t('createCrop')}</button>
      </form>
    </main>
  );
}

export default CropCreatePage;
