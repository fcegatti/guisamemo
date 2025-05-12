/**
 * Controls the full resolution flow after two cards are flipped:
 * - Uses resolveFlippedCards (pure logic)
 * - Sets matched state
 * - Delays flipping back unmatched cards
 * - Calls onMatch or onMismatch accordingly
 */
import { resolveFlippedCards } from '@logic/resolveFlippedCards'
import { FLIP_BACK_DELAY } from '@constants/game'

export function handleFlipResolution ({
  flippedCards,
  cards,
  setCards,
  setFlippedCards,
  onMatch,
  onMismatch,
  unlockBoard
}) {
  const isMatch = resolveFlippedCards(flippedCards)

  if (isMatch) {
    const matchedImage = flippedCards[0].image
    const updatedCards = cards.map(card =>
      card.image === matchedImage
        ? { ...card, matched: true, justMatched: true }
        : card
    )

    setCards(updatedCards)
    setFlippedCards([])

    setTimeout(() => {
      setCards(prev =>
        prev.map(card =>
          card.justMatched
            ? { ...card, justMatched: false }
            : card
        )
      )
    }, 700)
    onMatch(matchedImage, updatedCards)
    unlockBoard()
  } else {
    setTimeout(() => {
      const updatedCards = cards.map(card =>
        flippedCards.some(fc => fc.id === card.id)
          ? { ...card, flipped: false }
          : card
      )

      setCards(updatedCards)
      setFlippedCards([])
      onMismatch()
      unlockBoard()
    }, FLIP_BACK_DELAY)
  }
}
