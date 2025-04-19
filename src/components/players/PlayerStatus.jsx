import { useGame } from '@context/GameContext'
import { useLanguage } from '@context/LanguageContext'

function PlayerStatus ({ player }) {
  const { currentTurnIndex, players } = useGame()
  const { t } = useLanguage()
  const currentPlayer = players[currentTurnIndex]
  const isActive = currentPlayer && currentPlayer.id === player.id

  return (
    <div className={`playerstatus ${isActive ? 'playerstatus--active' : ''}`}>
      <img
        src={player.avatar
          ? `/avatars/${player.avatar}`
          : '/avatar-default.webp'}
        alt={`Avatar de ${player.name}`}
        className='playerstatus__avatar'
      />
      <div className='playerstatus__info'>
        <span className='playerstatus__name'>{player.name}</span>
        <span
          className='playerstatus__score'
          aria-label={`${player.score} ${t.podium.points}`}
        >
          {player.score} pts
        </span>
      </div>
    </div>
  )
}

export default PlayerStatus
