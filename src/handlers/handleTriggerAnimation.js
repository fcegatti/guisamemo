import { vibrateFeedback } from '@utils/vibration'
import { VIBRATION_PATTERN } from '@constants/game'

/**
 * Triggers an animation based on the event type.
 * Optionally accepts a DOM node or identifier.
 */

export function handleTriggerAnimation (type, element = null) {
  if (type === 'mismatch') {
    vibrateFeedback(VIBRATION_PATTERN.mismatch)
  }

  if (import.meta.env.MODE === 'development') {
    console.log(`[triggerAnimation] Triggered animation: ${type}`, element)
  }
  // Implementation pending: integrate animation system (CSS/JS/Library)
}
