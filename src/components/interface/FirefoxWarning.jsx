import { useState, useEffect } from 'react'
import { useLanguage } from '@context/LanguageContext'

export default function FirefoxWarning() {
  const [isFirefox, setIsFirefox] = useState(false)
  const [dismissed, setDismissed] = useState(false)
  const { t } = useLanguage()

  useEffect(() => {
    const isFirefoxBrowser = navigator.userAgent.includes('Firefox')
    const wasDismissed = localStorage.getItem('firefox-warning-dismissed') === 'true'
    
    setIsFirefox(isFirefoxBrowser)
    setDismissed(wasDismissed)
  }, [])

  const handleDismiss = () => {
    localStorage.setItem('firefox-warning-dismissed', 'true')
    setDismissed(true)
  }

  if (!isFirefox || dismissed) return null

  return (
    <div className="firefox-warning" role="alert">
      <div className="firefox-warning__content">
        <span>⚠️</span>
        <p>{t.firefox.warningMessage}</p>
        <button 
          onClick={handleDismiss}
          className="firefox-warning__dismiss"
        >
          {t.firefox.dismiss}
        </button>
      </div>
    </div>
  )
}