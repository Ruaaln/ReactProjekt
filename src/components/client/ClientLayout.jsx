import { Outlet, NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import HeaderSearch from './HeaderSearch.jsx';
import LanguageSwitcher from './LanguageSwitcher.jsx';
import Footer from './Footer.jsx';

export default function ClientLayout() {
  const { t } = useTranslation();

  return (
    <div>
      <header className="header">
        <div className="container header-inner">
          <div>
            <strong>{t('appName')}</strong>
          </div>
          <nav>
            <NavLink to="/">{t('nav.home')}</NavLink>
            <NavLink to="/listing">{t('nav.explore')}</NavLink>
            <NavLink to="/admin/login">{t('nav.admin')}</NavLink>
          </nav>
          <LanguageSwitcher />
        </div>
      </header>
      <HeaderSearch />
      <Outlet />
      <Footer />
    </div>
  );
}
