import { inferChalkColor } from '@/constants/chalkColors'
import type { ChalkColorVariant } from '@/constants/chalkColors'
import type { KeywordCandidate } from '@/types'

export interface PoolKeywordLayout {
  text: string
  color: ChalkColorVariant
  rotate: number
  column: 0 | 1
}

export interface BoardKeywordLayout {
  text: string
  color: ChalkColorVariant
  rotate: number
  offsetTop: number
}

function hashSeed(input: string): number {
  let hash = 0
  for (let i = 0; i < input.length; i++) {
    hash = (hash * 31 + input.charCodeAt(i)) >>> 0
  }
  return hash
}

function seededRandom(seed: number): () => number {
  let state = seed || 1
  return () => {
    state = (state * 1664525 + 1013904223) >>> 0
    return state / 0xffffffff
  }
}

export function layoutPoolKeywords(candidates: KeywordCandidate[]): PoolKeywordLayout[] {
  const rand = seededRandom(hashSeed(candidates.map(c => c.text).join('|')))

  return candidates.map((item, index) => ({
    text: item.text,
    color: inferChalkColor(item.text, rand),
    rotate: (index % 2 === 0 ? -1 : 1) * (3 + (index % 3)),
    column: (index % 2) as 0 | 1
  }))
}

export function layoutBoardKeywords(texts: string[]): BoardKeywordLayout[] {
  const rand = seededRandom(hashSeed(texts.join('|')))

  return texts.map((text, index) => ({
    text,
    color: inferChalkColor(text, rand),
    rotate: (index % 2 === 0 ? -1 : 1) * (2 + (index % 4)),
    offsetTop: (index % 3) * 8
  }))
}
