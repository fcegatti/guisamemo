/**
 * Controls the full resolution flow after two cards are flipped:
 * - Uses resolveFlippedCards (pure logic)
 * - Sets matched or mismatched state
 * - Applies scoring logic (via updatePlayerScore)
 * - Delays flipping back unmatched cards
 * - Triggers sound/animation feedback via handlers
 * - Calls onMatch or onMismatch accordingly
 */
import { resolveFlippedCards } from '@logic/resolveFlippedCards'
import { FLIP_BACK_DELAY } from '@constants/game'
import { handleMatchOutcome } from './handleMatchOutcome'
import { handleMismatchOutcome } from './handleMismatchOutcome'
import { updatePlayerScore } from '@logic/updatePlayerScore'
import { checkEndGame } from '@logic/checkEndGame'
import { handlePlaySound } from './handlePlaySound'

export function handleFlipResolution ({
  flippedCards,
  cards,
  setCards,
  setFlippedCards,
  onMatch,
  onMismatch,
  unlockBoard,
  nextTurn,
  players,
  currentTurnIndex,
  setPlayers,
  setTurnCount,
  setIsGameOver
}) {
  const isMatch = resolveFlippedCards(flippedCards)

  if (isMatch) {
    const matchedImage = flippedCards[0].image
    const updatedCards = cards.map(card =>
      card.image === matchedImage
        ? { ...card, matched: true, justMatched: true }
        : card
    )

    setCards(updatedCards)
    setFlippedCards([])

    const updatedPlayers = updatePlayerScore({
      players,
      currentTurnIndex,
      matchedImage,
      result: 'match'
    })

    setPlayers(updatedPlayers)

    handleMatchOutcome()

    setTimeout(() => {
      setCards(prev =>
        prev.map(card =>
          card.justMatched
            ? { ...card, justMatched: false }
            : card
        )
      )
    }, 700)

    onMatch(matchedImage, updatedCards)

    if (checkEndGame(updatedCards)) {
      setTimeout(() => {
        handlePlaySound('end')
      }, 800)
      setPlayers(prev =>
        prev.map((player, index) =>
          index === currentTurnIndex
            ? { ...player, turns: player.turns + 1 }
            : player
        )
      )
      setTurnCount(prev => prev + 1)
      console.log('[END GAME - MATCH]', {
        player: players[currentTurnIndex].name,
        turnIncremented: true
      })
      setTimeout(() => setIsGameOver(true), 1800)
    }
    unlockBoard()
  } else {
    const mismatchedIds = flippedCards.map(fc => fc.id)

    const updatedCards = cards.map(card =>
      mismatchedIds.includes(card.id)
        ? { ...card, justMismatched: true }
        : card
    )

    setCards(updatedCards)
    handleMismatchOutcome()
    onMismatch()

    const updatedPlayers = updatePlayerScore({
      players,
      currentTurnIndex,
      result: 'mismatch'
    })

    setPlayers(updatedPlayers)
    if (import.meta.env.MODE === 'development') {
      console.log('[players] Turns per player:', updatedPlayers.map(p => `${p.name}: ${p.turns}`))
    }
    setTimeout(() => {
      const revertedCards = updatedCards.map(card =>
        mismatchedIds.includes(card.id)
          ? { ...card, flipped: false, justMismatched: false }
          : card
      )

      setCards(revertedCards)
      setFlippedCards([])
      unlockBoard()
      setTurnCount(prev => {
        const next = prev + 1
        if (import.meta.env.MODE === 'development') {
          console.log('[turnCount] New value:', next)
        }
        return next
      })

      nextTurn()
    }, FLIP_BACK_DELAY)
  }
}
