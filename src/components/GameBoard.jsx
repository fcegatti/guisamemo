import { useState, useEffect } from 'react'

function GameBoard () {
  const [cards, setCards] = useState([])

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

  return (
    <div className='gameboard'>
      {cards.map((card) => (
        <div key={card.id} className='gameboard__card'>
          <img src={card.image} alt='Card' className='gameboard__card-img' />
        </div>
      ))}
    </div>
  )
}

export default GameBoard
