import { useLanguage } from '@context/LanguageContext'
import { useNavigate } from 'react-router-dom'

export default function NotFound () {
  const { t } = useLanguage()
  const navigate = useNavigate()

  return (
    <main className='notfound' role='main' aria-labelledby='notfound-title'>
      <h1 id='notfound-title' className='notfound__code'>{t.notFound.title}</h1>
      <p className='notfound__message'>{t.notFound.message}</p>
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
        {t.notFound.button}
      </button>
    </main>
  )
}
