import { GameProvider, useGame } from '@context/GameContext'
import UpdateBanner from '@components/UpdateBanner'
import StartScreen from '@components/StartScreen'
import GameScreen from '@components/game/GameScreen'
import EndScreen from '@components/game/EndScreen'

function AppContent () {
  const { gameStarted, isGameOver } = useGame()

  return (
    <>
      {!navigator.onLine && (
        <div style={{ background: 'red', color: 'white', padding: '10px' }}>
          ¡Modo offline! (Aviso temporal - luego lo mejoraremos)
        </div>
      )}
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
