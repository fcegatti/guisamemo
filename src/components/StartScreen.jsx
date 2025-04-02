import { useState } from 'react'
import { useGame } from '@context/GameContext'

function StartScreen () {
  const [playerName, setPlayerName] = useState('')
  const [error, setError] = useState('')

  const {
    players,
    addPlayer,
    removePlayer,
    startGame
  } = useGame()

  const isMaxPlayers = players.length >= 4

  const handleAddPlayer = () => {
    const trimmed = playerName.trim()

    if (!trimmed) {
      setError('El nombre no puede estar vacío')
      return
    }

    if (isMaxPlayers) {
      setError('Máximo de 4 jugadores alcanzado')
      return
    }

    addPlayer(trimmed)
    setPlayerName('')
    setError('')
  }

  const handleDeletePlayer = (id) => {
    removePlayer(id)
  }

  const handleStartGame = () => {
    startGame()
  }

  return (
    <div className='startscreen'>
      <img
        src='/logo.webp'
        alt='Logo Guisamemo'
        className='startscreen__logo'
      />

      <div className='startscreen__form'>
        <input
          name='player-name'
          id='player-name'
          type='text'
          placeholder={
            isMaxPlayers
              ? 'Máximo de jugadores alcanzado'
              : 'Nombre del jugador'
          }
          value={playerName}
          onChange={(e) => setPlayerName(e.target.value)}
          disabled={isMaxPlayers}
          maxLength={16}
          className='startscreen__input'
        />
        <button
          onClick={handleAddPlayer}
          disabled={!playerName.trim() || isMaxPlayers}
          className='startscreen__add-btn'
        >
          Añadir
        </button>
      </div>

      {error && <p className='startscreen__error'>{error}</p>}

      <ul className='startscreen__players'>
        {players.map((player) => (
          <li key={player.id} className='startscreen__player'>
            {player.name}
            <button
              className='startscreen__remove-btn'
              onClick={() => handleDeletePlayer(player.id)}
              aria-label={`Eliminar a ${player.name}`}
            >
              ✖
            </button>
          </li>
        ))}
      </ul>

      <button
        onClick={handleStartGame}
        disabled={players.length === 0}
        className='startscreen__start-btn'
      >
        Comenzar partida
      </button>
    </div>
  )
}

export default StartScreen
