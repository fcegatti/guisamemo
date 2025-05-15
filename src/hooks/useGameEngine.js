import { useState, useEffect } from 'react'
import { generateDeck } from '@utils/deck'
import { handleCardClick } from '@handlers/handleCardClick'
import { useGame } from '@context/GameContext'
import { useLanguage } from '@context/LanguageContext'

export function useGameEngine () {
  const {
    boardSize,
    players,
    currentTurnIndex,
    setPlayers,
    nextTurn,
    setIsGameOver,
    setTurnCount
  } = useGame()
  const [cards, setCards] = useState([])
  const [flippedCards, setFlippedCards] = useState([])
  const [isBoardLocked, setIsBoardLocked] = useState(false)
  const [ariaMessage, setAriaMessage] = useState('')
  const { t } = useLanguage()

  const lockBoard = () => setIsBoardLocked(true)
  const unlockBoard = () => setIsBoardLocked(false)

  // Generate deck when board size changes
  useEffect(() => {
    setCards(generateDeck(boardSize))
  }, [boardSize])

  // Handle user clicking a card
  const handleCardClickWrapper = (cardId) => {
    if (isBoardLocked) return
    handleCardClick({
      cardId,
      cards,
      flippedCards,
      setCards,
      setFlippedCards,
      setAriaMessage,
      lockBoard,
      unlockBoard,
      t,
      players,
      currentTurnIndex,
      setPlayers,
      setTurnCount,
      nextTurn,
      setIsGameOver
    })
  }

  return {
    cards,
    flippedCards,
    handleCardClick: handleCardClickWrapper,
    ariaMessage
  }
}
