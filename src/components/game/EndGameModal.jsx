import { useGame } from '@context/GameContext'

export default function EndGameModal () {
  const { restartGame, resetGame } = useGame()

  return (
    <div className='endgamemodal'>
      <div className='endgamemodal__handle' />

      <p className='endgamemodal__message'>
        ¿Quieres jugar otra vez?
      </p>

      <div className='endgamemodal__buttons'>
        <button
          className='endgamemodal__button'
          onClick={restartGame}
        >
          Repetir partida
        </button>

        <button
          className='endgamemodal__button'
          onClick={resetGame}
        >
          Volver al inicio
        </button>
      </div>
    </div>
  )
}
