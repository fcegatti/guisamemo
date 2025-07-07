/* global localStorage */

import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export default function LanguageRedirector () {
  const navigate = useNavigate()

  useEffect(() => {
    const storedLang = localStorage.getItem('lang')
    const browserLang = navigator.language || navigator.userLanguage
    const preferred = storedLang || browserLang

    if (preferred.startsWith('gl')) {
      navigate('/gl', { replace: true })
    } else {
      navigate('/es', { replace: true })
    }
  }, [navigate])

  return null
}
