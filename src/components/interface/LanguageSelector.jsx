import { useNavigate } from 'react-router-dom'
import { useLanguage } from '@context/LanguageContext'

export default function LanguageSelector () {
  const { t, lang, setLang } = useLanguage()
  const navigate = useNavigate()

  const toggleLang = () => {
    const newLang = lang === 'es' ? 'gl' : 'es'
    setLang(newLang)
    navigate(`/${newLang}`, { replace: true })
  }

  const flagSrc = lang === 'es' ? '/galicia.webp' : '/spain.webp'
  const flagAlt = lang === 'es' ? t.lang.switchToGl : t.lang.switchToEs

  return (
    <button
      type='button'
      onClick={toggleLang}
      className='languageselector__button'
      aria-label={flagAlt}
      title={flagAlt}
    >
      <img
        src={flagSrc}
        alt={flagAlt}
        width='30'
        height='20'
        className='languageselector__flag'
        aria-hidden='true'
      />
    </button>
  )
}
