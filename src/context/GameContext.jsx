import { createContext, useContext, useState } from 'react'
import { MAX_PLAYERS } from '@constants/game'
import { createPlayer } from '@logic/createPlayer'

// Create the context
const GameContext = createContext()

// Custom hook for easy access
export const useGame = () => useContext(GameContext)

export function GameProvider ({ children, initialPlayers = [] }) {
  const [boardSize, setBoardSize] = useState('xs')
  const [players, setPlayers] = useState(initialPlayers)
  const [currentTurnIndex, setCurrentTurnIndex] = useState(0)
  const [gameStarted, setGameStarted] = useState(false)
  const [isGameOver, setIsGameOver] = useState(false)
  const [turnCount, setTurnCount] = useState(1)

  const addPlayer = (name) => {
    if (players.length >= MAX_PLAYERS) return
    const newPlayer = createPlayer(name, players.length)
    setPlayers((prev) => [...prev, newPlayer])
  }

  const removePlayer = (id) => {
    setPlayers((prev) => prev.filter((p) => p.id !== id))
  }

  const startGame = () => {
    if (players.length === 0) return
    setGameStarted(true)
  }

  const resetGame = () => {
    setPlayers([])
    setCurrentTurnIndex(0)
    setTurnCount(1)
    setGameStarted(false)
    setIsGameOver(false)
  }

  const nextTurn = () => {
    setCurrentTurnIndex(prevIndex => {
      const nextIndex = (prevIndex + 1) % players.length
      return nextIndex
    })
  }

  const restartGame = () => {
    const resetPlayers = players.map(player => ({
      ...player,
      score: 0,
      turns: 1
    }))

    setPlayers(resetPlayers)
    setCurrentTurnIndex(0)
    setTurnCount(1)
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
