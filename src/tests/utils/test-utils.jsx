// Test utilities for React components with providers
import { render } from '@testing-library/react'
import { GameProvider } from '@context/GameContext'
import { LanguageProvider } from '@context/LanguageContext'
import { ThemeProvider } from '@context/ThemeContext'

/**
 * Custom render function that wraps components with necessary providers
 * Usage: renderWithProviders(<MyComponent />, { initialPlayers: [...] })
 */
export function renderWithProviders (ui, options = {}) {
  const {
    initialPlayers = [],
    ...renderOptions
  } = options

  function Wrapper ({ children }) {
    return (
      <ThemeProvider>
        <LanguageProvider>
          <GameProvider initialPlayers={initialPlayers}>
            {children}
          </GameProvider>
        </LanguageProvider>
      </ThemeProvider>
    )
  }

  return render(ui, { wrapper: Wrapper, ...renderOptions })
}

// Mock data for testing
export const mockPlayers = [
  {
    id: 'test-player-1',
    name: 'Test Player A',
    score: 40,
    avatar: 'avatar-1.webp',
    turns: 12
  },
  {
    id: 'test-player-2',
    name: 'Test Player B',
    score: 30,
    avatar: 'avatar-2.webp',
    turns: 10
  }
]

// Re-export everything from testing-library for convenience
export * from '@testing-library/react'
export { default as userEvent } from '@testing-library/user-event'
