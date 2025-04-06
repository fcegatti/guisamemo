import EndScreen from '../game/EndScreen'
import { GameProvider } from '@context/GameContext'

const mockPlayers = [
  {
    id: 'player-1',
    name: 'Messi',
    score: 40,
    avatar: 'avatar-10.webp'
  },
  {
    id: 'player-2',
    name: 'Roque',
    score: 30,
    avatar: 'avatar-2.webp'
  },
  {
    id: 'player-3',
    name: 'Telmo',
    score: 15,
    avatar: 'avatar-1.webp'
  }
]

export default function TestEndScreen () {
  return (
    <GameProvider initialPlayers={mockPlayers}>
      <EndScreen />
    </GameProvider>
  )
}
