import { useEffect, useState } from 'react'
import { useGame } from '@context/GameContext'
import { useLanguage } from '@context/LanguageContext'
import { useTheme } from '@context/ThemeContext'
import Confetti from '@components/effects/Confetti'
import Fireworks from '@components/effects/Fireworks'

export default function SinglePlayerSummary () {
  const { players, boardSize } = useGame()
  const { t } = useLanguage()
  const { theme } = useTheme()
  const [showSummary, setShowSummary] = useState(false)
  const [showEffect, setShowEffect] = useState(false)
  const player = players[0]

  useEffect(() => {
    const timers = [
      setTimeout(() => setShowEffect(true), 1500),
      setTimeout(() => setShowSummary(true), 1500)
    ]
    return () => timers.forEach(clearTimeout)
  }, [])

  return (
    <div className='summary'>

      {showEffect && (
        <>
          {theme === 'light' && <Confetti />}
          {theme === 'dark' && <Fireworks />}
        </>
      )}

      {showSummary && (
        <div className='summary__card'>
          <h2 className='summary__title'>{t.singleSummary.title}</h2>
          <p className='summary__text'>
            {t.singleSummary.summary
              .replace('{boardSize}', boardSize)
              .replace('{turns}', player.turns)}
          </p>

          <div className='summary__player'>
            <img
              src={`/avatars/${player.avatar || 'avatar-default.webp'}`}
              alt={t.singleSummary.avatarAlt.replace('{ name}', player.name)}
              className='summary__avatar'
            />
            <p className='summary__name'>{player.name}</p>
            <p className='summary__points'>
              {t.singleSummary.points.replace('{points}', player.score)}
            </p>
          </div>

          <p className='summary__prompt'>{t.singleSummary.prompt}</p>

          <button className='summary__share' disabled>
            {t.singleSummary.share}
          </button>
        </div>
      )}
    </div>
  )
}
