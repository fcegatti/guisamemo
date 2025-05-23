import { useEffect } from 'react'
import { useLanguage } from '@context/LanguageContext'

export function useDocumentMetadata () {
  const { lang } = useLanguage()

  useEffect(() => {
    if (lang) {
      document.documentElement.lang = lang
    }
  }, [lang])
}
