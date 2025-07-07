import { useState, useEffect, useRef } from 'react'
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
    incrementTurn
  } = useGame()
  const [cards, setCards] = useState([])
  const [flippedCards, setFlippedCards] = useState([])
  const [isBoardLocked, setIsBoardLocked] = useState(false)
  const [ariaMessage, setAriaMessage] = useState('')
  const { t } = useLanguage()

  // 🛡️ DEFENSIVE: Track active timers for cleanup
  const activeTimers = useRef(new Set())

  const lockBoard = () => setIsBoardLocked(true)
  const unlockBoard = () => setIsBoardLocked(false)

  // 🛡️ DEFENSIVE: Register timer for cleanup
  const registerTimer = (timerId) => {
    activeTimers.current.add(timerId)
  }

  // 🛡️ DEFENSIVE: Clear all active timers
  const clearAllTimers = () => {
    activeTimers.current.forEach(timerId => {
      clearTimeout(timerId)
    })
    activeTimers.current.clear()

    if (import.meta.env.MODE === 'development') {
      console.log('[useGameEngine] Cleared all active timers')
    }
  }

  // Generate deck when board size changes
  useEffect(() => {
    setCards(generateDeck(boardSize))
  }, [boardSize])

  // 🛡️ DEFENSIVE: Cleanup timers on unmount
  useEffect(() => {
    return () => {
      clearAllTimers()
    }
  }, [])

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
      incrementTurn,
      nextTurn,
      setIsGameOver,
      registerTimer
    })
  }

  return {
    cards,
    flippedCards,
    handleCardClick: handleCardClickWrapper,
    ariaMessage,
    clearAllTimers
  }
}
