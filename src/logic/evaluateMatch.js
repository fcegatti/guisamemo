export function evaluateMatch (cardA, cardB) {
  const isMatch = cardA.image === cardB.image
  const matchedImage = cardA.image

  return { isMatch, matchedImage }
}
