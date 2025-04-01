import { useState, useEffect } from 'react'

function Board () {
  const [cards, setCards] = useState([])
  const [flippedCards, setFlippedCards] = useState([])

  useEffect(() => {
    const generateDeck = () => {
      const totalPairs = 15
      const rawCards = []

      for (let i = 1; i <= totalPairs; i++) {
        const image = `/cards/card-${i}.webp`

        // Duplicate each image to form a pair
        rawCards.push({
          id: `${i}-a`,
          image,
          flipped: false,
          matched: false
        })
        rawCards.push({
          id: `${i}-b`,
          image,
          flipped: false,
          matched: false
        })
      }

      // Shuffle cards randomly
      return rawCards.sort(() => Math.random() - 0.5)
    }

    setCards(generateDeck())
  }, [])

  const handleCardClick = (cardId) => {
    setCards(prevCards =>
      prevCards.map(card =>
        card.id === cardId && !card.flipped && !card.matched
          ? { ...card, flipped: true }
          : card
      )
    )

    const clickedCard = cards.find(card => card.id === cardId)

    if (!clickedCard || clickedCard.flipped || clickedCard.matched) return

    const updatedFlipped = [...flippedCards, clickedCard]

    setFlippedCards(updatedFlipped)

    if (updatedFlipped.length === 2) {
      const [first, second] = updatedFlipped

      if (first.image === second.image) {
        // Match
        setCards(prevCards =>
          prevCards.map(card =>
            card.image === first.image
              ? { ...card, matched: true }
              : card
          )
        )
      }

      // Delay before flipping back unmatched cards
      setTimeout(() => {
        setCards(prevCards =>
          prevCards.map(card =>
            !card.matched ? { ...card, flipped: false } : card
          )
        )
        setFlippedCards([])
      }, 1000)
    }
  }

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
