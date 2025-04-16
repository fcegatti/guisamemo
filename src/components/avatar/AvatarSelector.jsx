import { useState } from 'react'
import { useSwipe } from '@hooks/useSwipe'
import { AVATAR_INFO } from '@constants/avatars'

export default function AvatarSelector ({ onSelect }) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const currentAvatar = AVATAR_INFO[currentIndex]

  const goToNext = () => {
    setCurrentIndex((prev) =>
      prev === AVATAR_INFO.length - 1 ? 0 : prev + 1
    )
  }

  const goToPrev = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? AVATAR_INFO.length - 1 : prev - 1
    )
  }

  const { handleTouchStart, handleTouchEnd } = useSwipe(goToNext, goToPrev)

  return (
    <div
      className='avatarselector__overlay'
      role='dialog'
      aria-modal='true'
      aria-label='Selector de avatar'
    >
      <div className='avatarselector__modal'>
        <button
          className='avatarselector__nav avatarselector__nav--left'
          onClick={goToPrev}
          aria-label='Anterior'
        >
          ◀
        </button>

        <div
          className='avatarselector__image-container'
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <img
            src={`/avatars/${currentAvatar.filename}`}
            alt={currentAvatar.name}
            className='avatarselector__image'
            onClick={() => onSelect(currentAvatar.filename)}
          />
          <span
            className='avatarselector__name'
            aria-live='polite'
          >
            {currentAvatar.name}
          </span>
        </div>

        <button
          className='avatarselector__nav avatarselector__nav--right'
          onClick={goToNext}
          aria-label='Siguiente'
        >
          ▶
        </button>
      </div>
    </div>
  )
}
