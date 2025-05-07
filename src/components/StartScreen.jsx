import { useState } from 'react'
import { useGame } from '@context/GameContext'
import { useLanguage } from '@context/LanguageContext'
import ThemeSelector from '@components/interface/ThemeSelector'
import LanguageSelector from '@components/interface/LanguageSelector'
import PlayerForm from '@components/players/PlayerForm'
import PlayerList from '@components/players/PlayerList'
import BoardSizeSelector from '@components/game/BoardSizeSelector'
import { handleAddPlayer } from '@handlers/handleAddPlayer'
import { handleAvatarSelect } from '@handlers/handleAvatarSelect'
import { MAX_PLAYERS } from '@constants/game'
import { useMediaQuery } from '@hooks/useMediaQuery'
import { AVATAR_INFO } from '@constants/avatars'

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
          aria-hidden='true'
        />
        <ThemeSelector />
        <LanguageSelector />
      </div>

      <div className='startscreen__middle'>
        {isTabletOrLarger && <BoardSizeSelector />}
        <PlayerForm
          playerName={playerName}
          setPlayerName={setPlayerName}
          onAddPlayer={handleAddPlayerWrapper}
          isDisabled={isMaxPlayers}
          error={error}
        />
        <PlayerList
          players={players}
          selectingAvatarFor={selectingAvatarFor}
          setSelectingAvatarFor={setSelectingAvatarFor}
          handleAvatarSelectWrapper={handleAvatarSelectWrapper}
          handleDeletePlayer={handleDeletePlayer}
          getAvatarName={getAvatarName}
        />
      </div>

      <div className='startscreen__bottom'>
        <button
          type='button'
          onClick={handleStartGame}
          disabled={players.length === 0}
          className='startscreen__start-btn'
        >
          {t.start.startGame}
        </button>
      </div>
    </div>
  )
}
export default StartScreen
