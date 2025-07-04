import { useGame } from '@context/GameContext'
import { BOARD_SIZES, CARDS_PER_SIZE } from '@constants/game'
import { useLanguage } from '@context/LanguageContext'
import { useRovingTabIndex } from '@hooks/useRovingTabIndex'

function BoardSizeSelector () {
  const { boardSize, setBoardSize } = useGame()
  const { t } = useLanguage()
  const { getTabIndex, getItemRef, handleKeyDown } = useRovingTabIndex({
    itemCount: BOARD_SIZES.length,
    navigationStrategy: 'linear',
    onActivate: (index) => {
      const selectedSize = BOARD_SIZES[index]
      setBoardSize(selectedSize)
    }
  })

  return (
    <div className='boardsizeselector'>
      <h2 className='boardsizeselector__label'>
        {t.board.label}
      </h2>
      <div
        className='boardsizeselector__options'
        role='radiogroup'
        aria-label={t.board.label}
        onKeyDown={handleKeyDown}
      >
        {BOARD_SIZES.map((size, index) => (
          <button
            key={size}
            ref={getItemRef(index)}
            tabIndex={getTabIndex(index)}
            type='button'
            role='radio'
            aria-checked={boardSize === size}
            aria-label={t.board.sizeLabel.replace('{size}', size.toUpperCase())}
            title={t.board.tooltip.replace('{count}', CARDS_PER_SIZE[size])}
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
