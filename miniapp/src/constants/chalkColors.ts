export type ChalkColorVariant = 'white' | 'yellow' | 'orange' | 'green' | 'cyan' | 'coral'

export const CHALK_COLOR_VARIANTS: ChalkColorVariant[] = [
  'white',
  'yellow',
  'orange',
  'green',
  'cyan',
  'coral'
]

/** Infer chalk color from message content (health-data driven). */
export function inferChalkColor(text: string, rand: () => number): ChalkColorVariant {
  if (/早睡|睡眠|熬夜|放下手机|23/.test(text)) return 'yellow'
  if (/米诺|头发|脱发/.test(text)) return 'orange'
  if (/起身|步|拉伸|体态|健身|运动|核心|护眼|活动/.test(text)) return 'green'
  if (/吃饭|蛋白|进食|喝水|饮料|蔬菜|碳水|含糖/.test(text)) return 'coral'
  if (/维生素|体检|问卷|报告|肝脏|体重|改善|需/.test(text)) return 'cyan'
  return CHALK_COLOR_VARIANTS[Math.floor(rand() * CHALK_COLOR_VARIANTS.length)]
}
