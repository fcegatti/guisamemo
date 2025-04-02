/**
 * Controls the full resolution flow after two cards are flipped:
 * - Uses resolveFlippedCards (pure logic)
 * - Sets matched state
 * - Delays flipping back unmatched cards
 * - Calls onMatch or onMismatch accordingly
 */
import { resolveFlippedCards } from '@logic/resolveFlippedCards'

export function handleFlipResolution ({
  flippedCards,
  cards,
  setCards,
  setFlippedCards,
  onMatch,
  onMismatch,
  lockBoard,
  unlockBoard
}) {
  const isMatch = resolveFlippedCards(flippedCards)

  if (isMatch) {
    const matchedImage = flippedCards[0].image
    const updatedCards = cards.map(card =>
      card.image === matchedImage
        ? { ...card, matched: true }
        : card
    )

    setCards(updatedCards)
    setFlippedCards([])
    onMatch(matchedImage)
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
    }, 1000)
  }
}
