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
import { useMediaQuery } from '@hooks/useMediaQuery'

export default function EndScreen () {
  const { players } = useGame()
  const { t } = useLanguage()
  const { theme } = useTheme()
  const [showEffects, setShowEffects] = useState(false)
  const [showFinalModal, setShowFinalModal] = useState(false)
  const reduceMotion = useMediaQuery('(prefers-reduced-motion: reduce)')
  const ranking = getPlayersRanking(players)
  const title = players.length === 1
    ? t.endscreen.titleSingle
    : t.endscreen.titleMulti

  useEffect(() => {
    const isSinglePlayer = players.length === 1
    const timers = []

    if (reduceMotion) {
      // Skip animation delays entirely
      setShowEffects(false)
    } else {
      timers.push(setTimeout(() => setShowEffects(true), isSinglePlayer ? 1500 : 5900))
    }

    timers.push(setTimeout(() => setShowFinalModal(true), 8500))

    return () => timers.forEach(clearTimeout)
  }, [players, reduceMotion])

  if (!players || players.length === 0) {
    return <p>{t.endscreen.noPlayers}</p>
  }

  return (
    <div className='endscreen'>
      <h1
        className={`endscreen__title ${players.length === 1 ? 'endscreen__title--slow' : 'endscreen__title--fast'}`}
      >{title}
      </h1>

      {players.length === 1
        ? <SinglePlayerSummary />
        : <Podium players={ranking} />}

      {showEffects && (
        <>
          {(theme === 'light' || players.length === 1) && <Confetti />}
          {theme === 'dark' && players.length > 1 && <Fireworks />}
        </>
      )}

      {showFinalModal && (
        <EndGameModal />
      )}

    </div>
  )
}
