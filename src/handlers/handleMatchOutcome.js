import { updatePlayerScore } from '@logic/updatePlayerScore'
import { handlePlaySound } from './handlePlaySound'
import { handleTriggerAnimation } from './handleTriggerAnimation'

/**
 * Applies score update aftera correct match.
 * Special cards grant extra points.
 * Does NOT change the turn — match = repeat turn.
 */

export function handleMatchOutcome ({
  matchedImage,
  players,
  currentTurnIndex,
  setPlayers
}) {
  const updatedPlayers = updatePlayerScore({
    players,
    currentTurnIndex,
    matchedImage,
    result: 'match'
  })

  setPlayers(updatedPlayers)
  handlePlaySound('match')
  handleTriggerAnimation('match')
}
