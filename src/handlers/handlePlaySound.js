import { playSound } from '@utils/soundManager'

/**
 * Triggers a sound based on the event type.
 * Accepts predefined types like 'match', 'error', 'end', etc.
 */

export function handlePlaySound (type) {
  if (import.meta.env.MODE === 'development') {
    console.log(`[playSound] Triggered sound: ${type}`)
  }

  playSound(type)
}
