import { useEffect, useRef } from 'react'
import { useGame } from '@context/GameContext'
import { useLanguage } from '@context/LanguageContext'

export default function ExitGameModal ({ onClose, onExit }) {
  const { players, currentTurnIndex } = useGame()
  const currentPlayer = players[currentTurnIndex]
  const { t } = useLanguage()

  const messageRef = useRef(null)

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
      <div className='exitgamemodal'>
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
          <p>{t.exitGame.question}</p>
          <p className='exitmodal__warning'>
            {t.exitGame.warning}
          </p>
        </div>

        <button
          className='exitgamemodal__stay-btn'
          onClick={onClose}
          aria-label={t.exitGame.ariaStay}
        >
          {t.exitGame.stay}
        </button>
        <button
          className='exitgamemodal__exit-btn'
          onClick={onExit}
          aria-label={t.exitGame.ariaExit}
        >
          {t.exitGame.exit}
        </button>
      </div>
    </div>
  )
}
