import { useEffect, useState } from 'react'

export default function UpdateBanner () {
  const [showBanner, setShowBanner] = useState(false)

  useEffect(() => {
    const onUpdate = () => setShowBanner(true)
    window.addEventListener('sw-update', onUpdate)
    return () => window.removeEventListener('sw-update', onUpdate)
  }, [])

  if (!showBanner) return null

  return (
    <div className='update-banner'>
      <p>Hay una nueva versión disponible.</p>
      <p className='update-banner__instruction'>Recarga la app para actualizar.</p>
    </div>
  )
}
