export function validatePlayerName (name, currentPlayers, maxPlayers) {
  const trimmed = name.trim()

  if (!trimmed) {
    return { valid: false, error: 'El nombre no puede estar vacío' }
  }

  if (currentPlayers.length >= maxPlayers) {
    return { valid: false, error: `Máximo de ${maxPlayers} jugadores alcanzado` }
  }

  return { valid: true, name: trimmed }
}
