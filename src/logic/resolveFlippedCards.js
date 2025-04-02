import { evaluateMatch } from './evaluateMatch'

export function resolveFlippedCards ({
  flippedCards,
  setCards,
  setFlippedCards,
  onMatch,
  onMismatch,
  lockBoard,
  unlockBoard
}) {
  lockBoard?.()
  setTimeout(() => {
    const [first, second] = flippedCards
    const { isMatch, matchedImage } = evaluateMatch(first, second)

    if (isMatch) {
      setCards(prevCards =>
        prevCards.map(card =>
          card.image === matchedImage
            ? { ...card, matched: true }
            : card
        )
      )
      onMatch?.(matchedImage)
    } else {
      setCards(prevCards =>
        prevCards.map(card =>
          card.matched ? card : { ...card, flipped: false }
        )
      )
      onMismatch?.()
    }

    setFlippedCards([])
    unlockBoard?.()
  }, 1000)
}
