import { useState } from 'react'

export function useSwipe (onSwipeLeft, onSwipeRight) {
  const [touchStartX, setTouchStartX] = useState(null)

  const handleTouchStart = (e) => {
    setTouchStartX(e.touches[0].clientX)
  }

  const handleTouchEnd = (e) => {
    if (touchStartX === null) return
    const touchEndX = e.changedTouches[0].clientX
    const deltaX = touchEndX - touchStartX

    if (Math.abs(deltaX) > 40) {
      if (deltaX < 0) {
        onSwipeLeft()
      } else {
        onSwipeRight()
      }
    }

    setTouchStartX(null)
  }

  return {
    handleTouchStart,
    handleTouchEnd
  }
}
