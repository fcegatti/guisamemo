import { MAX_NAME_LENGTH } from '@constants/game'

export function validatePlayerName (name, currentPlayers, maxPlayers) {
  const trimmed = name.trim()

  if (!trimmed) {
    return { valid: false, error: 'El nombre no puede estar vacío' }
  }

  if (trimmed.length > MAX_NAME_LENGTH) {
    return {
      valid: false,
      error: `El nombre no puede superar los ${MAX_NAME_LENGTH} caracteres`
    }
  }

  if (currentPlayers.length >= maxPlayers) {
    return {
      valid: false,
      error: `Máximo de ${maxPlayers} jugadores alcanzado`
    }
  }

  if (currentPlayers.some(p => p.name.toLowerCase() === trimmed.toLowerCase())) {
    return { valid: false, error: 'Ese nombre ya está en uso' }
  }

  return { valid: true, name: trimmed }
}
