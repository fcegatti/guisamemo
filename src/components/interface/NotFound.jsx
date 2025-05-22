import { useLanguage } from '@context/LanguageContext'
import { useNavigate } from 'react-router-dom'

export default function NotFound () {
  const { t } = useLanguage()
  const navigate = useNavigate()

  return (
    <main className='notfound' role='main' aria-labelledby='notfound-title'>
      <h1 id='notfiund-title' className='notfound__code'>404</h1>
      <p className='notfound__message'>{t.errors.notFound}</p>
      <img
        src='/cards/fallback.webp'
        alt=''
        className='notfound__image'
        aria-hidden='true'
      />
      <button
        onClick={() => navigate('/')}
        className='notfound__button'
      >
        {t.actions.backHome}
      </button>
    </main>
  )
}
