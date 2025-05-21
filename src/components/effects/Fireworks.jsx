import { useMediaQuery } from '@hooks/useMediaQuery'
import { memo, useEffect, useState } from 'react'

function Fireworks () {
  const reduceMotion = useMediaQuery('(prefers-reduced-motion: reduce)')
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    if (reduceMotion) return
    const timeout = setTimeout(() => setVisible(false), 11000)
    return () => clearTimeout(timeout)
  }, [reduceMotion])

  if (reduceMotion || !visible) return null

  return (
    <div className='fireworks'>
      <div className='firework fireworks--1' aria-hidden='true' />
      <div className='firework fireworks--2' aria-hidden='true' />
      <div className='firework fireworks--3' aria-hidden='true' />
    </div>
  )
}

export default memo(Fireworks)
