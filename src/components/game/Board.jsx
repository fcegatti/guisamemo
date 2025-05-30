import React, { memo } from 'react'
import { useGameEngine } from '@hooks/useGameEngine'
import { useGame } from '@context/GameContext'
import { PAIRS_BY_SIZE } from '@constants/game'
import { useLanguage } from '@context/LanguageContext'

function Board () {
  const { boardSize } = useGame()
  const { cards, handleCardClick, ariaMessage } = useGameEngine()
  const { t } = useLanguage()

  const totalPairs = PAIRS_BY_SIZE[boardSize] || PAIRS_BY_SIZE.xs
  const totalCards = totalPairs * 2
  const columns = Math.ceil(totalCards / 6)
  const boardClass = `gameboard gameboard--cols-${columns}`

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
        role='grid'
        aria-label={t.access.boardGrid}
      >
        {cards.map((card) => (
          <button
            key={card.id}
            type='button'
            className={`gameboard__card
              ${card.justMatched ? 'gameboard__card--matched' : ''}
              ${card.justMismatched ? 'gameboard__card--mismatched gameboard__card--mismatched-active' : ''}`}
            onClick={() => handleCardClick(card.id)}
            aria-roledescription={t.board.cardRoleDescription}
            // Prep only: tabindex logic and row/col in v1.2.1
            // aria-rowindex and aria-colindex will go here
          >
            <img
              src={
                (card.flipped || card.matched)
                  ? card.image || '/cards/fallback.webp'
                  : '/cards/card-back.webp'
              }
              alt={
                card.flipped || card.matched
                  ? t.board.cardAltRevealed.replace(
                    '{name}',
                    card.translationKey
                      ? t.names[card.translationKey] || card.name
                      : card.name
                  )
                  : t.board.cardAltHidden
              }
              className='gameboard__card-img'
            />
          </button>
        ))}
      </div>
    </>
  )
}

export default memo(Board)
