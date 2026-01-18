import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export default function NotFoundPage() {
  const { t } = useTranslation();

  return (
    <main className="page">
      <div className="container">
        <h2 className="section-title">{t('notFound.title')}</h2>
        <p className="muted">{t('notFound.message')}</p>
        <Link to="/" className="btn" style={{ marginTop: '16px' }}>
          {t('notFound.back')}
        </Link>
      </div>
    </main>
  );
}
