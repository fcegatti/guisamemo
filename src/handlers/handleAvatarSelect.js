export function handleAvatarSelect ({
  playerId,
  filename,
  setPlayers,
  setSelectingAvatarFor
}) {
  setPlayers(prev =>
    prev.map(player =>
      player.id === playerId
        ? { ...player, avatar: filename }
        : player
    )
  )

  setSelectingAvatarFor(null)
}
