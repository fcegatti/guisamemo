import {
  SPECIAL_CARDS,
  PAIR_POINTS,
  SPECIAL_PAIR_POINTS
} from '@constants/game'

/**
 * Returns updated players array after adjusting the current player's score.
 * Accepts a result type: 'match' (adds points) or 'penalty' (subtracts 1).
 */
export function updatePlayerScore ({ players, currentTurnIndex, matchedImage, result }) {
  // 🛡️ DEFENSIVE: Validate player index bounds against external manipulation
  if (currentTurnIndex < 0 || currentTurnIndex >= players.length) {
    if (import.meta.env.MODE === 'development') {
      console.warn(`[updatePlayerScore] Invalid player index: ${currentTurnIndex} for ${players.length} players`)
    }
    return players // Return unchanged to prevent crash
  }
  const isSpecialPair = SPECIAL_CARDS.includes(matchedImage)
  const basePoints = isSpecialPair ? SPECIAL_PAIR_POINTS : PAIR_POINTS

  const points = result === 'mismatch'
    ? -1
    : basePoints

  return players.map((player, index) => {
    if (index !== currentTurnIndex) return player
    const newScore = result === 'mismatch'
      ? Math.max(0, player.score + points)
      : player.score + points

    return { ...player, score: newScore }
  })
}
