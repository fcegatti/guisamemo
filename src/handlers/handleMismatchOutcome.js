import { handlePlaySound } from './handlePlaySound'
import { handleTriggerAnimation } from './handleTriggerAnimation'

export function handleMismatchOutcome ({ nextTurn }) {
  nextTurn()
  handlePlaySound('mismatch')
  handleTriggerAnimation('mismatch')
}
