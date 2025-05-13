import { Howl } from 'howler'

const sounds = {
  match: new Howl({
    src: ['/sounds/card-match.ogg', '/sounds/card-match.mp3'],
    volume: 1.0
  }),
  mismatch: new Howl({
    src: ['/sounds/card-mismatch.ogg', '/sounds/card-mismatch.mp3'],
    volume: 1.0
  }),
  end: new Howl({
    src: ['/sounds/end-game.ogg', '/sounds/end-game.mp3'],
    volume: 1.0
  }),
  flip: new Howl({
    src: ['/sounds/card-flip.ogg', '/sounds/card-flip.mp3'],
    volume: 1.0
  })
}

export function playSound (type) {
  const sound = sounds[type]
  if (!sound) {
    if (import.meta.env.MODE === 'development') {
      console.warn(`[playSound] Unknown sound type: ${type}`)
    }
    return
  }

  const id = sound.play()

  sound.once('playerror', (failedId, error) => {
    if (failedId === id && import.meta.env.MODE === 'development') {
      console.warn(`[SoundError] Failed to play "${type}":`, error)
    }
  })
}
