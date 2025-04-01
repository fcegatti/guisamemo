export function generateDeck (totalPairs = 15) {
  const rawCards = []

  for (let i = 1; i <= totalPairs; i++) {
    const image = `/cards/card-${i}.webp`

    // Duplicate each image to form a pair
    rawCards.push(
      { id: `${i}-a`, image, flipped: false, matched: false },
      { id: `${i}-b`, image, flipped: false, matched: false }
    )
  }

  // Shuffle cards randomly
  return rawCards.sort(() => Math.random() - 0.5)
}
