import { useEffect, useState } from 'react'
import { useGame } from '@context/GameContext'
import { getPlayersRanking } from '@logic/getPlayersRanking'
import Podium from './Podium'

export default function EndScreen () {
  const { players, restartGame, resetGame } = useGame()
  const [showButtons, setShowButtons] = useState(false)
  const ranking = getPlayersRanking(players)

  useEffect(() => {
    const timer = setTimeout(() => setShowButtons(true), 2200)
    return () => clearTimeout(timer)
  }, [])

  if (!players || players.length === 0) {
    return <p>Error: No hay jugadores registrados.</p>
  }

  return (
    <div className='endscreen'>
      <h1 className='endscreen__title'>🏆 Resultados 🏆</h1>

      <Podium players={ranking} />

      {showButtons && (
        <div className='endscreen__buttons'>
          <button
            className='endscreen__button'
            onClick={restartGame}
          >
            Reiniciar partida
          </button>
          <button
            className='endscreen__button'
            onClick={resetGame}
          >
            Menú principal
          </button>
        </div>
      )}
    </div>
  )
}
