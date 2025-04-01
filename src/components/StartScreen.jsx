import { useState } from 'react'

function StartScreen () {
  const [playerName, setPlayerName] = useState('')
  const [players, setPlayers] = useState([])

  const handleAddPlayer = () => {
    const trimmed = playerName.trim()
    if (trimmed && players.length < 4) {
      setPlayers([...players, trimmed])
      setPlayerName('')
    }
  }

  const handleStartGame = () => {
    // Lógica para iniciar el juego irá aquí
    console.log('Comenzar juego con:', players)
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
          type='text'
          placeholder='Nombre del jugador'
          value={playerName}
          onChange={(e) => setPlayerName(e.target.value)}
          className='startscreen__input'
        />
        <button
          onClick={handleAddPlayer}
          disabled={!playerName.trim() || players.length >= 4}
          className='startscreen__add-btn'
        >
          Añadir
        </button>
      </div>

      <ul className='startscreen__players'>
        {players.map((name, index) => (
          <li key={index} className='startscreen__player'>
            {name}
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
