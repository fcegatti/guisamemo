/**
 * Pure logic handler for turn counting in Guisamemo
 * 
 * Turn Logic Rules:
 * - A "turn" is a round of attempts until error
 * - Consecutive matches = same turn (player continues)
 * - Error = end of turn (increment turn count)
 * - Final match = end of game (increment turn count for last turn)
 * - Players start with 0 turns, increment when their turn ends
 * 
 * @param {Object} config - Configuration object
 * @param {Array} config.players - Current players array
 * @param {number} config.currentTurnIndex - Index of current player
 * @param {'mismatch'|'endGame'} config.eventType - Type of turn-ending event
 * @returns {Array} Updated players array with correct turn counts
 */
export function incrementPlayerTurn({
  players,
  currentTurnIndex,
  eventType
}) {
  // Validate inputs
  if (!players || !Array.isArray(players)) {
    if (import.meta.env.MODE === 'development') {
      console.warn('[handleTurnCount] Invalid players array:', players)
    }
    return players
  }

  if (currentTurnIndex < 0 || currentTurnIndex >= players.length) {
    if (import.meta.env.MODE === 'development') {
      console.warn('[handleTurnCount] Invalid currentTurnIndex:', currentTurnIndex, 'for players length:', players.length)
    }
    return players
  }

  // Return updated players array with incremented turn for current player
  const updatedPlayers = players.map((player, index) => {
    if (index !== currentTurnIndex) return player
    
    return {
      ...player,
      turns: player.turns + 1
    }
  })

  // Development logging
  if (import.meta.env.MODE === 'development') {
    const currentPlayer = players[currentTurnIndex]
    console.log('🎯 TURN INCREMENT:', {
      eventType,
      playerName: currentPlayer.name,
      previousTurns: currentPlayer.turns,
      newTurns: currentPlayer.turns + 1,
      allPlayerTurns: updatedPlayers.map(p => `${p.name}: ${p.turns}`)
    })
  }

  return updatedPlayers
}

/**
 * Calculate total turn count across all players
 * Useful for global game statistics
 * 
 * @param {Array} players - Players array
 * @returns {number} Total turns across all players
 */
export function calculateTotalTurns(players) {
  if (!players || !Array.isArray(players)) {
    return 0
  }
  
  return players.reduce((total, player) => total + (player.turns || 0), 0)
}
