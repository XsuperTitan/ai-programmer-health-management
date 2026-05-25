import type { ChalkColorVariant } from '@/constants/chalkColors'

export interface UserProfile {
  nickname: string
  avatarUrl: string
  jobType: string
  workHours: number
  isLoggedIn: boolean
}

export interface HealthMetric {
  key: string
  label: string
  value: number
  unit: string
  flag: 'low' | 'normal' | 'high' | 'overweight'
}

export interface PillarScore {
  key: 'hair' | 'muscle' | 'body'
  label: string
  score: number
  summary: string
  tips: string[]
  icon: string
  color: string
}

export interface QuizAnswer {
  questionId: string
  value: string | number
}

export interface PlanHabit {
  id: string
  title: string
  description: string
  duration: string
  pillar: 'hair' | 'muscle' | 'body'
  completed: boolean
}

export interface PlanDay {
  day: number
  date: string
  habits: PlanHabit[]
}

export interface ReminderItem {
  id: string
  title: string
  description: string
  time: string
  enabled: boolean
  icon: string
}

export interface HealthAlert {
  id: string
  type: 'sleep' | 'medication' | 'habit'
  title: string
  description: string
  urgency: 'high' | 'normal'
  actionLabel?: string
}

export interface HealthSession {
  reportUploaded: boolean
  quizCompleted: boolean
  metrics: HealthMetric[]
  scores: PillarScore[]
  plan: PlanDay[]
  selectedKeywords?: string[]
}

export type ChalkLinkType = 'sleep' | 'medication' | 'habit' | 'module'

export interface ChalkMessage {
  id: string
  text: string
  top: number
  left: number
  rotate: number
  fontSize: number
  opacity: number
  color: ChalkColorVariant
  highlight?: boolean
  priority?: number
  linkType?: ChalkLinkType
}

export interface KeywordCandidate {
  text: string
  priority: number
  pillar?: PlanHabit['pillar']
}

export type ChalkPage = 'home' | 'plan'

export interface ProductItem {
  id: string
  name: string
  desc: string
  tag: string
  price: string
}
