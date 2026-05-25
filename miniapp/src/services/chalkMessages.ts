import { getSession, getReminders, getActiveAlerts, getUser } from '@/services/mock'
import { inferChalkColor } from '@/constants/chalkColors'
import {
  CHALK_LAYOUT_SLOTS,
  clampChalkLayout
} from '@/utils/chalkLayout'
import type { ChalkMessage, ChalkPage, ChalkLinkType, KeywordCandidate } from '@/types'

interface ChalkCandidate {
  text: string
  priority: number
  linkType?: ChalkLinkType
  pillar?: KeywordCandidate['pillar']
}

const DEFAULT_CHALKS: ChalkCandidate[] = [
  { text: '早睡', priority: 1, linkType: 'sleep', pillar: 'body' },
  { text: '按时吃饭', priority: 1, pillar: 'body' },
  { text: '多喝水', priority: 1, pillar: 'body' },
  { text: '起身活动', priority: 1, linkType: 'habit', pillar: 'muscle' },
  { text: '23:30放下手机', priority: 1, linkType: 'sleep', pillar: 'body' },
  { text: '涂米诺地尔', priority: 1, linkType: 'medication', pillar: 'hair' },
  { text: '少熬夜', priority: 1, pillar: 'body' },
  { text: '护眼休息', priority: 1, linkType: 'habit', pillar: 'hair' },
  { text: '6000步', priority: 1, pillar: 'body' },
  { text: '体态拉伸', priority: 1, pillar: 'muscle' },
  { text: '补充蛋白', priority: 1, pillar: 'muscle' },
  { text: '23点停止进食', priority: 1, pillar: 'body' }
]

