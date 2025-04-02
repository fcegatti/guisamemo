import { useState, useEffect } from 'react'
import { generateDeck } from '@utils/deck'
import { evaluateMatch } from '@logic/evaluateMatch'

export function useGameEngine () {
  const [cards, setCards] = useState([])
  const [flippedCards, setFlippedCards] = useState([])

  // Generate a new shuffled deck when the game starts
  useEffect(() => {
    setCards(generateDeck())
  }, [])

  // Handle user clicking a card
  const handleCardClick = (cardId) => {
    const clickedCard = cards.find(card => card.id === cardId)

    // Ignore if the card is already flipped or matched
    if (!clickedCard || clickedCard.flipped || clickedCard.matched) return

    const updatedFlipped = [...flippedCards, clickedCard]

    // Flip the clicked card
    setCards(prevCards =>
      prevCards.map(card =>
        card.id === cardId ? { ...card, flipped: true } : card
      )
    )

    setFlippedCards(updatedFlipped)

    // Evaluate match only when two cards are flipped
    if (updatedFlipped.length === 2) {
      const [first, second] = updatedFlipped

      setTimeout(() => {
        const { isMatch, matchedImage } = evaluateMatch(first, second)

        if (isMatch) {
          // Mark matched cards
          setCards(prevCards =>
            prevCards.map(card =>
              card.image === matchedImage
                ? { ...card, matched: true }
                : card
            )
          )
        } else {
          // Flip back unmatched cards
          setCards(prevCards =>
            prevCards.map(card =>
              card.matched ? card : { ...card, flipped: false }
            )
          )
        }

        // Clear flipped cards
        setFlippedCards([])
      }, 1000)
    }
  }

  return {
    cards,
    flippedCards,
    handleCardClick
  }
}
