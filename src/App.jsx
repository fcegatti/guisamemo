import { useState } from 'react'
import StartScreen from './components/StartScreen'
import GameBoard from './components/GameBoard'

function App () {
  const [isGameStarted, setIsGameStarted] = useState(false)

  return (
    <>
      {!isGameStarted && (
        <StartScreen onStartGame={() => setIsGameStarted(true)} />
      )}

      {isGameStarted && <GameBoard />}
    </>
  )
}

export default App
