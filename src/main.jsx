import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import '@styles/index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
)

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('/sw.js')
      .then((registration) => {
        if (registration.waiting && navigator.serviceWorker.controller) {
          window.dispatchEvent(new Event('sw-update'))
        }

        registration.addEventListener('updatefound', () => {
          const newWorker = registration.installing
          newWorker?.addEventListener('statechange', () => {
            if (
              newWorker.state === 'installed' &&
              navigator.serviceWorker.controller &&
              import.meta.env.MODE !== 'development'
            ) {
              window.dispatchEvent(new Event('sw-update'))
            }

            if (
              newWorker.state === 'activated' &&
              import.meta.env.MODE !== 'development'
            ) {
              window.dispatchEvent(new Event('sw-update'))
            }
          })
        })
      })
      .catch(() => {})
  })
}
