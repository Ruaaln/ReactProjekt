import { useTranslation } from 'react-i18next';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

export default function HeaderSearch() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [term, setTerm] = useState(searchParams.get('q') || '');

  useEffect(() => {
    setTerm(searchParams.get('q') || '');
  }, [searchParams]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const params = new URLSearchParams(searchParams);
    if (term) {
      params.set('q', term);
    } else {
      params.delete('q');
    }
    navigate(`/listing?${params.toString()}`);
  };

  return (
    <section className="hero">
      <div className="container">
        <h1>{t('search.placeholder')}</h1>
        <form onSubmit={handleSubmit}>
          <input
            className="input"
            value={term}
            onChange={(event) => setTerm(event.target.value)}
            placeholder={t('search.placeholder')}
          />
        </form>
      </div>
    </section>
  );
}
