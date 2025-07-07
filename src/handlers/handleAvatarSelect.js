import { AVATAR_INFO } from '@constants/avatars'

export function handleAvatarSelect ({
  playerId,
  filename,
  setPlayers,
  setSelectingAvatarFor
}) {
  // 🛡️ DEFENSIVE: Validate playerId exists in current players
  let playerExists = false
  setPlayers(prev => {
    playerExists = prev.some(player => player.id === playerId)
    return prev
  })

  if (!playerExists) {
    if (import.meta.env.MODE === 'development') {
      console.warn(`[handleAvatarSelect] Player with ID ${playerId} not found`)
    }

    setSelectingAvatarFor(null)
    return
  }

  // 🛡️ DEFENSIVE: Validate filename is in allowed avatars or null (deselection)
  const isValidAvatar = filename === null ||
    AVATAR_INFO.some(avatar => avatar.filename === filename)

  if (!isValidAvatar) {
    if (import.meta.env.MODE === 'development') {
      console.warn('[handleAvatarSelect] Invalid avatar filename:', filename)
    }
    setSelectingAvatarFor(null) // Close selector anyway
    return
  }

  // ✅ All validations passed - proceed with assignment
  setPlayers(prev =>
    prev.map(player =>
      player.id === playerId
        ? { ...player, avatar: filename }
        : player
    )
  )

  setSelectingAvatarFor(null)
}
