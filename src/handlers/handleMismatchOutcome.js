import { handlePlaySound } from './handlePlaySound'
import { HandleTriggerAnimation } from './handleTriggerAnimation'

export function handleMismatchOutcome ({ nextTurn }) {
  nextTurn()
  handlePlaySound('mismatch')
  HandleTriggerAnimation('mismatch')
}
