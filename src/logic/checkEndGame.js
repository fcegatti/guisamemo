export function checkEndGame (cards) {
  return cards.every(card => card.matched)
}
