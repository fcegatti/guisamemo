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
    const mismatchedIds = flippedCards.map(fc => fc.id)

    const updatedCards = cards.map(card =>
      mismatchedIds.includes(card.id)
        ? { ...card, justMismatched: true }
        : card
    )

    setCards(updatedCards)
    onMismatch()

    setTimeout(() => {
      const revertedCards = updatedCards.map(card =>
        mismatchedIds.includes(card.id)
          ? { ...card, flipped: false, justMismatched: false }
          : card
      )

      setCards(revertedCards)
      setFlippedCards([])
      unlockBoard()
    }, FLIP_BACK_DELAY)
  }
}
