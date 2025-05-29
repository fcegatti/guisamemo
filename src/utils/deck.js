import { PAIRS_BY_SIZE } from '@constants/game'
import { CARD_INFO } from '@constants/cards'

/**
 * Generates a shuffled deck of card pairs.
 *
 * Depends strictly on CARD_INFO, and requires at least `totalPairs` entries.
 * If not enough cards are available, the function will log a warning and use as many as possible.
 */

export function generateDeck (boardSize = 'xs') {
  const totalPairs = PAIRS_BY_SIZE[boardSize] || PAIRS_BY_SIZE.xs

  // NOTE: CARD_INFO is a controlled constant, but we still validate it defensively
  // to catch issues early during development or future refactors.

  if (CARD_INFO.length < totalPairs) {
    if (import.meta.env.MODE === 'development') {
      console.warn(`[generateDeck] Requested ${totalPairs} pairs, but only ${CARD_INFO.length} cards available.`)
    }
  }
  const pairsToUse = Math.min(totalPairs, CARD_INFO.length)
  const rawCards = []

  for (let i = 0; i < pairsToUse; i++) {
    const card = CARD_INFO[i]

    if (!card || !card.image || !card.name) {
      if (import.meta.env.MODE === 'development') {
        console.warn('[genereateDeck] Invalid card at index', i, card)
      }
      continue
    }

    // Duplicate each image to form a pair
    rawCards.push(
      {
        id: `${i + 1}-a`,
        image: card.image,
        name: card.name,
        flipped: false,
        matched: false
      },
      {
        id: `${i + 1}-b`,
        image: card.image,
        name: card.name,
        flipped: false,
        matched: false
      }
    )
  }

  // Shuffle cards randomly
  return rawCards.sort(() => Math.random() - 0.5)
}

export function testShuffleDistribution() {
  if (import.meta.env.MODE !== 'development') return;
  
  console.log('🔬 TESTING SHUFFLE ALGORITHM');
  console.log('Browser:', navigator.userAgent.includes('Firefox') ? 'Firefox' : 'Chrome/Other');
  
  const testArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
  const results = [];
  
  // 100 shuffles to analyze distribution
  console.log('🔄 Running 100 random shuffles...');
  for (let i = 0; i < 100; i++) {
    const shuffled = [...testArray].sort(() => Math.random() - 0.5);
    results.push(shuffled);
  }
  
  // Analize the distribution of numbers in each position
  console.log('🔍 Analyzing distribution of shuffled results...');
  const positionAnalysis = {
    pos0: {},
    pos1: {},
    pos2: {}
  };
  
  results.forEach(result => {
    positionAnalysis.pos0[result[0]] = (positionAnalysis.pos0[result[0]] || 0) + 1;
    positionAnalysis.pos1[result[1]] = (positionAnalysis.pos1[result[1]] || 0) + 1;
    positionAnalysis.pos2[result[2]] = (positionAnalysis.pos2[result[2]] || 0) + 1;
  });
  
  console.log('📊 Position Analysis (should be roughly uniform):');
  console.log('Position 0:', positionAnalysis.pos0);
  console.log('Position 1:', positionAnalysis.pos1);
  console.log('Position 2:', positionAnalysis.pos2);
  
  // Detect clusters of consecutive pairs
  console.log('🔗 Detecting consecutive pairs...')    ;
  let consecutivePairs = 0;
  results.forEach(result => {
    for (let i = 0; i < result.length - 1; i++) {
      if (Math.abs(result[i] - result[i + 1]) === 1) {
        consecutivePairs++;
      }
    }
  });
  
  console.log('🔗 Consecutive pairs found:', consecutivePairs);
  console.log('Expected random consecutive pairs: ~', (100 * 14 * 2) / 15); // statistical expectation for 15 unique items
  return { positionAnalysis, consecutivePairs };  
}
