import { Howl } from 'howler'

const sounds = {}
let audioInitialized = false

function initializeAudio () {
  if (audioInitialized) return

  sounds.match = new Howl({
    src: ['/sounds/card-match.ogg', '/sounds/card-match.mp3'],
    volume: 1.0
  })
  sounds.mismatch = new Howl({
    src: ['/sounds/card-mismatch.ogg', '/sounds/card-mismatch.mp3'],
    volume: 1.0
  })
  sounds.end = new Howl({
    src: ['/sounds/end-game.ogg', '/sounds/end-game.mp3'],
    volume: 1.0
  })
  sounds.flip = new Howl({
    src: ['/sounds/card-flip.ogg', '/sounds/card-flip.mp3'],
    volume: 1.0
  })

  audioInitialized = true

  if (import.meta.env.MODE === 'development') {
    console.log('[SoundManager] Audio initialized for game session')
  }
}

export function preloadGameAudio () {
  if (!audioInitialized) {
    initializeAudio()
    if (import.meta.env.MODE === 'development') {
      console.log('[SoundManager] Preloading game audio')
    }
  }
}

export function playSound (type) {
  if (!audioInitialized) {
    initializeAudio()
  }

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
