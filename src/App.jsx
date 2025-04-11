import { GameProvider, useGame } from '@context/GameContext'
import UpdateBanner from '@components/UpdateBanner'
import StartScreen from '@components/StartScreen'
import GameScreen from '@components/game/GameScreen'
import EndScreen from '@components/game/EndScreen'

function AppContent () {
  const { gameStarted, isGameOver } = useGame()

  return (
    <>
      {!gameStarted && <StartScreen />}
      {gameStarted && !isGameOver && <GameScreen />}
      {isGameOver && <EndScreen />}
      <UpdateBanner />
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
