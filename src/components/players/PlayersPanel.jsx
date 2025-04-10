// ⚠️ Not used in MVP — kept for future scalability (player ranking panel)

import { useGame } from '@context/GameContext'
import PlayerStatus from './PlayerStatus'

function PlayersPanel () {
  const { players, currentTurnIndex } = useGame()
  const currentPlayer = players[currentTurnIndex]

  if (!currentPlayer) return null

  return (
    <div className='playerspanel'>
      <PlayerStatus player={currentPlayer} />
    </div>
  )
}

export default PlayersPanel
