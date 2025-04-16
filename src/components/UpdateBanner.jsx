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
      <p>Se actualizó la aplicación.</p>
      <p className='update-banner__instruction'>Recarga la app para usar la nueva versión.</p>
    </div>
  )
}
