export function getPlayersRanking (players) {
  const sorted = [...players]
    .sort((a, b) => b.score - a.score)
    .slice(0, 3)

  return sorted.map(player => ({
    name: player.name,
    score: player.score,
    avatar: player.avatar || '/avatar-default.webp'
  }))
}
