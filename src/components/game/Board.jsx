import React, { memo } from 'react'
import { useGameEngine } from '@hooks/useGameEngine'
import { useGame } from '@context/GameContext'
import { useRovingTabIndex } from '@hooks/useRovingTabIndex'
import { COLUMNS_BY_SIZE, PAIRS_BY_SIZE } from '@constants/game'
import { useLanguage } from '@context/LanguageContext'

function Board () {
  const { boardSize } = useGame()
  const { cards, handleCardClick, ariaMessage } = useGameEngine()
  const { t } = useLanguage()

  const totalPairs = PAIRS_BY_SIZE[boardSize] || PAIRS_BY_SIZE.xs
  const totalCards = totalPairs * 2

  const columns = COLUMNS_BY_SIZE[boardSize] || COLUMNS_BY_SIZE.xs
  const boardClass = `gameboard gameboard--cols-${columns}`

  // 🐛 DEBUG: Temporary logging
  if (import.meta.env.MODE === 'development') {
    console.log('DEBUG Board.jsx:', { boardSize, columns, totalCards })
  }

  // Roving tabindex for keyboard navigation
  const { getTabIndex, getItemRef, handleKeyDown } = useRovingTabIndex({
    itemCount: totalCards,
    navigationStrategy: 'grid',
    gridColumns: columns,
    onActivate: (index) => {
      const card = cards[index]
      if (card && !card.flipped && !card.matched) {
        handleCardClick(card.id)
      }
    }
  })

  return (
    <>
      {/* ARIA-LIVE: menssage for SR with revealed card */}
      {ariaMessage && (
        <div className='sr-only' aria-live='polite'>
          {ariaMessage}
        </div>
      )}

      <div
        className={boardClass}
        role='group'
        aria-label={t.access.board.grid}
        onKeyDown={handleKeyDown}
      >
        {cards.map((card, index) => {
          const cardName = card.translationKey
            ? t.names[card.translationKey] || card.name
            : card.name

          const isRevealed = card.flipped || card.matched

          const cardLabel = isRevealed
            ? t.access.board.card.revealed.replace('{name}', cardName)
            : t.access.board.card.hidden

          return (
            <button
              key={card.id}
              ref={getItemRef(index)}
              tabIndex={getTabIndex(index)}
              type='button'
              role='button'
              aria-roledescription={t.access.board.card.role}
              aria-label={cardLabel}
              aria-posinset={index + 1}
              aria-setsize={totalCards}
              className={`gameboard__card
                ${card.justMatched ? 'gameboard__card--matched' : ''}
                ${card.justMismatched ? 'gameboard__card--mismatched gameboard__card--mismatched-active' : ''}`}
              onClick={() => handleCardClick(card.id)}
            >
              <img
                src={
                  (card.flipped || card.matched)
                    ? card.image || '/cards/fallback.webp'
                    : '/cards/card-back.webp'
              }
                alt={
                (card.flipped || card.matched)
                  ? t.access.board.card.revealed.replace('{name}', cardName)
                  : t.access.board.card.hidden
              }
                className='gameboard__card-img'
                aria-hidden='true'
              />
            </button>
          )
        })}
      </div>
    </>
  )
}

export default memo(Board)