const ALERT_CHALK_MAP: Record<string, { text: string; linkType: ChalkLinkType }> = {
  sleep: { text: '早睡', linkType: 'sleep' },
  medication: { text: '涂米诺地尔', linkType: 'medication' },
  habit: { text: '起身活动', linkType: 'habit' }
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

function shortenTip(tip: string): string {
  const cleaned = tip
    .replace(/每日|每天|工间/g, '')
    .replace(/\s+/g, '')
    .trim()
  if (cleaned.length <= 8) return cleaned
  return cleaned.slice(0, 8)
}

function shortenScoreLabel(label: string): string {
  return label
    .replace(/综合评分/g, '')
    .replace(/健康/g, '')
    .trim()
}

function inferLinkType(text: string): ChalkLinkType | undefined {
  if (text.includes('早睡') || text.includes('手机') || text.includes('熬夜')) return 'sleep'
  if (text.includes('米诺') || text.includes('涂药')) return 'medication'
  if (text.includes('起身') || text.includes('活动') || text.includes('护眼')) return 'habit'
  if (text.includes('问卷') || text.includes('报告')) return 'module'
  return undefined
}

function inferPillar(text: string): KeywordCandidate['pillar'] {
  if (text.includes('米诺') || text.includes('护发') || text.includes('头发') || text.includes('scalp') || text.includes('护眼')) {
    return 'hair'
  }
  if (text.includes('拉伸') || text.includes('体态') || text.includes('起身') || text.includes('蛋白') || text.includes('肌肉')) {
    return 'muscle'
  }
  return 'body'
}

function enrichCandidate(c: ChalkCandidate): ChalkCandidate {
  return {
    ...c,
    linkType: c.linkType ?? inferLinkType(c.text),
    pillar: c.pillar ?? inferPillar(c.text)
  }
}

export function collectCandidates(page: ChalkPage): ChalkCandidate[] {
  const session = getSession()
  const user = getUser()
  const reminders = getReminders()
  const alerts = getActiveAlerts()
  const candidates: ChalkCandidate[] = []

  session.metrics.forEach(m => {
    if (m.key === 'vitamin_d' && m.flag === 'low') {
      candidates.push({ text: '补充维生素D', priority: 10, pillar: 'body' })
    }
    if (m.key === 'alt' && m.flag === 'high') {
      candidates.push({ text: '少熬夜护肝脏', priority: 9, linkType: 'sleep', pillar: 'body' })
    }
    if (m.key === 'bmi' && m.flag === 'overweight') {
      candidates.push({ text: '控制体重', priority: 8, pillar: 'body' })
    }
  })

  session.scores.forEach(s => {
    if (s.score < 65) {
      const short = shortenScoreLabel(s.label)
      candidates.push({ text: `${short}需改善`, priority: 7, pillar: s.key === 'hair' ? 'hair' : s.key === 'muscle' ? 'muscle' : 'body' })
    }
    s.tips.slice(0, 3).forEach((tip, i) => {
      candidates.push(enrichCandidate({ text: shortenTip(tip), priority: 6 - i }))
    })
  })

  const todayPlan = session.plan[0]
  if (todayPlan) {
    todayPlan.habits
      .filter(h => !h.completed)
      .slice(0, 4)
      .forEach((h, i) => {
        candidates.push(enrichCandidate({
          text: shortenTip(h.title),
          priority: page === 'plan' ? 11 - i : 5 - i,
          pillar: h.pillar
        }))
      })
  }

  reminders
    .filter(r => r.enabled)
    .forEach(r => {
      if (r.title.includes('睡眠')) candidates.push({ text: '早睡', priority: 12, linkType: 'sleep', pillar: 'body' })
      else if (r.title.includes('起身')) candidates.push({ text: '起身活动', priority: 8, linkType: 'habit', pillar: 'muscle' })
      else if (r.title.includes('护眼')) candidates.push({ text: '护眼休息', priority: 7, linkType: 'habit', pillar: 'hair' })
      else candidates.push(enrichCandidate({ text: shortenTip(r.title), priority: 6 }))
    })

  alerts.forEach(a => {
    const mapped = ALERT_CHALK_MAP[a.type]
    if (mapped) {
      candidates.push({
        text: mapped.text,
        priority: a.type === 'sleep' ? 13 : a.type === 'medication' ? 11 : 9,
        linkType: mapped.linkType,
        pillar: a.type === 'medication' ? 'hair' : a.type === 'habit' ? 'muscle' : 'body'
      })
    }
    if (a.type === 'habit') {
      candidates.push(enrichCandidate({ text: shortenTip(a.title), priority: 9, linkType: 'habit' }))
    }
  })

  if (user.workHours >= 10) {
    candidates.push({ text: '少熬夜', priority: 8, linkType: 'sleep', pillar: 'body' })
  }

  if (!session.quizCompleted) {
    candidates.push({ text: '完成健康问卷', priority: 10, linkType: 'module', pillar: 'body' })
  }
  if (!session.reportUploaded) {
    candidates.push({ text: '上传体检报告', priority: 9, linkType: 'module', pillar: 'body' })
  }

  DEFAULT_CHALKS.forEach(c => candidates.push(c))

  const seen = new Set<string>()
  return candidates
    .map(enrichCandidate)
    .sort((a, b) => b.priority - a.priority)
    .filter(c => {
      if (seen.has(c.text)) return false
      seen.add(c.text)
      return true
    })
}

export function getKeywordCandidates(): KeywordCandidate[] {
  return collectCandidates('home').map(({ text, priority, pillar }) => ({
    text,
    priority,
    pillar
  }))
}

export function getHighlightedChalkTexts(page: ChalkPage): string[] {
  const alerts = getActiveAlerts()
  const alertTexts = alerts
    .map(a => ALERT_CHALK_MAP[a.type]?.text)
    .filter((t): t is string => Boolean(t))

  const topCandidates = collectCandidates(page).slice(0, 2).map(c => c.text)
  const merged = [...alertTexts, ...topCandidates]
  const unique: string[] = []
  merged.forEach(t => {
    if (!unique.includes(t)) unique.push(t)
  })
  return unique.slice(0, 2)
}

function applyHighlights(messages: ChalkMessage[], page: ChalkPage): ChalkMessage[] {
  const highlightTexts = getHighlightedChalkTexts(page)
  if (!highlightTexts.length) return messages

  let highlightCount = 0
  return messages.map(msg => {
    const shouldHighlight = highlightTexts.includes(msg.text) && highlightCount < 2
    if (shouldHighlight) highlightCount++
    return {
      ...msg,
      highlight: shouldHighlight
    }
  })
}

export function getChalkMessages(page: ChalkPage): ChalkMessage[] {
  const dateKey = new Date().toISOString().slice(0, 10)
  const seed = hashSeed(`${dateKey}-${page}-${getUser().nickname}`)
  const rand = seededRandom(seed)

  const count = 8 + Math.floor(rand() * 4)
  const candidates = collectCandidates(page)
  const texts = [...candidates.slice(0, count)]
  let fallbackIdx = 0
  while (texts.length < count && fallbackIdx < DEFAULT_CHALKS.length * 3) {
    const fallback = DEFAULT_CHALKS[fallbackIdx % DEFAULT_CHALKS.length]
    if (!texts.some(t => t.text === fallback.text)) {
      texts.push(fallback)
    }
    fallbackIdx++
  }

  const slotIndices = CHALK_LAYOUT_SLOTS.map((_, i) => i)
  for (let i = slotIndices.length - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1))
    ;[slotIndices[i], slotIndices[j]] = [slotIndices[j], slotIndices[i]]
  }

  const messages: ChalkMessage[] = texts.map((item, i) => {
    const slot = CHALK_LAYOUT_SLOTS[slotIndices[i]]
    const jitter = (rand() - 0.5) * 2
    const rawTop = slot.top + jitter
    const rawLeft = slot.left + jitter
    const rawRotate = slot.rotate + (rand() - 0.5) * 4
    const layout = clampChalkLayout(page, rawTop, rawLeft, rawRotate, item.text, slot.fontSize)

    return {
      id: `${page}-${i}-${item.text}`,
      text: item.text,
      top: layout.top,
      left: layout.left,
      rotate: layout.rotate,
      fontSize: slot.fontSize,
      opacity: slot.opacity,
      color: inferChalkColor(item.text, rand),
      priority: item.priority,
      linkType: item.linkType
    }
  })

  return applyHighlights(messages, page)
}
