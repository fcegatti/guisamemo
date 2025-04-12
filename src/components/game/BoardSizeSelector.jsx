import { useGame } from '@context/GameContext'
import { useMediaQuery } from '@hooks/useMediaQuery'

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
  const isLaptopOrLarger = useMediaQuery('(min-width: 900px)')

  // Filter board size accordong to width
  const visibleSizes = isLaptopOrLarger
    ? sizes
    : sizes.filter(size => size !== '3xl')

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
