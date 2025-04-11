import { CARD_INFO } from '@constants/cards'

export function generateDeck (totalPairs = 15) {
  const rawCards = []

  for (let i = 0; i <= totalPairs; i++) {
    const card = CARD_INFO[i]
    if (!card) continue

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
