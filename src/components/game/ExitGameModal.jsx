import { useEffect, useRef } from 'react'
import { useGame } from '@context/GameContext'
import { useLanguage } from '@context/LanguageContext'
import { useFocusTrap } from '@hooks/useFocusTrap'

export default function ExitGameModal ({ onClose, onExit }) {
  const { players, currentTurnIndex } = useGame()
  const currentPlayer = players[currentTurnIndex]
  const { t } = useLanguage()

  const messageRef = useRef(null)
  const modalRef = useRef(null)
  useFocusTrap(modalRef)

  useEffect(() => {
    if (messageRef.current) {
      messageRef.current.focus()
    }
  }, [])

  return (
    <div
      className='exitgamemodal__overlay'
      role='dialog'
      aria-modal='true'
      aria-labelledby='exit-message'
    >
      <div className='exitgamemodal' ref={modalRef}>
        <div className='exitgamemodal__handle' />
        <img
          src={
            currentPlayer.avatar
              ? `/avatars/${currentPlayer.avatar}`
              : '/avatar-default.webp'
          }
          alt={t.exitGame.avatarAlt.replace('{name}', currentPlayer.name)}
          className='exitgamemodal__avatar'
          aria-hidden='true'
        />

        <div
          id='exit-message'
          className='exitgamemodal__message'
          ref={messageRef}
          tabIndex='-1'
        >
          <h2>{t.exitGame.question}</h2>
          <p className='exitmodal__warning'>
            {t.exitGame.warning}
          </p>
        </div>

        <button
          className='exitgamemodal__stay-btn'
          onClick={onClose}
          aria-label={t.access.exitStay}
        >
          {t.exitGame.stay}
        </button>
        <button
          className='exitgamemodal__exit-btn'
          onClick={onExit}
          aria-label={t.access.exitExit}
        >
          {t.exitGame.exit}
        </button>
      </div>
    </div>
  )
}
