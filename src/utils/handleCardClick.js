export function handleCardClick ({
  cardId,
  cards,
  flippedCards,
  setCards,
  setFlippedCards,
  onMatch
}) {
  const clickedCard = cards.find(card => card.id === cardId)

  if (!clickedCard || clickedCard.flipped || clickedCard.matched) return

  const updatedFlipped = [...flippedCards, clickedCard]

  // Flip clicked card
  setCards(prev =>
    prev.map(card =>
      card.id === cardId ? { ...card, flipped: true } : card
    )
  )

  setFlippedCards(updatedFlipped)

  if (updatedFlipped.length === 2) {
    const [first, second] = updatedFlipped

    if (first.image === second.image) {
      setCards(prev =>
        prev.map(card =>
          card.image === first.image ? { ...card, matched: true } : card
        )
      )
      onMatch?.() // future logic: points, repeat turn, etc.
    }

    setTimeout(() => {
      setCards(prev =>
        prev.map(card =>
          card.matched ? card : { ...card, flipped: false }
        )
      )
      setFlippedCards([])
    }, 1000)
  }
}
