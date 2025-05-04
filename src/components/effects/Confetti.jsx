/* global requestAnimationFrame */

import { useEffect } from 'react'
import confetti from 'canvas-confetti'

export default function Confetti () {
  useEffect(() => {
    const duration = 2 * 1000
    const end = Date.now() + duration

    const frame = () => {
      confetti({
        particleCount: 2,
        angle: 60,
        spread: 55,
        origin: { x: 0 }
      })
      confetti({
        particleCount: 2,
        angle: 120,
        spread: 55,
        origin: { x: 1 }
      })

      if (Date.now() < end) {
        requestAnimationFrame(frame)
      }
    }

    frame()
  }, [])

  return <canvas className='confetti-canvas' />
}
