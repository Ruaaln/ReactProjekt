import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export default function AdminLoginPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    if (username === 'admin' && password === 'admin123') {
      localStorage.setItem('admin-password', 'admin123');
      navigate('/admin/places');
      return;
    }
    setError(t('admin.login.error'));
  };

  return (
    <main className="page">
      <div className="container" style={{ maxWidth: '420px' }}>
        <h2 className="section-title">{t('admin.login.title')}</h2>
        <form className="card" style={{ padding: '24px' }} onSubmit={handleSubmit}>
          <label className="muted" htmlFor="username">
            {t('admin.login.username')}
          </label>
          <input
            id="username"
            className="input"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
          />
          <label className="muted" htmlFor="password" style={{ marginTop: '12px' }}>
            {t('admin.login.password')}
          </label>
          <input
            id="password"
            type="password"
            className="input"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
          {error && (
            <p className="muted" style={{ marginTop: '12px' }}>
              {error}
            </p>
          )}
          <button type="submit" className="btn" style={{ marginTop: '16px' }}>
            {t('admin.login.submit')}
          </button>
        </form>
      </div>
    </main>
  );
}
