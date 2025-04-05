import { useGame } from '@context/GameContext'
import '@styles/playerstatus.css'

function PlayerStatus ({ player, index }) {
  const { currentTurnIndex } = useGame()
  const isActive = index === currentTurnIndex

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
        <span className='playerstatus__score'>{player.score} pts</span>
      </div>
    </div>
  )
}

export default PlayerStatus
