import { useGameEngine } from '@hooks/useGameEngine'

function Board () {
  const { cards, handleCardClick } = useGameEngine()

  return (
    <div className='gameboard'>
      {cards.map((card) => (
        <div
          key={card.id}
          className='gameboard__card'
          onClick={() => handleCardClick(card.id)}
        >
          <img
            src={card.flipped || card.matched ? card.image : '/cards/card-back.webp'}
            alt='Card'
            className='gameboard__card-img'
          />
        </div>
      ))}
    </div>
  )
}

export default Board
