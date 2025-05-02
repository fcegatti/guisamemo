/* global sessionStorage */

import { useEffect, useState } from 'react'
import { useGame } from '@context/GameContext'
import { useLanguage } from '@context/LanguageContext'

export default function OrientationHint () {
  const { boardSize } = useGame()
  const { t } = useLanguage()
  const [isPortrait, setIsPortrait] = useState(window.innerHeight > window.innerWidth)
  const [dismissed, setDismissed] = useState(() =>
    sessionStorage.getItem('hideOrientationHint') === 'true')

  // Monitor orientation changes
  useEffect(() => {
    const handleResize = () => {
      setIsPortrait(window.innerHeight > window.innerWidth)
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // Determine if board is large
  const largeSizes = ['l', 'xl', '2xl', '3xl']
  const isLargeBoard = largeSizes.includes(boardSize)

  // Minimum height threshold (exclude phones)
  const isTabletSize = window.innerHeight >= 800

  const shouldShow = isPortrait && isTabletSize && isLargeBoard && !dismissed

  if (!shouldShow) return null

  return (
    <div
      className='orientationhint'
      role='status'
      aria-live='polite'
    >
      <p className='orientationhint__message'>
        {t.orientation.message}
      </p>
      <button
        className='orientationhint__close'
        aria-label={t.orientation.dismiss}
        onClick={() => {
          sessionStorage.setItem('hideOrientationHint', 'true')
          setDismissed(true)
        }}
      >
        ✕
      </button>
    </div>
  )
}
