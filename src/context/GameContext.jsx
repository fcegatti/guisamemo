import { createContext, useContext, useState } from 'react'

// Initial state shape for a player
const createPlayer = (name, index) => ({
  id: `player-${Date.now()}-${index}`,
  name,
  avatar: null,
  score: 0
})

// Create the context
const GameContext = createContext()

// Custom hook for easy access
export const useGame = () => useContext(GameContext)

export function GameProvider ({ children }) {
  const [players, setPlayers] = useState([])
  const [currentTurnIndex, setCurrentTurnIndex] = useState(0)
  const [gameStarted, setGameStarted] = useState(false)

  const addPlayer = (name) => {
    if (players.length >= 4) return
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
    setGameStarted(false)
  }

  const nextTurn = () => {
    setCurrentTurnIndex(prevIndex => {
      const nextIndex = (prevIndex + 1) % players.length
      return nextIndex
    })
  }

  const value = {
    players,
    addPlayer,
    removePlayer,
    gameStarted,
    startGame,
    resetGame,
    currentTurnIndex,
    setCurrentTurnIndex,
    nextTurn
  }

  return (
    <GameContext.Provider value={value}>
      {children}
    </GameContext.Provider>
  )
}
