import { useEffect, useState } from 'react'

export default function UpdateBanner () {
  const [showBanner, setShowBanner] = useState(false)

  useEffect(() => {
    const onUpdate = () => setShowBanner(true)
    window.addEventListener('sw-update', onUpdate)
    return () => window.removeEventListener('sw-update', onUpdate)
  }, [])

  const reloadApp = () => {
    navigator.serviceWorker.getRegistration().then((reg) => {
      if (reg?.waiting) {
        reg.waiting.postMessage({ type: 'SKIP_WAITING' })
        window.location.reload()
      }
    })
  }

  if (!showBanner) return null

  return (
    <div className='update-banner'>
      <p>Nueva versión disponible</p>
      <button onClick={reloadApp}>Actualizar</button>
    </div>
  )
}
