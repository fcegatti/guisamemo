export function validatePlayerName (name, currentPlayers, maxPlayers = 4) {
  const trimmed = name.trim()

  if (!trimmed) {
    return { valid: false, error: 'El nombre no puede estar vacío' }
  }

  if (currentPlayers.length >= maxPlayers) {
    return { valid: false, error: 'Máximo de 4 jugadores alcanzado' }
  }

  return { valid: true, name: trimmed }
}
