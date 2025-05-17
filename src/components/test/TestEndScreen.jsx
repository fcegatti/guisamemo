/* global localStorage */

import EndScreen from '../game/EndScreen'
import { GameProvider } from '@context/GameContext'
import { LanguageProvider } from '@context/LanguageContext'
import { ThemeProvider } from '@context/ThemeContext'
import '@styles/index.css'

const mockPlayers = [
  {
    id: 'player-1',
    name: 'Maradona',
    score: 40,
    avatar: 'avatar-10.webp',
    turns: 18
  }
]

localStorage.setItem('theme', 'dark')
localStorage.setItem('lang', 'es')

export default function TestEndScreen () {
  return (
    <LanguageProvider>
      <ThemeProvider>
        <GameProvider initialPlayers={mockPlayers}>
          <EndScreen />
        </GameProvider>
      </ThemeProvider>
    </LanguageProvider>
  )
}
