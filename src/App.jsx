import { GameProvider, useGame } from '@context/GameContext'
import StartScreen from '@components/StartScreen'
import Board from '@components/game/Board'

function AppContent () {
  const { gameStarted } = useGame()

  return (
    <>
      {!gameStarted && <StartScreen />}
      {gameStarted && <Board />}
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
