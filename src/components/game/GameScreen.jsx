import { useState } from 'react'
import { useGame } from '@context/GameContext'
import ExitGameModal from './ExitGameModal'
import PlayersPanel from '../players/PlayersPanel'
import PlayerStatus from '../players/PlayerStatus'
import Board from './Board'
import { useMediaQuery } from '@hooks/useMediaQuery'

function GameScreen () {
  const { resetGame, players, currentTurnIndex } = useGame()
  const [showExitModal, setShowExitModal] = useState(false)

  const handleExitGame = () => {
    resetGame()
    setShowExitModal(false)
  }

  return (
    <div className='gamescreen'>
      {/* Exit button top right */}
      <button
        className='gamescreen__exit-btn'
        onClick={() => setShowExitModal(true)}
        aria-label='Salir del juego'
      >
        ✕
      </button>

      {useMediaQuery('(min-width: 600px)')
        ? <PlayersPanel />
        : (
          <div className='gamescreen__playerstatus'>
            <PlayerStatus player={players[currentTurnIndex]} />
          </div>
          )}

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
