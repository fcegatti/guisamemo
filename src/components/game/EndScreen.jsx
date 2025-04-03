import { useGame } from '@context/GameContext'

export default function EndScreen () {
  const { players, restartGame } = useGame()

  if (!players || players.length === 0) {
    return <p>Error: No hay jugadores registrados.</p>
  }

  const sortedPlayers = [...players].sort((a, b) => b.score - a.score)
  const winner = sortedPlayers[0]

  return (
    <div className='endscreen'>
      <div className='endscreen__animation'>
        {/* Fireworks or celebration animation goes here */}
        <p className='endscreen__placeholder'>🎆 ¡Celebración! 🎆</p>
      </div>

      <h1 className='endscreen__title'>🏆 Ganador: {winner.name}</h1>

      <ul className='endscreen__ranking'>
        {sortedPlayers.map((player, index) => (
          <li
            key={player.id}
            className={`endscreen__player ${index === 0 ? 'endscreen__player--winner' : ''}`}
          >
            <span className='endscreen__player-name'>{player.name}</span>
            <span className='endscreen__player-score'>{player.score} pts</span>
          </li>
        ))}
      </ul>

      <div className='endscreen__buttons'>
        <button
          className='endscreen__button'
          onClick={restartGame}
        >
          Reiniciar partida
        </button>
        <button className='endscreen__button'>Menú principal</button>
        <button className='endscreen__button'>Salir</button>
      </div>
    </div>
  )
}
