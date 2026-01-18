import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export default function AdminLayout() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('admin-password');
    navigate('/admin/login');
  };

  return (
    <div className="admin-layout">
      <aside className="admin-sidebar">
        <strong>{t('appName')}</strong>
        <NavLink to="/admin/places">{t('admin.sidebar.places')}</NavLink>
        <NavLink to="/admin/places/new">{t('admin.sidebar.create')}</NavLink>
        <button type="button" className="btn" onClick={handleLogout}>
          {t('admin.sidebar.logout')}
        </button>
      </aside>
      <main className="admin-content">
        <Outlet />
      </main>
    </div>
  );
}
