import { useGame } from '@context/GameContext'

const sizes = ['xs', 's', 'm', 'l', 'xl', '2xl', '3xl']

function BoardSizeSelector () {
  const { boardSize, setBoardSize } = useGame()

  return (
    <div className='boardsizeselector'>
      <label className='boardsizeselector__label'>Tamaño del tablero</label>
      <div className='boardsizeselector__options'>
        {sizes.map(size => (
          <button
            key={size}
            type='button'
            className={`boardsizeselector__option ${boardSize === size ? 'boardsizeselector__option--active' : ''}`}
            onClick={() => setBoardSize(size)}
            aria-pressed={boardSize === size}
          >
            {size.toUpperCase()}
          </button>
        ))}
      </div>
    </div>
  )
}

export default BoardSizeSelector
