import {
  SPECIAL_CARDS,
  PAIR_POINTS,
  SPECIAL_PAIR_POINTS
} from '@constants/game'
import { handlePlaySound } from './handlePlaySound'
import { handleTriggerAnimation } from './handleTriggerAnimation'

/**
 * Updates the current player's score based on the matched image.
 * Special cards grant extra points.
 *
 * Does NOT change the turn — match = repeat turn.
 */

export function handleMatchOutcome ({
  matchedImage,
  players,
  currentTurnIndex,
  setPlayers
}) {
  const isSpecialPair = SPECIAL_CARDS.includes(matchedImage)
  const points = isSpecialPair ? SPECIAL_PAIR_POINTS : PAIR_POINTS

  setPlayers(prevPlayers =>
    prevPlayers.map((player, index) => {
      if (index === currentTurnIndex) {
        return {
          ...player,
          score: player.score + points
        }
      }
      return player
    })
  )
  handlePlaySound('match')
  handleTriggerAnimation('match')
}
