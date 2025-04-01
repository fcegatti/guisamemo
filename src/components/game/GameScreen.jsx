import PlayersPanel from '../players/PlayersPanel'
import Board from './Board'

function GameScreen () {
  return (
    <div className='gamescreen'>
      <PlayersPanel />
      <Board />
    </div>
  )
}

export default GameScreen
