import { useGame } from '@context/GameContext'

export default function EndGameModal () {
  const { restartGame, resetGame, players } = useGame()
  const winner = players?.[0]

  return (
    <div className='endgamemodal'>
      <div className='endgamemodal__handle' />

      <img
        src={winner?.avatar
          ? `/avatars/${winner.avatar}`
          : '/avatar-default.webp'}
        alt={`Avatar de ${winner?.name}`}
        className='endgamemodal__avatar'
      />

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
