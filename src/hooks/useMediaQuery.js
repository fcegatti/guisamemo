import { useState, useEffect } from 'react'

export function useMediaQuery (query) {
  const [matches, setMatches] = useState(() => window.matchMedia(query).matches)

  useEffect(() => {
    const mql = window.matchMedia(query)
    // Handler receives either an EventTarget event or legacy MediaQueryList event
    const handler = (e) => setMatches(e.matches)
    // TODO [2025‑10]: remove this Safari <14 fallback when usage <0.5%
    // SAFARI FALLBACK:
    // Older Safari (< v14) does NOT support MediaQueryList.addEventListener,
    // but it *does* support the legacy addListener/removeListener API.
    if (typeof mql.addEventListener === 'function') {
      // Modern browsers (including Safari 14+)
      mql.addEventListener('change', handler)
      return () => {
        mql.removeEventListener('change', handler)
      }
    } else {
      // Fallback for Safari 13 and earlier
      mql.addListener(handler)
      return () => {
        mql.removeListener(handler)
      }
    }
  }, [query])

  return matches
}
