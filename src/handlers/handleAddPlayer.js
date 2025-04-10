import { validatePlayerName } from '@logic/validatePlayerName'
import { MAX_PLAYERS } from '@constants/game'

export function handleAddPlayer ({
  playerName,
  players,
  addPlayer,
  setPlayerName,
  setError
}) {
  const result = validatePlayerName(playerName, players, MAX_PLAYERS)

  if (!result.valid) {
    setError(result.error)
    return
  }

  addPlayer(result.name)
  setPlayerName('')
  setError('')
}
