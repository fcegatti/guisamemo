import { useGameEngine } from '@hooks/useGameEngine'
import { useGame } from '@context/GameContext'
import { PAIRS_BY_SIZE } from '@constants/game'
import { useLanguage } from '@context/LanguageContext'

function Board () {
  const { boardSize } = useGame()
  const { cards, handleCardClick } = useGameEngine()
  const { t } = useLanguage()

  const totalPairs = PAIRS_BY_SIZE[boardSize] || PAIRS_BY_SIZE.xs
  const totalCards = totalPairs * 2
  const columns = Math.ceil(totalCards / 6)
  const boardClass = `gameboard gameboard--cols-${columns}`

  return (
    <div className={boardClass}>
      {cards.map((card) => (
        <div
          key={card.id}
          className='gameboard__card'
          onClick={() => handleCardClick(card.id)}
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
        </div>
      ))}
    </div>
  )
}

export default Board
