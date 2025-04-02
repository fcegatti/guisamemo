import { useState, useEffect } from 'react'
import { generateDeck } from '@utils/deck'
import { resolveFlippedCards } from '@logic/resolveFlippedCards'
import { handleMatchOutcome } from '@handlers/handleMatchOutcome'
import { handleMismatchOutcome } from '@handlers/handleMismatchOutcome'
import { checkEndGame } from '@logic/checkEndGame'

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
      resolveFlippedCards({
        flippedCards: updatedFlipped,
        setCards,
        setFlippedCards,
        onMatch: (matchedImage) => {
          handleMatchOutcome({ matchedImage })
          checkEndGame(cards)
        },
        onMismatch: () => {
          handleMismatchOutcome()
        }
      })
    }
  }

  return {
    cards,
    flippedCards,
    handleCardClick
  }
}
