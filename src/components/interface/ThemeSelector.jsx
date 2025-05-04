import { useTheme } from '@context/ThemeContext'

export default function ThemeSelector () {
  const { theme, toggleTheme } = useTheme()

  const isLight = theme === 'light'
  const icon = isLight ? '🌙' : '☀️'
  const label = isLight ? 'Activar modo oscuro' : 'Activar modo claro'

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
