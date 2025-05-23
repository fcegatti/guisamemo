/* global localStorage */

import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export default function LanguageRedirector () {
  const navigate = useNavigate()

  useEffect(() => {
    const pathname = window.location.pathname
    const storedLang = localStorage.getItem('lang')
    const browserLang = navigator.language || navigator.userLanguage
    const preferred = storedLang || browserLang
    const finalLang = preferred.startsWith('gl') ? 'gl' : 'es'

    console.log('[LANG REDIRECT]', {
      pathname,
      storedLang,
      browserLang,
      finalLang
    })

    if (pathname === `/${finalLang}`) return

    navigate(`/${finalLang}`, { replace: true })
  }, [navigate])

  return null
}
