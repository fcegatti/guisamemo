import { GameProvider, useGame } from '@context/GameContext'
import { useNetworkStatus } from '@hooks/useNetworkStatus'
import { useDocumentMetadata } from '@hooks/useDocumentMetadata'
import UpdateBanner from '@components/UpdateBanner'
import { OfflineBanner } from '@components/interface/OfflineBanner'
import StartScreen from '@components/StartScreen'
import GameScreen from '@components/game/GameScreen'
import EndScreen from '@components/game/EndScreen'

function AppContent () {
  const { gameStarted, isGameOver } = useGame()
  const isOnline = useNetworkStatus()

  return (
    <main id='main-content'>
      {!isOnline && <OfflineBanner />}
      {!gameStarted && <StartScreen />}
      {gameStarted && !isGameOver && <GameScreen />}
      {isGameOver && <EndScreen />}
      <UpdateBanner />
    </main>
  )
}

function App () {
  useDocumentMetadata()

  return (
    <GameProvider>
      <AppContent />
    </GameProvider>
  )
}

export default App
