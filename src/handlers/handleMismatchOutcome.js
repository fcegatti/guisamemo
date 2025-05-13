import { handlePlaySound } from './handlePlaySound'
import { handleTriggerAnimation } from './handleTriggerAnimation'

export function handleMismatchOutcome () {
  handlePlaySound('mismatch')
  handleTriggerAnimation('mismatch')
}
