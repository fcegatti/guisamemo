// Example unit test to verify Vitest setup works correctly
import { describe, it, expect } from 'vitest'
import { updatePlayerScore } from '@logic/updatePlayerScore'

describe('updatePlayerScore', () => {
  const mockPlayers = [
    { id: 'p1', name: 'Test Player', score: 0, turns: 0 }
  ]

  it('should increase score on match', () => {
    const result = updatePlayerScore({
      players: mockPlayers,
      currentTurnIndex: 0,
      matchedImage: '/cards/card-1.webp',
      result: 'match'
    })
    
    expect(result[0].score).toBeGreaterThan(0)
    expect(result[0].score).toBe(5) // Regular pair points
  })

  it('should decrease score on mismatch but not go below 0', () => {
    const playersWithScore = [
      { id: 'p1', name: 'Test Player', score: 10, turns: 0 }
    ]
    
    const result = updatePlayerScore({
      players: playersWithScore,
      currentTurnIndex: 0,
      result: 'mismatch'
    })
    
    expect(result[0].score).toBe(9) // 10 - 1 = 9
  })

  it('should handle special pair scoring', () => {
    const result = updatePlayerScore({
      players: mockPlayers,
      currentTurnIndex: 0,
      matchedImage: '/cards/card-1.webp', // Messi - special card
      result: 'match'
    })
    
    expect(result[0].score).toBe(10) // Special pair points
  })
})