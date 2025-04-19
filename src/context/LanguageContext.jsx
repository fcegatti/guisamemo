/* global localStorage */

import { createContext, useContext, useState, useEffect } from 'react'
import { translations } from '@i18n'

const LanguageContext = createContext()

export function LanguageProvider ({ children }) {
  const [lang, setLang] = useState('es')
  const [t, setT] = useState(translations[lang])

  useEffect(() => {
    const savedLang = localStorage.getItem('lang')
    if (savedLang && translations[savedLang]) {
      setLang(savedLang)
    }
  }, [])

  useEffect(() => {
    setT(translations[lang] || translations.es)
    document.documentElement.lang = lang // updates <html lang="...">
    localStorage.setItem('lang', lang)
  }, [lang])

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage () {
  return useContext(LanguageContext)
}
