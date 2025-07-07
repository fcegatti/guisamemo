import { useNetworkStatus } from '@hooks/useNetworkStatus'
import { useLanguage } from '@context/LanguageContext'

export const OfflineBanner = () => {
  const isOnline = useNetworkStatus()
  const { t } = useLanguage()

  if (isOnline) return null

  return (
    <div className='offline-banner' role='alert' aria-live='polite'>
      <p>{t.offline.message}</p>
    </div>
  )
}
