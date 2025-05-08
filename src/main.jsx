import { StrictMode, useEffect } from 'react'
import { createRoot } from 'react-dom/client'
import { registerSW } from 'virtual:pwa-register'
import AppRouter from './AppRouter.jsx'
import { LanguageProvider } from '@context/LanguageContext'
import { ThemeProvider, useTheme } from '@context/ThemeContext'
import '@styles/index.css'

registerSW({
  onNeedRefresh () {
    window.dispatchEvent(new CustomEvent('sw-update'))
  },
  onOfflineReady () {
    console.log('[PWA] App ready to work offline')
  }
})

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
