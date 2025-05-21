/* global localStorage */

import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function LanguageRedirector () {
  const navigate = useNavigate()
  const [isRedirecting, setIsRedirecting] = useState(true)

  useEffect(() => {
    const handleRedirection = () => {
      const storedLang = localStorage.getItem('lang')
      const browserLang = navigator.language || navigator.userLanguage
      const preferred = storedLang || browserLang

      const targetLang = preferred.startsWith('gl') ? 'gl' : 'es'

      navigate(`/${targetLang}`, { replace: true })
      setIsRedirecting(false)

      document.documentElement.lang = targetLang
    }

    if (window.location.pathname === '/') {
      handleRedirection()
    } else {
      setIsRedirecting(false)
    }
  }, [navigate])

  return isRedirecting ? null : null
}
