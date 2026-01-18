import { useTranslation } from 'react-i18next';

const languages = [
  { code: 'en', label: 'EN' },
  { code: 'az', label: 'AZ' },
  { code: 'ru', label: 'RU' }
];

export default function LanguageSwitcher() {
  const { i18n } = useTranslation();

  const handleChange = (code) => {
    i18n.changeLanguage(code);
    localStorage.setItem('language', code);
  };

  return (
    <div className="language-switcher">
      {languages.map((lang) => (
        <button
          key={lang.code}
          type="button"
          onClick={() => handleChange(lang.code)}
        >
          {lang.label}
        </button>
      ))}
    </div>
  );
}
