/* global sessionStorage */

import { useEffect, useRef, useState } from 'react'
import { useGame } from '@context/GameContext'
import { useLanguage } from '@context/LanguageContext'
import { useFocusTrap } from '@hooks/useFocusTrap'

export default function OrientationModal () {
  const { boardSize } = useGame()
  const { t } = useLanguage()
  const modalRef = useRef(null)
  const messageRef = useRef(null)
  const [isPortrait, setIsPortrait] = useState(window.innerHeight > window.innerWidth)
  const [dismissed, setDismissed] = useState(() => sessionStorage.getItem('hideOrientationHint') === 'true')
  const [visible, setVisible] = useState(false)

  useFocusTrap(modalRef)

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
      className='orientationmodal__overlay'
      role='dialog'
      aria-modal='true'
      aria-labelledby='orientation-message'
    >
      <div className='orientationmodal' ref={modalRef}>
        <img
          src='/mobile-rotate.svg'
          alt='Icono de rotación de dispositivo'
          className='orientationmodal__icon'
          aria-hidden='true'
        />

        <div
          className='orientationmodal__message'
          ref={messageRef}
          tabIndex='-1'
        >
          <h2 id='orientation-message'>
            {t.orientation.message}
          </h2>
        </div>

        <button
          className='orientationmodal__ok-btn'
          onClick={handleConfirm}
        >
          {t.orientation.confirm}
        </button>
        <button
          className='orientationmodal__dismiss-btn'
          onClick={handleDismiss}
        >
          {t.orientation.dismiss}
        </button>
        <div className='orientationmodal__handle' />
      </div>
    </div>
  )
}
