import { useGame } from '@context/GameContext'
import { BOARD_SIZES, CARDS_PER_SIZE } from '@constants/game'

function BoardSizeSelector () {
  const { boardSize, setBoardSize } = useGame()

  return (
    <div className='boardsizeselector'>
      <h2 className='boardsizeselector__label'>Tamaño del tablero</h2>
      <div
        className='boardsizeselector__options'
        role='radiogroup'
        aria-label='Tamaño del tablero'
      >
        {BOARD_SIZES.map(size => (
          <button
            key={size}
            type='button'
            role='radio'
            aria-checked={boardSize === size}
            title={`${CARDS_PER_SIZE[size]} tarjetas`}
            className={`boardsizeselector__option ${boardSize === size ? 'boardsizeselector__option--active' : ''}`}
            onClick={() => setBoardSize(size)}
          >
            {size.toUpperCase()}
          </button>
        ))}
      </div>
    </div>
  )
}

export default BoardSizeSelector
