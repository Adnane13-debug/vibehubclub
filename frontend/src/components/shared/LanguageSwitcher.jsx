import { useTranslation } from 'react-i18next'

function LanguageSwitcher() {
  const { i18n } = useTranslation()
  const langs = [
    { code: 'en', label: 'EN', flag: '🇬🇧' },
    { code: 'fr', label: 'FR', flag: '🇫🇷' },
  ]
  
  return (
    <div className="flex items-center gap-1">
      {langs.map(lang => (
        <button
          key={lang.code}
          onClick={() => i18n.changeLanguage(lang.code)}
          className={`px-2 py-1 text-xs font-bold rounded-md transition-colors
            ${i18n.language === lang.code
              ? 'bg-primary text-slate-900'
              : 'text-slate-500 hover:text-slate-900'}`}
        >
          {lang.flag} {lang.label}
        </button>
      ))}
    </div>
  )
}

export default LanguageSwitcher
