import { useEffect, useState } from 'react'
import { useGame } from '@context/GameContext'
import { getPlayersRanking } from '@logic/getPlayersRanking'
import Podium from './Podium'
import Fireworks from './Fireworks'
import EndGameModal from './EndGameModal'

export default function EndScreen () {
  const { players } = useGame()
  const [showFireworks, setShowFireworks] = useState(false)
  const [showFinalModal, setShowFinalModal] = useState(false)
  const ranking = getPlayersRanking(players)

  useEffect(() => {
    const timers = [
      setTimeout(() => setShowFireworks(true), 4000),
      setTimeout(() => setShowFinalModal(true), 11500)
    ]
    return () => timers.forEach(clearTimeout)
  }, [])

  if (!players || players.length === 0) {
    return <p>Error: No hay jugadores registrados.</p>
  }

  return (
    <div className='endscreen'>
      <h1 className='endscreen__title'>🏆 Resultados 🏆</h1>
      <Podium players={ranking} />

      {showFireworks && (
        <Fireworks />
      )}

      {showFinalModal && (
        <EndGameModal />
      )}

    </div>
  )
}
