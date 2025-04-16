import { useGame } from '@context/GameContext'

export default function EndGameModal () {
  const { restartGame, resetGame } = useGame()

  return (
    <div
      className='endgamemodal'
      role='dialog'
      aria-modal='true'
      aria-labelledby='end-message'
    >
      <div className='endgamemodal__handle' />

      <p id='end-message' className='endgamemodal__message'>
        ¿Quieres jugar otra vez?
      </p>

      <div className='endgamemodal__buttons'>
        <button
          className='endgamemodal__button'
          onClick={restartGame}
          aria-label='Repetir la partida desde el principio'
        >
          Repetir partida
        </button>

        <button
          className='endgamemodal__button'
          onClick={resetGame}
          aria-label='Volver al inicio del juego'
        >
          Volver al inicio
        </button>
      </div>
    </div>
  )
}
