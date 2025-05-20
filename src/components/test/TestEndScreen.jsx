/* global localStorage */

import { useEffect } from 'react'
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
  },
  {
    id: 'player-2',
    name: 'Maradonga',
    score: 40,
    avatar: 'avatar-10.webp',
    turns: 18
  }
]

export default function TestEndScreen () {
  useEffect(() => {
    if (window.location.pathname === '/test-end') {
      localStorage.setItem('theme', 'dark')
      localStorage.setItem('lang', 'gl')
    }
  }, [])
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
