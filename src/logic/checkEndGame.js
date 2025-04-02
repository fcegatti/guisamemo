export function checkEndGame (cards) {
  console.log('[Game] checkEndGame called')

  const allMatched = cards.every(card => card.matched)

  if (allMatched) {
    console.log('[Game] All cards matched! 🎉')
    // TODO:
    // - Trigger celebration animation
    // - Play win sound
    // - Display final results
  }
}
