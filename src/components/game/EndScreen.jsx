import { useGame } from '@context/GameContext'

export default function EndScreen () {
  const { players } = useGame()

  if (!players || players.length === 0) {
    return <p>Error: No hay jugadores registrados.</p>
  }

  const winner = players.reduce((top, player) =>
    player.score > top.score ? player : top, players[0]
  )

  return (
    <div className='endscreen'>
      <h1>🏆 Ganador: {winner.name} 🏆</h1>
      <p>Puntaje: {winner.score} puntos</p>
    </div>
  )
}
