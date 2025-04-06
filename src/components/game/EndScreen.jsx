import { useGame } from '@context/GameContext'
import { getPlayersRanking } from '@logic/getPlayersRanking'
import Podium from './Podium'

export default function EndScreen () {
  const { players } = useGame()
  const ranking = getPlayersRanking(players)

  if (!players || players.length === 0) {
    return <p>Error: No hay jugadores registrados.</p>
  }

  return (
    <div className='endscreen'>
      <h1 className='endscreen__title'>🏆 Resultados 🏆</h1>
      <Podium players={ranking} />
    </div>
  )
}
