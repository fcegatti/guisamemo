import { useState, useEffect, useRef } from 'react'
import { useLanguage } from '@context/LanguageContext'
import { useFocusTrap } from '@hooks/useFocusTrap'

export default function FirefoxWarning() {
  const [isFirefox, setIsFirefox] = useState(false)
  const [dismissed, setDismissed] = useState(false)
  const { t } = useLanguage()

  const modalRef = useRef(null)
  const messageRef = useRef(null)

  useFocusTrap(modalRef)

  useEffect(() => {
    const isFirefoxBrowser = navigator.userAgent.includes('Firefox')
    const wasDismissed = localStorage.getItem('firefox-warning-dismissed') === 'true'
    
    setIsFirefox(isFirefoxBrowser)
    setDismissed(wasDismissed)
  }, [])

  useEffect(() => {
    if (isFirefox && !dismissed && messageRef.current) {
      messageRef.current.focus()
    }
  }, [isFirefox, dismissed])

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        handleDismiss()
      }
    }
    
    if (isFirefox && !dismissed) {
      window.addEventListener('keydown', handleKeyDown)
      return () => window.removeEventListener('keydown', handleKeyDown)
    }
  }, [isFirefox, dismissed])

  const handleDismiss = () => {
    localStorage.setItem('firefox-warning-dismissed', 'true')
    setDismissed(true)
  }

  if (!isFirefox || dismissed) return null

  return (
    <div className="firefoxwarning__overlay"
         role="dialog"
         aria-modal="true"
         aria-labelledby="firefox-warning-message"
    >
        
      <div className="firefoxwarning" ref={modalRef}>
        <img
            src='/firefox-logo.webp'
            alt="Logo de Firefox"
            className="firefoxwarning__firefox-logo"
            aria-hidden='true'
            loading='lazy'
            decoding='async'
        />

        <div 
          className="firefoxwarning__message"
					ref={messageRef}
					tabIndex='-1'
				>
          <h2 id='firefox-warning-message'>
						{t.firefox.title}
					</h2>
          <p>
						{t.firefox.warningMessage}
					</p>
        </div>

        <button
          onClick={handleDismiss}
          className="firefoxwarning__dismiss-btn"
					aria-label={t.firefox.dismiss}
        >
          {t.firefox.dismiss}
        </button>
				
        <div className="firefoxwarning__handle" />
      </div>
    </div>
  )
}