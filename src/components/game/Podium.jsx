import { useEffect, useState } from 'react'

export default function Podium ({ players }) {
  const [visibleRanks, setVisibleRanks] = useState([false, false, false])
  const [readRankIndex, setReadRankIndex] = useState(null)

  // Progressive animation: third → second → first place
  useEffect(() => {
    const timers = [
      setTimeout(() => setVisibleRanks([true, false, false]), 500),
      setTimeout(() => setVisibleRanks([true, true, false]), 2500),
      setTimeout(() => setVisibleRanks([true, true, true]), 4500),

      setTimeout(() => setReadRankIndex(0), 500), // bronze
      setTimeout(() => setReadRankIndex(1), 2500), // silver
      setTimeout(() => setReadRankIndex(2), 4500) // gold
    ]
    return () => timers.forEach(clearTimeout)
  }, [])

  return (
    <>
      <div className='podium'>
        {/* Second place (left) */}
        <div className={`podium__block podium__second ${visibleRanks[1] ? 'visible' : ''}`}>
          {players[1] && (
            <div className='podium__content'>
              <img
                src={players[1].avatar}
                alt={`Avatar ${players[1].name}`}
                className='podium__avatar'
              />
              <p className='podium__name'>{players[1].name}</p>
              <span className='podium__points'>{players[1].score} pts</span>
            </div>
          )}
        </div>

        {/* First place (centre) */}
        <div className={`podium__block podium__first ${visibleRanks[2] ? 'visible' : ''}`}>
          {players[0] && (
            <div className='podium__content'>
              <img
                src={players[0].avatar}
                alt={`Avatar ${players[0].name}`}
                className='podium__avatar'
              />
              <p className='podium__name'>{players[0].name}</p>
              <span className='podium__points'>{players[0].score} pts</span>
            </div>
          )}
        </div>

        {/* Third place (right) */}
        <div className={`podium__block podium__third ${visibleRanks[0] ? 'visible' : ''}`}>
          {players[2] && (
            <div className='podium__content'>
              <img
                src={players[2].avatar}
                alt={`Avatar ${players[2].name}`}
                className='podium__avatar'
              />
              <p className='podium__name'>{players[2].name}</p>
              <span className='podium__points'>{players[2].score} pts</span>
            </div>
          )}
        </div>
      </div>
      {/* Synchronized screen reading */}
      {readRankIndex !== null &&
      players.length > readRankIndex &&
      players[players.length - 1 - readRankIndex] &&
      (
        <p className='sr-only' aria-live='polite'>
          {(() => {
            const index = players.length - 1 - readRankIndex // invertir para coincidir con la animación
            const player = players[index]
            const rank = readRankIndex + 1
            const label =
              rank === 1
                ? 'Tercer lugar'
                : rank === 2
                  ? 'Segundo lugar'
                  : rank === 3
                    ? 'Primer lugar'
                    : `${rank}º lugar`
            return `${label}: ${player.name}, ${player.score} puntos`
          })()}
        </p>
      )}

    </>
  )
}
