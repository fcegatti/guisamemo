import { MAX_NAME_LENGTH } from '@constants/game'

export function validatePlayerName (name, currentPlayers, maxPlayers, t) {
  const trimmed = name.trim()

  if (!trimmed) {
    return { valid: false, error: t.start.errors.empty }
  }

  if (trimmed.length > MAX_NAME_LENGTH) {
    return {
      valid: false,
      error: t.start.errors.tooLong.replace('{max}', MAX_NAME_LENGTH)
    }
  }

  if (currentPlayers.length >= maxPlayers) {
    return {
      valid: false,
      error: t.start.errors.full.replace('{max}', maxPlayers)
    }
  }

  if (currentPlayers.some(p => p.name.toLowerCase() === trimmed.toLowerCase())) {
    return { valid: false, error: t.start.errors.duplicate }
  }

  return { valid: true, name: trimmed }
}
