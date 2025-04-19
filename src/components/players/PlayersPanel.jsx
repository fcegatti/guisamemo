import { useGame } from '@context/GameContext'
import { useLanguage } from '@context/LanguageContext'
import PlayerStatus from './PlayerStatus'

function PlayersPanel () {
  const { players } = useGame()
  const { t } = useLanguage()

  if (!players.length) return null

  return (
    <div
      className='playerspanel'
      role='region'
      aria-label={t.players.panelLabel}
    >
      {players.map((player) => (
        <PlayerStatus
          key={player.id}
          player={player}
        />
      ))}
    </div>
  )
}

export default PlayersPanel
