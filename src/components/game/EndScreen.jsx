import { useEffect, useState } from 'react'
import { useGame } from '@context/GameContext'
import { getPlayersRanking } from '@logic/getPlayersRanking'
import { useLanguage } from '@context/LanguageContext'
import Podium from './Podium'
import Fireworks from '@components/effects/Fireworks'
import EndGameModal from './EndGameModal'

export default function EndScreen () {
  const { players } = useGame()
  const { t } = useLanguage()
  const [showFireworks, setShowFireworks] = useState(false)
  const [showFinalModal, setShowFinalModal] = useState(false)
  const ranking = getPlayersRanking(players)

  useEffect(() => {
    const timers = [
      setTimeout(() => setShowFireworks(true), 5900),
      setTimeout(() => setShowFinalModal(true), 8500)
    ]
    return () => timers.forEach(clearTimeout)
  }, [])

  if (!players || players.length === 0) {
    return <p>{t.endscreen.noPlayers}</p>
  }

  return (
    <div className='endscreen'>
      <h1 className='endscreen__title'>🏆 {t.endscreen.title} 🏆</h1>
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
