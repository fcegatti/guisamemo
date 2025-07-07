import { GameProvider, useGame } from '@context/GameContext'
import { useNetworkStatus } from '@hooks/useNetworkStatus'
import { useDocumentMetadata } from '@hooks/useDocumentMetadata'
import UpdateBanner from '@components/interface/banners/UpdateBanner'
import FirefoxWarning from '@components/interface/modals/FirefoxWarning'
import { OfflineBanner } from '@components/interface/banners/OfflineBanner'
import StartScreen from '@components/screens/StartScreen'
import GameScreen from '@components/screens/GameScreen'
import EndScreen from '@components/screens/EndScreen'

function AppContent () {
  const { gameStarted, isGameOver } = useGame()
  const isOnline = useNetworkStatus()

  return (
    <main id='main-content'>
      <FirefoxWarning />
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
