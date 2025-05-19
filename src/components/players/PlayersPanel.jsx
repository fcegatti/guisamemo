import { useGame } from '@context/GameContext'
import { useLanguage } from '@context/LanguageContext'
import PlayerStatus from './PlayerStatus'

function PlayersPanel () {
  const { players } = useGame()
  const { t } = useLanguage()

  if (!players.length) return null

  return (
    <aside
      className='playerspanel'
      role='complementary'
      aria-label={t.access.playersPanel}
    >
      {players.map((player) => (
        <PlayerStatus
          key={player.id}
          player={player}
        />
      ))}
    </aside>
  )
}

export default PlayersPanel
