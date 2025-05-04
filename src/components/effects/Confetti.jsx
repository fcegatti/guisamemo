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

    const colors = ['#ff595e', '#ffca3a', '#8ac926', '#1982c4', '#6a4c93', '#ff9f1c', '#2ec4b6']
    const duration = 11000
    const animationEnd = Date.now() + duration
    const interval = 180

    const intervalId = setInterval(() => {
      const timeLeft = animationEnd - Date.now()

      if (timeLeft <= 0) {
        clearInterval(intervalId)
        return
      }

      confettiInstance({
        particleCount: 10 + Math.floor(Math.random() * 10),
        angle: 55 + Math.random() * 70,
        spread: 50 + Math.random() * 40,
        origin: {
          x: Math.random(),
          y: Math.random() * 0.6
        },
        scalar: 0.9 + Math.random() * 0.3,
        colors
      })
    }, interval)

    return () => {
      clearInterval(intervalId)
    }
  }, [])

  return <canvas ref={canvasRef} className='confetti-canvas' />
}
