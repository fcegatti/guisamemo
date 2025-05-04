import { useEffect, useRef } from 'react'
import confetti from 'canvas-confetti'

export default function Confetti () {
  const canvasRef = useRef(null)

  useEffect(() => {
    if (!canvasRef.current) return

    const confettiInstance = confetti.create(canvasRef.current, {
      resize: true,
      useWorker: true
    })

    const colors = ['#ff595e', '#ffca3a', '#8ac926', '#1982c4', '#6a4c93']
    const duration = 5000
    const animationEnd = Date.now() + duration
    const interval = 250

    const intervalId = setInterval(() => {
      const timeLeft = animationEnd - Date.now()

      if (timeLeft <= 0) {
        clearInterval(intervalId)
        return
      }

      confettiInstance({
        particleCount: 5 + Math.floor(Math.random() * 5),
        angle: 60 + Math.random() * 60,
        spread: 55 + Math.random() * 25,
        origin: {
          x: Math.random(),
          y: Math.random() * 0.6
        },
        colors
      })
    }, interval)

    return () => {
      clearInterval(intervalId)
    }
  }, [])

  return <canvas ref={canvasRef} className='confetti-canvas' />
}
