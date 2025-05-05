import { StrictMode, useEffect } from 'react'
import { createRoot } from 'react-dom/client'
import AppRouter from './AppRouter.jsx'
import { LanguageProvider } from '@context/LanguageContext'
import { ThemeProvider, useTheme } from '@context/ThemeContext'
import '@styles/index.css'

function RootWrapper () {
  const { theme } = useTheme()

  useEffect(() => {
    document.body.classList.toggle('theme--dark', theme === 'dark')
  }, [theme])

  return <AppRouter />
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider>
      <LanguageProvider>
        <RootWrapper />
      </LanguageProvider>
    </ThemeProvider>
  </StrictMode>
)

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('/sw.js')
      .then((registration) => {
        if (registration.waiting && navigator.serviceWorker.controller) {
          window.dispatchEvent(new CustomEvent('sw-update'))
        }

        registration.addEventListener('updatefound', () => {
          const newWorker = registration.installing
          newWorker?.addEventListener('statechange', () => {
            if (
              newWorker.state === 'installed' &&
              navigator.serviceWorker.controller &&
              import.meta.env.MODE !== 'development'
            ) {
              window.dispatchEvent(new CustomEvent('sw-update'))
            }

            if (
              newWorker.state === 'activated' &&
              import.meta.env.MODE !== 'development'
            ) {
              window.dispatchEvent(new CustomEvent('sw-update'))
            }
          })
        })
      })
      .catch(() => {})
  })
}
