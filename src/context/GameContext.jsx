import { createContext, useContext, useState } from 'react'
import { MAX_PLAYERS, BOARD_SIZES } from '@constants/game'
import { createPlayer } from '@logic/createPlayer'
import { incrementPlayerTurn, calculateTotalTurns } from '@handlers/handleTurnCount'

// Create the context
const GameContext = createContext()

// Custom hook for easy access
export const useGame = () => useContext(GameContext)

export function GameProvider ({ children, initialPlayers = [] }) {
  const [boardSize, setBoardSizeState] = useState('xs')
  const [players, setPlayers] = useState(initialPlayers)
  const [currentTurnIndex, setCurrentTurnIndex] = useState(0)
  const [gameStarted, setGameStarted] = useState(false)
  const [isGameOver, setIsGameOver] = useState(false)
  const [turnCount, setTurnCount] = useState(0)

  const addPlayer = (name) => {
    if (players.length >= MAX_PLAYERS) return
    const newPlayer = createPlayer(name, players.length)
    setPlayers((prev) => [...prev, newPlayer])
  }

  const removePlayer = (id) => {
    setPlayers((prev) => prev.filter((p) => p.id !== id))
  }

  // 🛡️ DEFENSIVE: Validate board size before setting
  const setBoardSize = (size) => {
    if (!BOARD_SIZES.includes(size)) {
      if (import.meta.env.MODE === 'development') {
        console.warn(`[GameContext] Invalid board size attempted: ${size}. Keeping current: ${boardSize}`)
      }
      return
    }
    setBoardSizeState(size)
  }

  const startGame = () => {
    // 🛡️ DEFENSIVE: Prevent double game start (idempotent function)
    if (gameStarted) {
      if (import.meta.env.MODE === 'development') {
        console.warn('[GameContext] Attempted to start game that is already started')
      }
      return
    }
    // 🛡️ DEFENSIVE: Ensure there are players before starting
    if (players.length === 0) {
      if (import.meta.env.MODE === 'development') {
        console.warn('[GameContext] Attempted to start game without players')
      }
      return
    }

    setPlayers(prevPlayers =>
      prevPlayers.map(player => ({
        ...player,
        turns: 0
      }))
    )

    setGameStarted(true)
  }

  const resetGame = () => {
    setPlayers([])
    setCurrentTurnIndex(0)
    setTurnCount(0)
    setGameStarted(false)
    setIsGameOver(false)
  }

  const nextTurn = () => {
    // 🛡️ DEFENSIVE: Prevent division by zero in turn rotation
    if (players.length === 0) {
      if (import.meta.env.MODE === 'development') {
        console.warn('[GameContext] nextTurn called with no players')
      }
      return
    }

    const nextIndex = (currentTurnIndex + 1) % players.length
    setCurrentTurnIndex(nextIndex)

    if (import.meta.env.MODE === 'development') {
      console.log('🔄 NEXT TURN:', {
        previousPlayer: players[currentTurnIndex]?.name,
        nextPlayer: players[nextIndex]?.name
      })
    }
  }

  const incrementTurn = (eventType = 'mismatch', providedPlayers = null) => {
    const playersToUse = providedPlayers || players

    const updatedPlayers = incrementPlayerTurn({
      players: playersToUse,
      currentTurnIndex,
      eventType
    })

    setPlayers(updatedPlayers)

    const newTurnCount = calculateTotalTurns(updatedPlayers)
    setTurnCount(newTurnCount)

    return updatedPlayers
  }

  const restartGame = () => {
    const resetPlayers = players.map(player => ({
      ...player,
      score: 0,
      turns: 0
    }))

    setPlayers(resetPlayers)
    setCurrentTurnIndex(0)
    setTurnCount(0)
    setIsGameOver(false)
  }

  const value = {
    boardSize,
    setBoardSize,
    players,
    setPlayers,
    addPlayer,
    removePlayer,
    gameStarted,
    startGame,
    resetGame,
    currentTurnIndex,
    setCurrentTurnIndex,
    turnCount,
    setTurnCount,
    nextTurn,
    incrementTurn,
    isGameOver,
    setIsGameOver,
    restartGame
  }

  return (
    <GameContext.Provider value={value}>
      {children}
    </GameContext.Provider>
  )
}
