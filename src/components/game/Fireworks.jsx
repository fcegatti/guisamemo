import React, { memo } from 'react'

function Fireworks () {
  return (
    <div className='fireworks'>
      <div className='firework fireworks--1' />
      <div className='firework fireworks--2' />
      <div className='firework fireworks--3' />
    </div>
  )
}

export default memo(Fireworks)
