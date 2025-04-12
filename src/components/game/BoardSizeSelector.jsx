import { useGame } from '@context/GameContext'

const sizes = ['xs', 's', 'm', 'l', 'xl', 'xxl']
const labels = {
  xs: 'XS (30)',
  s: 'S (36)',
  m: 'M (42)',
  l: 'L (48)',
  xl: 'XL (54)',
  xxl: 'XXL (60)'
}

function BoardSizeSelector () {
  const { boardSize, setBoardSize } = useGame()

  return (
    <div className='boardsizeselector'>
      <label htmlFor='board-size' className='boardsizeselector__label'>Tamaño del tablero</label>
      <select
        id='board-size'
        value={boardSize}
        onChange={(e) => setBoardSize(e.target.value)}
        className='boardsizeselector__select'
      >
        {sizes.map(size => (
          <option key={size} value={size}>
            {labels[size]}
          </option>
        ))}
      </select>
    </div>
  )
}

export default BoardSizeSelector
