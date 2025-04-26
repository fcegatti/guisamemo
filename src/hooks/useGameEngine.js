import { useState, useEffect } from 'react'
import { generateDeck } from '@utils/deck'
import { handleFlipResolution } from '@handlers/handleFlipResolution'
import { handleMatchOutcome } from '@handlers/handleMatchOutcome'
import { handleMismatchOutcome } from '@handlers/handleMismatchOutcome'
import { checkEndGame } from '@logic/checkEndGame'
import { useGame } from '@context/GameContext'
import { useLanguage } from '@context/LanguageContext'

export function useGameEngine () {
  const {
    boardSize,
    players,
    currentTurnIndex,
    setPlayers,
    nextTurn,
    setIsGameOver
  } = useGame()
  const [cards, setCards] = useState([])
  const [flippedCards, setFlippedCards] = useState([])
  const [isBoardLocked, setIsBoardLocked] = useState(false)
  const [ariaMessage, setAriaMessage] = useState('')
  const { t } = useLanguage()
  const lockBoard = () => setIsBoardLocked(true)
  const unlockBoard = () => setIsBoardLocked(false)

  // Generate a new shuffled deck when the game starts
  useEffect(() => {
    setCards(generateDeck(boardSize))
  }, [boardSize])

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

    // Flip the clicked card using functional update to avoid stale state
    const newCards = cards.map(card =>
      card.id === cardId ? { ...card, flipped: true } : card
    )
    setCards(newCards)
    setFlippedCards(updatedFlipped)

    // Accesible message only when card is revealed
    const cardName = clickedCard.translationKey
      ? t.names[clickedCard.translationKey] || clickedCard.name
      : clickedCard.name
    setAriaMessage(t.board.cardAltRevealed.replace('{name}', cardName))

    // Evaluate match only when two cards are flipped
    if (updatedFlipped.length === 2) {
      lockBoard()
      handleFlipResolution({
        flippedCards: updatedFlipped,
        cards: newCards, // use the freshest cards
        setCards,
        setFlippedCards,
        onMatch: (matchedImage, updatedCards) => {
          handleMatchOutcome({ matchedImage, players, currentTurnIndex, setPlayers })
          if (checkEndGame(updatedCards)) {
            setTimeout(() => setIsGameOver(true), 1200)
          }
          unlockBoard()
        },
        onMismatch: () => {
          handleMismatchOutcome({ nextTurn })
          unlockBoard()
        },
        unlockBoard
      })
    }
  }

  return { cards, flippedCards, handleCardClick, ariaMessage }
}
