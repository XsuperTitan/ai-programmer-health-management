import { getKeywordCandidates } from '@/services/chalkMessages'
import type { KeywordCandidate } from '@/types'

export async function fetchKeywordLibrary(): Promise<KeywordCandidate[]> {
  return getKeywordCandidates().slice(0, 16)
}
