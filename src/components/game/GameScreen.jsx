import { useState } from 'react'
import { useGame } from '@context/GameContext'
import ExitGameModal from './ExitGameModal'
import PlayersPanel from '../players/PlayersPanel'
import Board from './Board'

function GameScreen () {
  const { resetGame } = useGame()
  const [showExitModal, setShowExitModal] = useState(false)

  const handleExitGame = () => {
    resetGame()
    setShowExitModal(false)
  }

  return (
    <div className='gamescreen'>
      {/* Botón salir arriba derecha */}
      <button
        className='gamescreen__exit-btn'
        onClick={() => setShowExitModal(true)}
        aria-label='Salir del juego'
      >
        ✕
      </button>

      <PlayersPanel />
      <Board />

      {showExitModal && (
        <ExitGameModal
          onClose={() => setShowExitModal(false)}
          onExit={handleExitGame}
        />
      )}
    </div>
  )
}

export default GameScreen
