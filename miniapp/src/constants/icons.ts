import habitHair from '@/assets/habits/habit-hair.png'
import habitMuscle from '@/assets/habits/habit-muscle.png'
import habitBody from '@/assets/habits/habit-body.png'
import habitWalk from '@/assets/habits/habit-walk.png'
import habitEye from '@/assets/habits/habit-eye.png'
import habitSleep from '@/assets/habits/habit-sleep.png'
import habitVitamin from '@/assets/habits/habit-vitamin.png'
import habitStretch from '@/assets/habits/habit-stretch.png'
import habitNutrition from '@/assets/habits/habit-nutrition.png'
import habitScalp from '@/assets/habits/habit-scalp.png'
import habitStrength from '@/assets/habits/habit-strength.png'
import habitHydration from '@/assets/habits/habit-hydration.png'
import navDocument from '@/assets/icons/nav-document.svg'
import navBell from '@/assets/icons/nav-bell.svg'
import reportCamera from '@/assets/icons/report-camera.svg'
import reportAlbum from '@/assets/icons/report-album.svg'
import actionQuiz from '@/assets/icons/action-quiz.svg'
import actionCustomize from '@/assets/icons/action-customize.svg'
import reminderChecklist from '@/assets/icons/reminder-checklist.svg'

export type AppIconKey =
  | 'hair'
  | 'muscle'
  | 'body'
  | 'walk'
  | 'eye'
  | 'sleep'
  | 'checklist'
  | 'document'
  | 'bell'
  | 'camera'
  | 'album'
  | 'quiz'
  | 'customize'
  | 'vitamin'
  | 'stretch'
  | 'nutrition'
  | 'scalp'
  | 'strength'
  | 'phoneOff'
  | 'hydration'

export const APP_ICONS: Record<AppIconKey, string> = {
  hair: habitHair,
  muscle: habitMuscle,
  body: habitBody,
  walk: habitWalk,
  eye: habitEye,
  sleep: habitSleep,
  checklist: reminderChecklist,
  document: navDocument,
  bell: navBell,
  camera: reportCamera,
  album: reportAlbum,
  quiz: actionQuiz,
  customize: actionCustomize,
  vitamin: habitVitamin,
  stretch: habitStretch,
  nutrition: habitNutrition,
  scalp: habitScalp,
  strength: habitStrength,
  phoneOff: habitSleep,
  hydration: habitHydration
}

export type PillarKey = 'hair' | 'muscle' | 'body'

export const PILLAR_ICON_KEY: Record<PillarKey, AppIconKey> = {
  hair: 'hair',
  muscle: 'muscle',
  body: 'body'
}

export const REMINDER_ICON_KEY: Record<string, AppIconKey> = {
  r1: 'walk',
  r2: 'eye',
  r3: 'sleep',
  r4: 'checklist'
}

export const KEYWORD_ICON_KEY: Record<string, AppIconKey> = {
  '早睡': 'phoneOff',
  '23:30放下手机': 'phoneOff',
  '涂米诺地尔': 'scalp',
  '起身活动': 'stretch',
  '少熬夜': 'phoneOff',
  '护眼休息': 'eye',
  '体态拉伸': 'stretch',
  '6000步': 'walk',
  '控制体重': 'nutrition',
  '补充维生素D': 'vitamin',
  '按时吃饭': 'nutrition',
  '多喝水': 'hydration',
  '补充蛋白': 'nutrition',
  '23点停止进食': 'nutrition'
}

const HABIT_ICON_RULES: Array<{ pattern: RegExp; iconKey: AppIconKey }> = [
  { pattern: /护眼|20-20-20|眼疲劳|看.*米外/, iconKey: 'eye' },
  { pattern: /手机|23[:：]|入睡|早睡|睡眠|放下|熬夜|蓝光|停止进食/, iconKey: 'phoneOff' },
  { pattern: /scalp|米诺|头皮|护发|头发|按摩.*头/, iconKey: 'scalp' },
  { pattern: /维生素|维\s?[dD]|晒太阳|补充.*维/, iconKey: 'vitamin' },
  { pattern: /碳水|蔬菜|蛋白|体重|糖|饮料|饮食|进食|替换.*饮|吃饭|营养/, iconKey: 'nutrition' },
  { pattern: /拉伸|体态|圆肩|颈肩|矫正|站立|办公|起身/, iconKey: 'stretch' },
  { pattern: /核心|弹力|平板|支撑|划船|训练|健身|激活|哑铃/, iconKey: 'strength' },
  { pattern: /6000|步|散步|走|楼梯|活动|目标步/, iconKey: 'walk' },
  { pattern: /喝水|补水|无糖|气泡水|Hydration/i, iconKey: 'hydration' }
]

export function getPillarIconKey(pillar: PillarKey): AppIconKey {
  return PILLAR_ICON_KEY[pillar]
}

export function getReminderIconKey(id: string): AppIconKey {
  return REMINDER_ICON_KEY[id] ?? 'checklist'
}

export function getKeywordIconKey(keyword: string): AppIconKey | undefined {
  return KEYWORD_ICON_KEY[keyword]
}

export function getHabitIconKey(habit: {
  title: string
  description: string
  pillar: PillarKey
  iconKey?: AppIconKey
}): AppIconKey {
  if (habit.iconKey) {
    return habit.iconKey
  }

  const text = `${habit.title} ${habit.description}`

  for (const rule of HABIT_ICON_RULES) {
    if (rule.pattern.test(text)) {
      return rule.iconKey
    }
  }

  return getPillarIconKey(habit.pillar)
}

export function getIconSrc(iconKey: AppIconKey): string {
  return APP_ICONS[iconKey]
}

export function isPhotoIcon(iconKey: AppIconKey): boolean {
  return !['document', 'bell', 'camera', 'album', 'quiz', 'customize', 'checklist'].includes(iconKey)
}
