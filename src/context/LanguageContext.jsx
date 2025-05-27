/* global localStorage */

import { createContext, useContext, useState, useEffect } from 'react'
import { translations } from '@i18n'

const LanguageContext = createContext()

// Translator function for dot notation

function createTranslator (langObj) {
  return function t (key) {
    return key.split('.').reduce((obj, part) => (obj && obj[part]) ? obj[part] : undefined, langObj)
  }
}

export function LanguageProvider ({ children }) {
  const [lang, setLang] = useState(null)
  const [t, setT] = useState(translations.es)
  const [tFunc, setTFunc] = useState(() => createTranslator(translations.es))

  useEffect(() => {
    const urlLang = window.location.pathname.split('/')[1]
    const savedLang = localStorage.getItem('lang')

    if (['es', 'gl'].includes(urlLang)) {
      setLang(urlLang)
    } else if (savedLang && translations[savedLang]) {
      setLang(savedLang)
    } else {
      setLang('es')
    }
  }, [])

  useEffect(() => {
    if (!lang) return
    const langObj = translations[lang] || translations.es
    setT(langObj)
    setTFunc(() => createTranslator(langObj))
    document.documentElement.lang = lang // updates <html lang="...">
    localStorage.setItem('lang', lang)
  }, [lang])

  return (
    <LanguageContext.Provider value={{ lang, setLang, t, tFunc }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage () {
  return useContext(LanguageContext)
}
