import { useGame } from '@context/GameContext'
import { useLanguage } from '@context/LanguageContext'

export default function SinglePlayerSummary () {
  const { players, boardSize } = useGame()
  const { t } = useLanguage()
  const player = players[0]

  return (
    <div className='summary'>
      <div className='summary__card'>
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
    </div>
  )
}
