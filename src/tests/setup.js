// Global test setup for Vitest + React Testing Library
import { expect, afterEach } from 'vitest'
import { cleanup } from '@testing-library/react'
import * as matchers from '@testing-library/jest-dom/matchers'

// Extend Vitest's expect with jest-dom matchers
expect.extend(matchers)

// Clean up DOM after each test
afterEach(() => {
  cleanup()
})

// Critical modules identified for future testing priority:
// HIGH PRIORITY (Unit Tests):
// - logic/updatePlayerScore.js
// - logic/validatePlayerName.js
// - logic/resolveFlippedCards.js
// - utils/deck.js (generateDeck)
// - handlers/handleTurnCount.js
//
// MEDIUM PRIORITY (Integration Tests):
// - hooks/useGameEngine.js
// - context/GameContext.jsx
// - StartScreen (form + validation)
// - GameScreen (board + interactions)
// - AvatarSelector (navigation + selection)
