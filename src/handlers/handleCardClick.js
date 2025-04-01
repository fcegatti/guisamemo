import { evaluateMatch } from '@logic/evaluateMatch'

export function handleCardClick ({
  cardId,
  cards,
  flippedCards,
  setCards,
  setFlippedCards,
  onMatch,
  onMismatch
}) {
  const clickedCard = cards.find(card => card.id === cardId)

  if (!clickedCard || clickedCard.flipped || clickedCard.matched) return

  const updatedFlipped = [...flippedCards, clickedCard]

  // Flip the clicked card
  setCards(prevCards =>
    prevCards.map(card =>
      card.id === cardId && !card.flipped && !card.matched
        ? { ...card, flipped: true }
        : card
    )
  )

  setFlippedCards(updatedFlipped)

  // Evaluate match if two cards are flipped
  if (updatedFlipped.length === 2) {
    setTimeout(() => {
      evaluateMatch({
        flippedCards: updatedFlipped,
        setCards,
        onMatch,
        onMismatch
      })
      setFlippedCards([])
    }, 1000)
  }
}
