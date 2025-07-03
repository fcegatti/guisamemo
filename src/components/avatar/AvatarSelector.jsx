import { useState, useRef, useEffect } from 'react'
import { useSwipe } from '@hooks/useSwipe'
import { AVATAR_INFO } from '@constants/avatars'
import { useLanguage } from '@context/LanguageContext'
import { useFocusTrap } from '@hooks/useFocusTrap'

export default function AvatarSelector ({ onSelect, currentAvatar }) {
  const getInitialIndex = (avatarFilename) => {
    if (!avatarFilename || avatarFilename === 'avatar-default.webp') {
      return 0 // Start from Messi for new players
    }

    const index = AVATAR_INFO.findIndex(avatar => avatar.filename === avatarFilename)
    return index !== -1 ? index : 0 // Fallback to 0 if not found
  }
  const [currentIndex, setCurrentIndex] = useState(() => getInitialIndex(currentAvatar))
  const selectedAvatar = AVATAR_INFO[currentIndex]

  const { t } = useLanguage()

  const modalRef = useRef(null)
  useFocusTrap(modalRef)

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

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onSelect(null)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [onSelect])

  useEffect(() => {
    if (modalRef.current) {
      modalRef.current.focus()
    }
  }, [])

  return (
    <div
      className='avatarselector__overlay'
      role='dialog'
      aria-modal='true'
      aria-label={t.avatar.dialogLabel}
    >
      <div
        className='avatarselector__modal'
        ref={modalRef}
        tabIndex='-1'
      >
        <button
          className='avatarselector__nav avatarselector__nav--left'
          onClick={goToPrev}
          aria-label={t.avatar.prev}
          title={t.avatar.prev}
        >
          ◀
        </button>

        <div
          className='avatarselector__image-container'
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <img
            src={`/avatars/${selectedAvatar.filename}`}
            alt={t.avatar.imageAlt.replace(
              '{name}',
              selectedAvatar.translationKey
                ? t.names[selectedAvatar.translationKey]
                : selectedAvatar.name
            )}
            className='avatarselector__image'
            onClick={() => onSelect(selectedAvatar.filename)}
          />
          <span
            className='avatarselector__name'
            aria-live='polite'
          >
            {selectedAvatar.translationKey
              ? t.names[selectedAvatar.translationKey]
              : selectedAvatar.name}
          </span>
        </div>

        <button
          className='avatarselector__nav avatarselector__nav--right'
          onClick={goToNext}
          aria-label={t.avatar.next}
          title={t.avatar.next}
        >
          ▶
        </button>
      </div>
    </div>
  )
}
