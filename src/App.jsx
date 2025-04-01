import { GameProvider, useGame } from '@context/GameContext'
import StartScreen from '@components/StartScreen'
import GameScreen from '@components/game/GameScreen'

function AppContent () {
  const { gameStarted } = useGame()

  return (
    <>
      {!gameStarted && <StartScreen />}
      {gameStarted && <GameScreen />}
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
