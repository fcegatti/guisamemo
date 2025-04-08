import { useRef } from 'react'

const SWIPE_THRESHOLD = 30 // Minimum horizontal distance in px to count as swipe

export function useSwipe (onSwipeLeft, onSwipeRight) {
  const touchStartX = useRef(null)

  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX
  }

  const handleTouchEnd = (e) => {
    const touchEndX = e.changedTouches[0].clientX
    const deltaX = touchEndX - touchStartX.current

    if (Math.abs(deltaX) > SWIPE_THRESHOLD) {
      if (deltaX > 0) {
        onSwipeRight()
      } else {
        onSwipeLeft()
      }
    }

    touchStartX.current = null
  }

  return { handleTouchStart, handleTouchEnd }
}
