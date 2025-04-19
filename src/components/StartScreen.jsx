import { useState } from 'react'
import { useGame } from '@context/GameContext'
import { useLanguage } from '@context/LanguageContext'
import BoardSizeSelector from '@components/game/BoardSizeSelector'
import AvatarSelector from '@components/avatar/AvatarSelector'
import { handleAddPlayer } from '@handlers/handleAddPlayer'
import { handleAvatarSelect } from '@handlers/handleAvatarSelect'
import { MAX_PLAYERS, MAX_NAME_LENGTH } from '@constants/game'
import { useMediaQuery } from '@hooks/useMediaQuery'
import { AVATAR_INFO } from '@constants/avatars'

function StartScreen () {
  const [playerName, setPlayerName] = useState('')
  const [error, setError] = useState('')
  const [selectingAvatarFor, setSelectingAvatarFor] = useState(null)

  const { t } = useLanguage()
  const { lang, setLang } = useLanguage()

  const toggleLang = () => {
    setLang(lang === 'es' ? 'gl' : 'es')
  }

  const flagSrc = lang === 'es' ? '/galicia.webp' : '/spain.webp'
  const flagAlt = lang === 'es' ? t.lang.switchToGl : t.lang.switchToEs

  const {
    players,
    addPlayer,
    removePlayer,
    startGame,
    setPlayers
  } = useGame()

  const isMaxPlayers = players.length >= MAX_PLAYERS

  const handleAddPlayerWrapper = () => {
    handleAddPlayer({
      playerName,
      players,
      addPlayer,
      setPlayerName,
      setError,
      t
    })
  }

  const handleAvatarSelectWrapper = (playerId, filename) => {
    handleAvatarSelect({
      playerId,
      filename,
      setPlayers,
      setSelectingAvatarFor
    })
  }

  const getAvatarName = (filename) => {
    const found = AVATAR_INFO.find(a => a.filename === filename)
    return found?.name || ''
  }

  const handleDeletePlayer = (id) => {
    removePlayer(id)
  }

  const handleStartGame = () => {
    startGame()
  }

  const isTabletOrLarger = useMediaQuery('(min-width: 600px)')

  return (
    <div className='startscreen'>
      <div className='startscreen__top'>
        <h1 className='sr-only'>Guisamemo</h1>
        <img
          src='/logo.webp'
          width='384'
          height='384'
          alt='Logo Guisamemo'
          className='startscreen__logo'
        />
        <button
          onClick={toggleLang}
          className='startscreen__lang-btn'
          aria-label={flagAlt}
          title={flagAlt}
        >
          <img
            src={flagSrc}
            alt={flagAlt}
            width='60'
            height='40'
            className='startscreen__lang-flag'
          />
        </button>
      </div>

      <div className='startscreen__middle'>
        {isTabletOrLarger && <BoardSizeSelector />}
        <div className='startscreen__form'>
          <label htmlFor='player-name' className='sr-only'>
            {t.start.label}
          </label>
          <input
            name='player-name'
            id='player-name'
            type='text'
            placeholder={isMaxPlayers ? t.start.maxReached : t.start.placeholder}
            value={playerName}
            onChange={(e) => setPlayerName(e.target.value)}
            disabled={isMaxPlayers}
            maxLength={MAX_NAME_LENGTH}
            className='startscreen__input'
          />
          <button
            onClick={handleAddPlayerWrapper}
            disabled={!playerName.trim() || isMaxPlayers}
            className='startscreen__add-btn'
            aria-label={t.start.addPlayer}
          >
            {t.start.addPlayer}
          </button>
        </div>
        {error && <p className='startscreen__error'>{error}</p>}
        <ul className='startscreen__players'>
          {players.map((player) => (
            <li key={player.id} className='startscreen__player'>
              <span className='startscreen__player-name'>{player.name}</span>
              <div className='startscreen__player-avatar-container'>
                <img
                  src={player.avatar ? `/avatars/${player.avatar}` : '/avatar-default.webp'}
                  alt={
                    player.avatar
                      ? t.start.avatarSelected.replace('{avatar}', getAvatarName(player.avatar))
                      : t.start.selectAvatar
                  }
                  title={
                    player.avatar
                      ? t.start.avatarSelected.replace('{avatar}', getAvatarName(player.avatar))
                      : t.start.selectAvatar
                  }
                  aria-label={
                    player.avatar
                      ? t.start.avatarSelected.replace('{avatar}', getAvatarName(player.avatar))
                      : t.start.selectAvatar
                  }
                  className='startscreen__player-avatar'
                  onClick={() => setSelectingAvatarFor(player.id)}
                />
                {selectingAvatarFor === player.id && (
                  <AvatarSelector
                    onSelect={(filename) =>
                      handleAvatarSelectWrapper(player.id, filename)}
                  />
                )}
              </div>
              <button
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
      </div>

      <div className='startscreen__bottom'>
        <button
          onClick={handleStartGame}
          disabled={players.length === 0}
          className='startscreen__start-btn'
          aria-label={t.start.startGame}
        >
          {t.start.startGame}
        </button>
      </div>
    </div>
  )
}
export default StartScreen
