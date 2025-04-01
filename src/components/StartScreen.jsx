import { useState } from 'react'

function StartScreen () {
  const [playerName, setPlayerName] = useState('')
  const [players, setPlayers] = useState([])
  const [error, setError] = useState('')

  const handleAddPlayer = () => {
    const trimmed = playerName.trim()

    if (!trimmed) {
      setError('El nombre no puede estar vacío')
      return
    }

    if (players.length >= 4) {
      setError('Máximo de 4 jugadores alcanzado')
      return
    }

    setPlayers([...players, trimmed])
    setPlayerName('')
    setError('')
  }

  const handleDeletePlayer = (indexToRemove) => {
    setPlayers(players.filter((_, index) => index !== indexToRemove))
  }

  const handleStartGame = () => {
    console.log('Comenzar juego con:', players)
    // Aquí irá la navegación o lógica principal
  }

  const isMaxPlayers = players.length >= 4

  return (
    <div className='startscreen'>
      <img
        src='/logo.webp'
        alt='Logo Guisamemo'
        className='startscreen__logo'
      />

      <div className='startscreen__form'>
        <input
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
        {players.map((name, index) => (
          <li key={index} className='startscreen__player'>
            {name}
            <button
              className='startscreen__remove-btn'
              onClick={() => handleDeletePlayer(index)}
              aria-label={`Eliminar a ${name}`}
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
