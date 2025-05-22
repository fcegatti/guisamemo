import { GameProvider, useGame } from '@context/GameContext'
import { useLanguage } from '@context/LanguageContext'
import { useEffect } from 'react'
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
  const { t } = useLanguage()

  useEffect(() => {
    document.title = t('meta.title')
  }, [t])

  return (
    <GameProvider>
      <AppContent />
    </GameProvider>
  )
}

export default App
