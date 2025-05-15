export function createPlayer (name, index) {
  return {
    id: `player-${Date.now()}-${index}`,
    name,
    avatar: null,
    score: 0,
    turns: 1
  }
}
