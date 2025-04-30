import { useEffect, useRef } from 'react'
import { useGame } from '@context/GameContext'
import { useLanguage } from '@context/LanguageContext'
import { useFocusTrap } from '@hooks/useFocusTrap'

export default function EndGameModal () {
  const { restartGame, resetGame } = useGame()
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
      className='endgamemodal'
      role='dialog'
      aria-modal='true'
      aria-labelledby='end-message'
      ref={modalRef}
    >
      <div className='endgamemodal__handle' />

      <p
        id='end-message'
        className='endgamemodal__message'
        ref={messageRef}
        tabIndex='-1'
      >
        {t.endGame.question}
      </p>

      <div className='endgamemodal__buttons'>
        <button
          className='endgamemodal__button'
          onClick={restartGame}
          aria-label={t.endGame.ariaRestart}
        >
          {t.endGame.restart}
        </button>

        <button
          className='endgamemodal__button'
          onClick={resetGame}
          aria-label={t.endGame.ariaReset}
        >
          {t.endGame.reset}
        </button>
      </div>
    </div>
  )
}
