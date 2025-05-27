import { useEffect } from 'react'
import { useLanguage } from '@context/LanguageContext'

export function useDocumentMetadata () {
  const { lang, tFunc } = useLanguage()

  useEffect(() => {
    if (!lang || typeof tFunc !== 'function') return

    // Update <html lang="...">
    document.documentElement.lang = lang

    // Helper function to safely update meta tags
    const updateMetaTag = (selector, content) => {
      let metaTag = document.querySelector(selector)
      if (!metaTag) {
        // only create if it doesn't exist
        metaTag = document.createElement('meta')
        if (selector.includes('property=')) {
          const property = selector.match(/property="([^"]+)"/)[1]
          metaTag.setAttribute('property', property)
        } else if (selector.includes('name=')) {
          const name = selector.match(/name="([^"]+)"/)[1]
          metaTag.setAttribute('name', name)
        }
        document.head.appendChild(metaTag)
      }
      metaTag.content = content
    }
    
    // basic metadata
    document.title = tFunc('meta.title')
    updateMetaTag('meta[name="description"]', tFunc('meta.description'))

    // OpenGraph metadata (modifies existing tags)
    updateMetaTag('meta[property="og:title"]', tFunc('meta.og.title'))
    updateMetaTag('meta[property="og:description"]', tFunc('meta.og.description'))
    updateMetaTag('meta[property="og:locale"]', lang === 'gl' ? 'gl_ES' : 'es_ES')
    updateMetaTag('meta[property="og:locale:alternate"]', lang === 'es' ? 'gl_ES' : 'es_ES')
    updateMetaTag('meta[property="og:image:alt"]', tFunc('meta.og.imageAlt'))

    // Twitter metadata (modifies existing tags)
    updateMetaTag('meta[name="twitter:title"]', tFunc('meta.twitter.title'))
    updateMetaTag('meta[name="twitter:description"]', tFunc('meta.twitter.description'))
    updateMetaTag('meta[name="twitter:image:alt"]', tFunc('meta.twitter.imageAlt'))
  }, [lang, tFunc])
}
