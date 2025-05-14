/**
 * Triggers a vibration pattern if supported by the browser.
 * Can be reused for haptic feedback across different UI contexts.
 */
export function vibrateFeedback (pattern) {
  if ('vibrate' in navigator) {
    navigator.vibrate(pattern)
  }
}
