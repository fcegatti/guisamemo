import { useLanguage } from '@context/LanguageContext'
import AvatarSelector from '@components/avatar/AvatarSelector'

function PlayerList ({
  players,
  selectingAvatarFor,
  setSelectingAvatarFor,
  handleAvatarSelectWrapper,
  handleDeletePlayer,
  getAvatarName
}) {
  const { t } = useLanguage()

  return (
    <ul
      className='startscreen__players'
      role='list'
      aria-label={t.start.playerListLabel}
    >
      {players.map((player) => (
        <li
          key={player.id}
          className='startscreen__player'
          role='listitem'
        >
          <span
            id={`player-name-${player.id}`}
            className='startscreen__player-name'
          >
            {player.name}
          </span>
          <button
            type='button'
            className='startscreen__player-avatar-btn'
            onClick={() => setSelectingAvatarFor(player.id)}
            aria-labelledby={`player-name-${player.id}`}
            title={
              player.avatar
                ? t.start.avatarSelected.replace('{avatar}', getAvatarName(player.avatar))
                : t.start.selectAvatar
            }
          >
            <img
              src={player.avatar ? `/avatars/${player.avatar}` : '/avatar-default.webp'}
              alt={
                player.avatar
                  ? t.start.avatarSelected.replace('{avatar}', getAvatarName(player.avatar))
                  : t.start.selectAvatar
              }
              className='startscreen__player-avatar'
            />
          </button>
          {selectingAvatarFor === player.id && (
            <AvatarSelector
              onSelect={(filename) =>
                handleAvatarSelectWrapper(player.id, filename)}
            />
          )}
          <button
            type='button'
            className='startscreen__remove-btn'
            onClick={() => handleDeletePlayer(player.id)}
            aria-label={t.start.removePlayer.replace('{name}', player.name)}
            title={t.start.removePlayer.replace('{name}', player.name)}
          >
            🗑️
          </button>
        </li>
      ))}
    </ul>
  )
}

export default PlayerList
