export function getPlayersRanking (players) {
  return [...players]
    .sort((a, b) => b.score - a.score)
    .map(player => ({
      ...player,
      avatar: player.avatar
        ? `/avatars/${player.avatar}`
        : '/avatar-default.webp'
    }))
}
