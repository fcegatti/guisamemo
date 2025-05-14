import { handlePlaySound } from './handlePlaySound'
import { handleTriggerAnimation } from './handleTriggerAnimation'

export function handleMatchOutcome () {
  handlePlaySound('match')
  handleTriggerAnimation('match')
}
