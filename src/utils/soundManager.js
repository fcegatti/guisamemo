import { Howl } from 'howler'

const sounds = {
  match: new Howl({
    src: ['/sounds/card-match.ogg', '/sounds/card-match.mp3'],
    volume: 1.0
  })
}

export function playSound (type) {
  if (sounds[type]) {
    sounds[type].play()
  }
}
