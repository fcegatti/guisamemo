import { PAIRS_BY_SIZE } from '@constants/game'
import { CARD_INFO } from '@constants/cards'

/**
 * Generates a shuffled deck of card pairs.
 *
 * Depends strictly on CARD_INFO, and requires at least `totalPairs` entries.
 * If not enough cards are available, the function will log a warning and use as many as possible.
 */

export function generateDeck (boardSize = 'xs') {
  const totalPairs = PAIRS_BY_SIZE[boardSize] || PAIRS_BY_SIZE.xs

  // NOTE: CARD_INFO is a controlled constant, but we still validate it defensively
  // to catch issues early during development or future refactors.

  if (CARD_INFO.length < totalPairs) {
    if (import.meta.env.MODE === 'development') {
      console.warn(`[generateDeck] Requested ${totalPairs} pairs, but only ${CARD_INFO.length} cards available.`)
    }
  }
  const pairsToUse = Math.min(totalPairs, CARD_INFO.length)
  const rawCards = []

  for (let i = 0; i < pairsToUse; i++) {
    const card = CARD_INFO[i]

    if (!card || !card.image || !card.name) {
      if (import.meta.env.MODE === 'development') {
        console.warn('[genereateDeck] Invalid card at index', i, card)
      }
      continue
    }

    // Duplicate each image to form a pair
    rawCards.push(
      {
        id: `${i + 1}-a`,
        image: card.image,
        name: card.name,
        flipped: false,
        matched: false
      },
      {
        id: `${i + 1}-b`,
        image: card.image,
        name: card.name,
        flipped: false,
        matched: false
      }
    )
  }

  // Shuffle cards randomly
  return rawCards.sort(() => Math.random() - 0.5)
}
