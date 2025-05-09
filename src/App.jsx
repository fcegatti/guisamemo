import { GameProvider, useGame } from '@context/GameContext'
import UpdateBanner from '@components/UpdateBanner'
import { OfflineBanner } from '@components/interface/OfflineBanner'
import StartScreen from '@components/StartScreen'
import GameScreen from '@components/game/GameScreen'
import EndScreen from '@components/game/EndScreen'
import { useNetworkStatus } from '@hooks/useNetworkStatus'

function AppContent () {
  const { gameStarted, isGameOver } = useGame()
  const isOnline = useNetworkStatus()

  return (
    <>
      {!isOnline && <OfflineBanner />}
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
