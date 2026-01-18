import { useTranslation } from 'react-i18next';

export default function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="footer">
      <div className="container">
        <strong>{t('appName')}</strong>
        <p>{t('footer.tagline')}</p>
      </div>
    </footer>
  );
}
