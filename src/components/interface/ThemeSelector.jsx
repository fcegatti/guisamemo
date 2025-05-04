import { useTheme } from '@context/ThemeContext'
import { useLanguage } from '@context/LanguageContext'

export default function ThemeSelector () {
  const { theme, toggleTheme } = useTheme()
  const { t } = useLanguage()

  const isLight = theme === 'light'
  const icon = isLight ? '🌙' : '☀️'
  const label = isLight ? t.theme.switchToDark : t.theme.switchToLight

  return (
    <button
      onClick={toggleTheme}
      className='themeselector__btn'
      aria-label={label}
      title={label}
    >
      <span aria-hidden='true' className='themeselector__icon'>{icon}</span>
    </button>
  )
}
