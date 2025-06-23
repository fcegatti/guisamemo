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
    <div className="firefoxwarning__overlay">
        
      <div className="firefoxwarning">
        <img
            src='/firefox-logo.webp'
            alt="Logo de Firefox"
            className="firefoxwarning__firefox-logo"
            aria-hidden='true'
        />

        <div className="firefoxwarning__message">
          <h2>{t.firefox.title}</h2>
          <p>{t.firefox.warningMessage}</p>
        </div>

        <button
          onClick={handleDismiss}
          className="firefoxwarning__dismiss-btn"
        >
          {t.firefox.dismiss}
        </button>
        <div className="firefoxwarning__handle" />
      </div>
    </div>
  )
}