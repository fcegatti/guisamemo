import { useEffect } from 'react'
import { useLanguage } from '@context/LanguageContext'

export function useDocumentMetadata () {
  const { lang, tFunc } = useLanguage()

  useEffect(() => {
    if (!lang || typeof tFunc !== 'function') return

    // Update <html lang="...">
    document.documentElement.lang = lang

    // Set <title>
    document.title = tFunc('meta.title')

    // Set or update <meta name="description">
    let metaDesc = document.querySelector('meta[name="description"]')
    if (!metaDesc) {
      metaDesc = document.createElement('meta')
      metaDesc.name = 'description'
      document.head.appendChild(metaDesc)
    }
    metaDesc.content = tFunc('meta.description')
  }, [lang, tFunc])
}
