/* global sessionStorage */

import { useEffect, useState } from 'react'
import { useGame } from '@context/GameContext'
import { useLanguage } from '@context/LanguageContext'

export default function OrientationModal () {
  const { boardSize } = useGame()
  const { t } = useLanguage()
  const [isPortrait, setIsPortrait] = useState(window.innerHeight > window.innerWidth)
  const [dismissed, setDismissed] = useState(() =>
    sessionStorage.getItem('hideOrientationHint') === 'true')
  const [visible, setVisible] = useState(false)

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

  useEffect(() => {
    const shouldShow = isPortrait && isTabletSize && isLargeBoard && !dismissed
    setVisible(shouldShow)
  }, [isPortrait, isTabletSize, isLargeBoard, dismissed])

  if (!visible) return null

  const handleDismiss = () => {
    sessionStorage.setItem('hideOrientationHint', 'true')
    setDismissed(true)
  }

  const handleConfirm = () => {
    setVisible(false)
  }

  return (
    <div
      className='orientationhint'
      role='status'
      aria-live='polite'
    >
      <p className='orientationhint__message'>
        {t.orientation.message}
      </p>
      <div className='orientationhint__buttons'>
        <button
          className='orientationhint__ok'
          onClick={handleConfirm}
        >
          {t.orientation.confirm}
        </button>
        <button
          className='orientationhint__dismiss'
          onClick={handleDismiss}
        >
          {t.orientation.dismiss}
        </button>
      </div>
    </div>
  )
}
