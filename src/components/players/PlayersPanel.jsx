import { useGame } from '@context/GameContext'
import PlayerStatus from './PlayerStatus'

function PlayersPanel () {
  const { players } = useGame()

  if (!players.length) return null

  return (
    <div className='playerspanel'>
      {players.map((player) => (
        <PlayerStatus
          key={player.id}
          player={player}
        />
      ))}
    </div>
  )
}

export default PlayersPanel
