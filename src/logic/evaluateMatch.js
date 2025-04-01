export function evaluateMatch ({
  flippedCards,
  setCards,
  onMatch,
  onMismatch
}) {
  const [first, second] = flippedCards
  const isMatch = first.image === second.image

  if (isMatch) {
    // Mark cards as matched
    setCards(prevCards =>
      prevCards.map(card =>
        card.image === first.image ? { ...card, matched: true } : card
      )
    )
    onMatch?.(first.image)
  } else {
    // Flip cards back if they don't match
    setCards(prevCards =>
      prevCards.map(card =>
        card.matched ? card : { ...card, flipped: false }
      )
    )
    onMismatch?.()
  }
}
