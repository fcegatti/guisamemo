export function checkEndGame (cards) {
  return cards.every(card => card.matched)
  // TODO:
  // - Trigger celebration animation
  // - Play win sound
}
