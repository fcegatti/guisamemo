import { useGame } from '@context/GameContext'
import { useLanguage } from '@context/LanguageContext'

export default function EndGameModal () {
  const { restartGame, resetGame } = useGame()
  const { t } = useLanguage()

  return (
    <div
      className='endgamemodal'
      role='dialog'
      aria-modal='true'
      aria-labelledby='end-message'
    >
      <div className='endgamemodal__handle' />

      <p id='end-message' className='endgamemodal__message'>
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
