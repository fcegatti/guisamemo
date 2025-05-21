import { useState } from 'react'
import { useGame } from '@context/GameContext'
import { useLanguage } from '@context/LanguageContext'
import ThemeSelector from '@components/interface/ThemeSelector'
import LanguageSelector from '@components/interface/LanguageSelector'
import BoardSizeSelector from '@components/game/BoardSizeSelector'
import PlayerForm from '@components/players/PlayerForm'
import PlayerList from '@components/players/PlayerList'
import { getAvatarName } from '@logic/getAvatarName'
import StartGameButton from '@components/interface/StartGameButton'
import { handleAddPlayer } from '@handlers/handleAddPlayer'
import { handleAvatarSelect } from '@handlers/handleAvatarSelect'
import { MAX_PLAYERS } from '@constants/game'
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

  const handleDeletePlayer = (id) => {
    removePlayer(id)
  }

  const isTabletOrLarger = useMediaQuery('(min-width: 600px)')

  return (
    <main className='startscreen'>
      <header className='startscreen__top'>
        <h1 className='sr-only'>Guisamemo</h1>
        {/*
            ✅ Decorative logo with fallback: alt provides visible text if image fails.
            Screen readers skip it (aria-hidden), but <h1> ensures semantic and accessible title.
            See WCAG: https://www.w3.org/WAI/tutorials/images/decorative/
        */}
        <img
          src='/logo.webp'
          width='384'
          height='384'
          alt='Logo Guisamemo'
          className='startscreen__logo'
          aria-hidden='true'
          decoding='async'
          loading='eager'
        />
        <nav aria-label={t.nav.selectors}>
          <ThemeSelector />
          <LanguageSelector />
        </nav>
      </header>

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
        <StartGameButton />
      </div>
    </main>
  )
}
export default StartScreen
