import { useEffect, useState } from 'react'
import { useLanguage } from '@context/LanguageContext'

export default function UpdateBanner () {
  const [showBanner, setShowBanner] = useState(false)
  const { t } = useLanguage()

  useEffect(() => {
    const onUpdate = () => setShowBanner(true)
    window.addEventListener('sw-update', onUpdate)
    return () => window.removeEventListener('sw-update', onUpdate)
  }, [])

  if (!showBanner) return null

  return (
    <div
      className='update-banner'
      role='alert'
      aria-live='assertive'
    >
      <p>{t.update.message}</p>
      <p className='update-banner__instruction'>
        {t.update.instruction}
      </p>
      <button
        onClick={() => window.location.reload()}
        className='update-banner__button'
        aria-label={t.update.button}
      >
        {t.update.button}
      </button>
    </div>
  )
}
