import { useTranslation } from '@/i18n';

function CropCreatePage() {
  const { t } = useTranslation();

  return (
    <main>
      <section>
        <h2>{t('registeredFarmsAmount')}</h2>
      </section>

      <section>
        <h2>{t('hectareTotalAmount')}</h2>
      </section>

      <article>
        <h2>{t('moreDetails')}</h2>

        <section>
          <h3>{t('byState')}</h3>
          <div>chart</div>
        </section>

        <section>
          <h3>{t('byCrop')}</h3>
          <div>chart</div>
        </section>

        <section>
          <h3>{t('FarmlandUse')}</h3>
          <div>chart</div>
        </section>
      </article>
    </main>
  );
}

export default CropCreatePage;
