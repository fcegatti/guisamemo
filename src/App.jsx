import { GameProvider, useGame } from '@context/GameContext'
import StartScreen from '@components/StartScreen'
import GameBoard from '@components/GameBoard'

function AppContent () {
  const { gameStarted } = useGame()

  return (
    <>
      {!gameStarted && <StartScreen />}
      {gameStarted && <GameBoard />}
    </>
  )
}

function App () {
  return (
    <GameProvider>
      <AppContent />
    </GameProvider>
  )
}

export default App
