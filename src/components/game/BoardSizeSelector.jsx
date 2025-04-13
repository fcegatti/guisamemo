import { useGame } from '@context/GameContext'

const sizes = ['xs', 's', 'm', 'l', 'xl', '2xl', '3xl']
const labels = {
  xs: 'XS (30)',
  s: 'S (36)',
  m: 'M (42)',
  l: 'L (48)',
  xl: 'XL (54)',
  '2xl': '2XL (60)',
  '3xl': '3XL (66)'
}

function BoardSizeSelector () {
  const { boardSize, setBoardSize } = useGame()

  // All sizes are now shown starting from tablet (≥600px)
  // Logic preserved in case future board sizes (e.g. 4xl+) are limited to larger screens
  const visibleSizes = sizes

  return (
    <div className='boardsizeselector'>
      <label htmlFor='board-size' className='boardsizeselector__label'>Tamaño del tablero</label>
      <select
        id='board-size'
        value={boardSize}
        onChange={(e) => setBoardSize(e.target.value)}
        className='boardsizeselector__select'
      >
        {visibleSizes.map(size => (
          <option key={size} value={size}>
            {labels[size]}
          </option>
        ))}
      </select>
    </div>
  )
}

export default BoardSizeSelector
