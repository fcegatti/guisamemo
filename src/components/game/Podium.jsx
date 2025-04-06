import { useEffect, useState } from 'react'

export default function Podium ({ players }) {
  const [visibleRanks, setVisibleRanks] = useState([false, false, false])

  // Progressive animation: third → second → first place
  useEffect(() => {
    const timers = [
      setTimeout(() => setVisibleRanks([true, false, false]), 500),
      setTimeout(() => setVisibleRanks([true, true, false]), 1500),
      setTimeout(() => setVisibleRanks([true, true, true]), 3000)
    ]
    return () => timers.forEach(clearTimeout)
  }, [])

  return (
    <div className='podium'>
      {/* Second place (left) */}
      <div className={`podium__block podium__second ${visibleRanks[1] ? 'visible' : ''}`}>
        {players[1] && (
          <>
            <img src={players[1].avatar} alt={`Avatar ${players[1].name}`} />
            <p>{players[1].name}</p>
            <span>{players[1].score} pts</span>
          </>
        )}
      </div>

      {/* First place (centre) */}
      <div className={`podium__block podium__first ${visibleRanks[2] ? 'visible' : ''}`}>
        {players[0] && (
          <>
            <img src={players[0].avatar} alt={`Avatar ${players[0].name}`} />
            <p>{players[0].name}</p>
            <span>{players[0].score} pts</span>
          </>
        )}
      </div>

      {/* Third place (right) */}
      <div className={`podium__block podium__third ${visibleRanks[0] ? 'visible' : ''}`}>
        {players[2] && (
          <>
            <img src={players[2].avatar} alt={`Avatar ${players[2].name}`} />
            <p>{players[2].name}</p>
            <span>{players[2].score} pts</span>
          </>
        )}
      </div>
    </div>
  )
}
