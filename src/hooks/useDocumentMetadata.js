import { useEffect } from 'react'
import { useLanguage } from '@context/LanguageContext'

export function useDocumentMetadata () {
  const { lang, t } = useLanguage()

  useEffect(() => {
    if (lang) {
      document.documentElement.lang = lang
    }

    if (typeof t === 'function') {
      // Set <title>
      document.title = t('meta.title')

      // Set <meta name="description">
      let metaDesc = document.querySelector('meta[name="description"]')
      if (!metaDesc) {
        metaDesc = document.createElement('meta')
        metaDesc.name = 'description'
        document.head.appendChild(metaDesc)
      }
      metaDesc.content = t('meta.description')
    }

  }, [lang])
}
