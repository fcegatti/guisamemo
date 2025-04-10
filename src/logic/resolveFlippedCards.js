export function resolveFlippedCards (flippedCards) {
  if (flippedCards.length !== 2) return false

  const [card1, card2] = flippedCards

  if (!card1 || !card2 || !card1.image || !card2.image) {
    if (import.meta.env.MODE === 'development') {
      console.warn('[resolveFlippedCards] Missing or invalid cards:', { card1, card2 })
    }
    return false
  }

  return card1.image === card2.image
}
