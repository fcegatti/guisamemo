import { MAX_NAME_LENGTH } from '@constants/game'

/**
 * Sanitizes player name allowing only safe, aesthetic characters
 * @param {string} name - Raw player name input
 * @returns {string} - Sanitized name with only allowed characters
 */
function sanitizePlayerName(name) {
  // 🛡️ DEFENSIVE: Allow only letters, numbers, spaces, and basic punctuation
  // Preserves international characters while blocking nonsensical symbols
  return name
    .replace(/[^a-zA-Z0-9\u00C0-\u017F\u1E00-\u1EFF\s\-.']/g, '') // Keep letters, numbers, spaces, accents, hyphens, periods, apostrophes
    .replace(/\s+/g, ' ') // Normalize multiple spaces to single space
    .trim()
}

export function validatePlayerName (name, currentPlayers, maxPlayers, t) {
  // 🛡️ SECURITY: Sanitize input before any processing
  const trimmedName = name.trim()
  const sanitized = sanitizePlayerName(trimmedName)

  if (sanitized !== trimmedName) {
    return {
      valid: false,
      error: t.start.errors.invalidCharacters 
    }
  }

  if (!sanitized) {
    return { valid: false, error: t.start.errors.empty }
  }

  if (sanitized.length > MAX_NAME_LENGTH) {
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

  if (currentPlayers.some(p => p.name.toLowerCase() === sanitized.toLowerCase())) {
    return { valid: false, error: t.start.errors.duplicate }
  }

  return { valid: true, name: sanitized }
}
