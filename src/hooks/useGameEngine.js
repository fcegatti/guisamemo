import { useState, useEffect } from 'react'
import { generateDeck } from '@utils/deck'
import { handleFlipResolution } from '@handlers/handleFlipResolution'
import { handleMatchOutcome } from '@handlers/handleMatchOutcome'
import { handleMismatchOutcome } from '@handlers/handleMismatchOutcome'
import { checkEndGame } from '@logic/checkEndGame'
import { useGame } from '@context/GameContext'

export function useGameEngine () {
  const {
    players,
    currentTurnIndex,
    setPlayers,
    nextTurn,
    setIsGameOver
  } = useGame()
  const [cards, setCards] = useState([])
  const [flippedCards, setFlippedCards] = useState([])
  const [isBoardLocked, setIsBoardLocked] = useState(false)

  const lockBoard = () => setIsBoardLocked(true)
  const unlockBoard = () => setIsBoardLocked(false)

  // Generate a new shuffled deck when the game starts
  useEffect(() => {
    setCards(generateDeck())
  }, [])

  // Handle user clicking a card
  const handleCardClick = (cardId) => {
    if (isBoardLocked) return
    const clickedCard = cards.find(card => card.id === cardId)

    if (!clickedCard || clickedCard.flipped || clickedCard.matched) return

    if (!clickedCard.image) {
      if (import.meta.env.MODE === 'development') {
        console.warn('[handleCardClick] Clicked card has no image:', clickedCard)
      }
      return
    }

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
      lockBoard()
      handleFlipResolution({
        flippedCards: updatedFlipped,
        cards,
        setCards,
        setFlippedCards,
        onMatch: (matchedImage, updatedCards) => {
          handleMatchOutcome({
            matchedImage,
            players,
            currentTurnIndex,
            setPlayers
          })

          if (checkEndGame(updatedCards)) {
            setTimeout(() => {
              setIsGameOver(true)
            }, 1200)
          }
        },
        onMismatch: () => {
          handleMismatchOutcome({ nextTurn })
        },
        lockBoard,
        unlockBoard
      })
    }
  }

  return {
    cards,
    flippedCards,
    handleCardClick
  }
}
