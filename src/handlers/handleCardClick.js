import { handleFlipResolution } from '@handlers/handleFlipResolution'
import { handleMatchOutcome } from '@handlers/handleMatchOutcome'
import { handleMismatchOutcome } from '@handlers/handleMismatchOutcome'
import { checkEndGame } from '@logic/checkEndGame'

export function handleCardClick ({
  cardId,
  cards,
  flippedCards,
  setCards,
  setFlippedCards,
  setAriaMessage,
  lockBoard,
  unlockBoard,
  t,
  players,
  currentTurnIndex,
  setPlayers,
  nextTurn,
  setIsGameOver
}) {
  if (!cardId || !cards || !setCards || !setFlippedCards) return

  const clickedCard = cards.find(card => card.id === cardId)

  if (!clickedCard || clickedCard.flipped || clickedCard.matched) return

  if (!clickedCard.image) {
    if (import.meta.env.MODE === 'development') {
      console.warn('[handleCardClick] Clicked card has no image:', clickedCard)
    }
    return
  }

  const updatedFlipped = [...flippedCards, clickedCard]

  // Flip the clicked card using functional update to avoid stale state
  const newCards = cards.map(card =>
    card.id === cardId ? { ...card, flipped: true } : card
  )
  setCards(newCards)
  setFlippedCards(updatedFlipped)

  // Accesible message only when card is revealed
  const cardName = clickedCard.translationKey
    ? t.names[clickedCard.translationKey] || clickedCard.name
    : clickedCard.name
  setAriaMessage(t.board.cardAltRevealed.replace('{name}', cardName))

  // Evaluate match only when two cards are flipped
  if (updatedFlipped.length === 2) {
    lockBoard()
    handleFlipResolution({
      flippedCards: updatedFlipped,
      cards: newCards, // use the freshest cards
      setCards,
      setFlippedCards,
      onMatch: (matchedImage, updatedCards) => {
        handleMatchOutcome({ matchedImage, players, currentTurnIndex, setPlayers })
        if (checkEndGame(updatedCards)) {
          setTimeout(() => setIsGameOver(true), 1200)
        }
        unlockBoard()
      },
      onMismatch: () => {
        handleMismatchOutcome()
      },
      nextTurn,
      unlockBoard
    })
  }
}
