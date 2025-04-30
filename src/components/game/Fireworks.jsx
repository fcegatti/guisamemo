import React, { memo } from 'react'

function Fireworks () {
  return (
    <div className='fireworks'>
      <div className='firework fireworks--1' aria-hidden='true' />
      <div className='firework fireworks--2' aria-hidden='true' />
      <div className='firework fireworks--3' aria-hidden='true' />
    </div>
  )
}

export default memo(Fireworks)
