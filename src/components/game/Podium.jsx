import { useEffect, useState } from 'react'
import { useGame } from '@context/GameContext'
import { getPlayersRanking } from '@logic/getPlayersRanking'

export default function Podium () {
  const { players } = useGame()
  const [visibleRanks, setVisibleRanks] = useState([false, false, false])
  const rankedPlayers = getPlayersRanking(players)

  // Animación progresiva: tercera → segunda → primera posición
  useEffect(() => {
    const timers = [
      setTimeout(() => setVisibleRanks([true, false, false]), 500),
      setTimeout(() => setVisibleRanks([true, true, false]), 1000),
      setTimeout(() => setVisibleRanks([true, true, true]), 1500)
    ]
    return () => timers.forEach(clearTimeout)
  }, [])

  return (
    <div className='podium'>
      {/* Second place (left) */}
      <div className={`podium__block podium__second ${visibleRanks[1] ? 'visible' : ''}`}>
        {rankedPlayers[1] && (
          <>
            <img src={rankedPlayers[1].avatar} alt={`Avatar ${rankedPlayers[1].name}`} />
            <p>{rankedPlayers[1].name}</p>
            <span>{rankedPlayers[1].score} pts</span>
          </>
        )}
      </div>

      {/* First place (centre) */}
      <div className={`podium__block podium__first ${visibleRanks[2] ? 'visible' : ''}`}>
        {rankedPlayers[0] && (
          <>
            <img src={rankedPlayers[0].avatar} alt={`Avatar ${rankedPlayers[0].name}`} />
            <p>{rankedPlayers[0].name}</p>
            <span>{rankedPlayers[0].score} pts</span>
          </>
        )}
      </div>

      {/* Third place (right) */}
      <div className={`podium__block podium__third ${visibleRanks[0] ? 'visible' : ''}`}>
        {rankedPlayers[2] && (
          <>
            <img src={rankedPlayers[2].avatar} alt={`Avatar ${rankedPlayers[2].name}`} />
            <p>{rankedPlayers[2].name}</p>
            <span>{rankedPlayers[2].score} pts</span>
          </>
        )}
      </div>
    </div>
  )
}
