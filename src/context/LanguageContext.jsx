import { createContext, useContext, useState, useEffect } from 'react'
import { translations } from '@i18n'

const LanguageContext = createContext()

export function LanguageProvider ({ children }) {
  const [lang, setLang] = useState('es')
  const [t, setT] = useState(translations[lang])

  useEffect(() => {
    setT(translations[lang] || translations.es)
    document.documentElement.lang = lang // updates <html lang="...">
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
