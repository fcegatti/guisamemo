import { useGame } from '@context/GameContext'
import { useLanguage } from '@context/LanguageContext'
import { CARDS_PER_SIZE } from '@constants/game'

export default function SinglePlayerSummary () {
  const { players, boardSize } = useGame()
  const { t } = useLanguage()
  const player = players[0]
  const cardCount = CARDS_PER_SIZE[boardSize]

  return (
    <div className='summary'>
      <div className='summary__card'>
        <p className='summary__text'>
          {t.singleSummary.summary.part1} <strong>{cardCount}</strong> {t.singleSummary.summary.cards}{' '}
          {t.singleSummary.summary.part2} <strong>{player.turns}</strong> {t.singleSummary.summary.turns}.
        </p>
        <div className='summary__player'>
          <img
            src={`/avatars/${player.avatar || 'avatar-default.webp'}`}
            alt={t.singleSummary.avatarAlt.replace('{name}', player.name)}
            className='summary__avatar'
          />
          <p className='summary__name'>{player.name}</p>
          <p className='summary__points'>
            {t.singleSummary.points.replace('{points}', player.score)}
          </p>
        </div>
        <p className='summary__prompt'>{t.singleSummary.prompt}</p>
      </div>
    </div>
  )
}
