import { useState, useEffect } from 'react'
import { generateDeck } from '@utils/deck'
import { handleCardClick } from '@handlers/handleCardClick'

function Board () {
  const [cards, setCards] = useState([])
  const [flippedCards, setFlippedCards] = useState([])

  useEffect(() => {
    setCards(generateDeck())
  }, [])

  const handleClick = (cardId) => {
    handleCardClick({
      cardId,
      cards,
      flippedCards,
      setCards,
      setFlippedCards,
      onMatch: () => {

      }
    })
  }

  return (
    <div className='gameboard'>
      {cards.map((card) => (
        <div
          key={card.id}
          className='gameboard__card'
          onClick={() => handleClick(card.id)}
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
