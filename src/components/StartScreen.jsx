import { useState } from 'react'
import { useGame } from '@context/GameContext'
import { useLanguage } from '@context/LanguageContext'
import BoardSizeSelector from '@components/game/BoardSizeSelector'
import AvatarSelector from '@components/avatar/AvatarSelector'
import { handleAddPlayer } from '@handlers/handleAddPlayer'
import { handleAvatarSelect } from '@handlers/handleAvatarSelect'
import { MAX_PLAYERS, MAX_NAME_LENGTH } from '@constants/game'
import { useMediaQuery } from '@hooks/useMediaQuery'

function StartScreen () {
  const [playerName, setPlayerName] = useState('')
  const [error, setError] = useState('')
  const [selectingAvatarFor, setSelectingAvatarFor] = useState(null)

  const { t } = useLanguage()

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
      setError
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
      </div>

      <div className='startscreen__middle'>
        {isTabletOrLarger && <BoardSizeSelector />}
        <div className='startscreen__form'>
          <label htmlFor='player-name' className='sr-only'>Nombre del jugador</label>
          <input
            name='player-name'
            id='player-name'
            type='text'
            placeholder={isMaxPlayers ? 'Máximo de jugadores alcanzado' : 'Nombre del jugador'}
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
            aria-label='Añadir jugador'
          >
            Añadir
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
                  alt='Avatar'
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
                aria-label={`Eliminar a ${player.name}`}
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
