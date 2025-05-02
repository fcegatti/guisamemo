/* global sessionStorage */

import { useEffect, useState } from 'react'
import { useGame } from '@context/GameContext'
import { useMediaQuery } from '@hooks/useMediaQuery'
import { useLanguage } from '@context/LanguageContext'
import ExitGameModal from './ExitGameModal'
import PlayersPanel from '../players/PlayersPanel'
import PlayerStatus from '../players/PlayerStatus'
import Board from './Board'
import OrientationHint from '../interface/OrientationHint'

function GameScreen () {
  const { resetGame, players, currentTurnIndex, boardSize } = useGame()
  const [showExitModal, setShowExitModal] = useState(false)
  const { t } = useLanguage()
  const isTabletOrLarger = useMediaQuery('(min-width: 600px)')

  const handleExitGame = () => {
    resetGame()
    setShowExitModal(false)
  }

  // 🔄 Reset orientation hint if board size changes
  useEffect(() => {
    sessionStorage.removeItem('hideOrientationHint')
  }, [boardSize])

  return (
    <div className='gamescreen'>
      {/* Exit button top right */}
      <button
        className='gamescreen__exit-btn'
        onClick={() => setShowExitModal(true)}
        aria-label={t.game.exitAria}
        title={t.game.exitTooltip}
      >
        ✕
      </button>

      {/* ℹ️ Orientation hint for tablets in portrait */}
      <OrientationHint />

      {/* 🔵 ARIA-LIVE: turn annoucement */}
      {players.length > 0 && players[currentTurnIndex] && (
        <div className='sr-only' aria-live='polite'>
          {t.players.turnAnnounce.replace('{name}', players[currentTurnIndex].name)}
        </div>
      )}

      {isTabletOrLarger
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
