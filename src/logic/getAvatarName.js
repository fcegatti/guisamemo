import { AVATAR_INFO } from '@constants/avatars'

export function getAvatarName (filename) {
  const found = AVATAR_INFO.find(a => a.filename === filename)
  return found?.name || ''
}
