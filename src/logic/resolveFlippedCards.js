export function resolveFlippedCards (flippedCards) {
  if (flippedCards.length !== 2) return false
  const [card1, card2] = flippedCards
  return card1.image === card2.image
}
