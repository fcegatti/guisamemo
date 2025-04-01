import { useGame } from '@context/GameContext'
import PlayerStatus from './PlayerStatus'
import '@styles/playerspanel.css'

function PlayersPanel () {
  const { players, currentTurnIndex } = useGame()
  const currentPlayer = players[currentTurnIndex]

  if (!currentPlayer) return null

  return (
    <div className='playerspanel'>
      <PlayerStatus player={currentPlayer} index={currentTurnIndex} />
    </div>
  )
}

export default PlayersPanel
