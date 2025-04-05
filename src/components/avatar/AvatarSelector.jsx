import { useState } from 'react'

// Local avatar data
const AVATAR_INFO = [
  { filename: 'avatar-1.webp', name: 'Messi' },
  { filename: 'avatar-2.webp', name: 'Roque' },
  { filename: 'avatar-3.webp', name: 'Telmo' },
  { filename: 'avatar-4.webp', name: 'Román' },
  { filename: 'avatar-10.webp', name: 'Maradona' }
]

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
        goToNext()
      } else {
        goToPrev()
      }
    }

    setTouchStartX(null)
  }

  return (
    <div className='avatarselector__overlay'>
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
          onTouchStart={(e) => handleTouchStart(e)}
          onTouchEnd={(e) => handleTouchEnd(e)}
        >
          <img
            src={`/avatars/${currentAvatar.filename}`}
            alt={currentAvatar.name}
            className='avatarselector__image'
            onClick={() => onSelect(currentAvatar.filename)}
          />
          <span className='avatarselector__name'>{currentAvatar.name}</span>
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
