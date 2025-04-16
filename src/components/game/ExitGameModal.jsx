import { useGame } from '@context/GameContext'

export default function ExitGameModal ({ onClose, onExit }) {
  const { players, currentTurnIndex } = useGame()
  const currentPlayer = players[currentTurnIndex]

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
          alt={`Avatar de ${currentPlayer.name}`}
          className='exitgamemodal__avatar'
        />
        <p id='exit-message' className='exitgamemodal__message'>
          ¿Seguro que quieres salir del juego?
          <br />
          <span className='exitmodal__warning'>Perderás el progreso de la partida.</span>
        </p>
        <button
          className='exitgamemodal__stay-btn'
          onClick={onClose}
          aria-label='Seguir jugando'
        >
          Seguir jugando
        </button>
        <button
          className='exitgamemodal__exit-btn'
          onClick={onExit}
          aria-label='Salir de la partida'
        >
          Salir
        </button>
      </div>
    </div>
  )
}
