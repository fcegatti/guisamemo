import { useEffect, useState } from 'react'
import { useGame } from '@context/GameContext'
import { getPlayersRanking } from '@logic/getPlayersRanking'
import { useLanguage } from '@context/LanguageContext'
import { useTheme } from '@context/ThemeContext'
import Podium from './Podium'
import Confetti from '@components/effects/Confetti'
import Fireworks from '@components/effects/Fireworks'
import EndGameModal from './EndGameModal'
import SinglePlayerSummary from './SinglePlayerSummary'

export default function EndScreen () {
  const { players } = useGame()
  const { t } = useLanguage()
  const { theme } = useTheme()
  const [showEffects, setShowEffects] = useState(false)
  const [showFinalModal, setShowFinalModal] = useState(false)
  const ranking = getPlayersRanking(players)
  const title = players.length === 1
    ? t.endscreen.titleSingle
    : t.endscreen.titleMulti

  useEffect(() => {
    const isSinglePlayer = players.length === 1
    const timers = []

    timers.push(setTimeout(() => setShowEffects(true), isSinglePlayer ? 1500 : 5900))
    timers.push(setTimeout(() => setShowFinalModal(true), 8500))

    return () => timers.forEach(clearTimeout)
  }, [players])

  if (!players || players.length === 0) {
    return <p>{t.endscreen.noPlayers}</p>
  }

  return (
    <div className='endscreen'>
      <h1 className='endscreen__title'>{title}</h1>

      {players.length === 1
        ? <SinglePlayerSummary />
        : <Podium players={ranking} />}

      {showEffects && (
        <>
          {theme === 'light' && <Confetti />}
          {theme === 'dark' && <Fireworks />}
        </>
      )}

      {showFinalModal && (
        <EndGameModal />
      )}

    </div>
  )
}
