import { useMediaQuery } from '@hooks/useMediaQuery'
import React, { memo } from 'react'

function Fireworks () {
  const reduceMotion = useMediaQuery('(prefers-reduced-motion: reduce)')
  if (reduceMotion) return null

  return (
    <div className='fireworks'>
      <div className='firework fireworks--1' aria-hidden='true' />
      <div className='firework fireworks--2' aria-hidden='true' />
      <div className='firework fireworks--3' aria-hidden='true' />
    </div>
  )
}

export default memo(Fireworks)
