import { useLanguage } from '@context/LanguageContext'
import AvatarSelector from '@components/interface/selectors/AvatarSelector'

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
      className='playerlist'
      role='list'
      aria-label={t.access.players.list}
    >
      {players.map((player) => (
        <li
          key={player.id}
          className='playerlist__item'
          role='listitem'
        >
          <span
            id={`player-name-${player.id}`}
            className='playerlist__name'
          >
            {player.name}
          </span>
          <button
            type='button'
            className='playerlist__avatar-button'
            onClick={() => setSelectingAvatarFor(player.id)}
            aria-labelledby={`player-name-${player.id}`}
            title={
              player.avatar
                ? t.access.avatar.selector.selected.replace('{avatar}', getAvatarName(player.avatar))
                : t.access.avatar.selector.select
            }
          >
            <img
              src={player.avatar ? `/avatars/${player.avatar}` : '/avatar-default.webp'}
              alt={
                player.avatar
                  ? t.access.avatar.selector.selected.replace('{avatar}', getAvatarName(player.avatar))
                  : t.access.avatar.selector.select
              }
              className='playerlist__avatar'
            />
          </button>
          {selectingAvatarFor === player.id && (
            <AvatarSelector
              currentAvatar={player.avatar}
              onSelect={(filename) =>
                handleAvatarSelectWrapper(player.id, filename)}
            />
          )}
          <button
            type='button'
            className='playerlist__remove-button'
            onClick={() => handleDeletePlayer(player.id)}
            aria-label={t.access.players.remove.replace('{name}', player.name)}
            title={t.access.players.remove.replace('{name}', player.name)}
          >
            🗑️
          </button>
        </li>
      ))}
    </ul>
  )
}

export default PlayerList
