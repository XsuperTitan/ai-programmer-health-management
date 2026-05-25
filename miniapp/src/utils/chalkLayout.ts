import type { ChalkPage } from '@/types'

/** Shared tab backboard zone — allows chalk to bleed past edges. */
const TAB_SAFE_ZONE = {
  topMin: -8,
  topMax: 92,
  leftMin: -14,
  leftMax: 88
}

const SAFE_ZONE: Record<ChalkPage, typeof TAB_SAFE_ZONE> = {
  home: TAB_SAFE_ZONE,
  plan: TAB_SAFE_ZONE,
  customize: TAB_SAFE_ZONE
}

/** Estimate horizontal footprint as viewport percentage (750 design width). */
export function estimateTextWidthPercent(text: string, fontSize: number): number {
  const charWidth = fontSize * 1.05
  return (text.length * charWidth / 750) * 100
}

export function clampChalkLayout(
  page: ChalkPage,
  top: number,
  left: number,
  rotate: number,
  _text: string,
  _fontSize: number
): { top: number; left: number; rotate: number } {
  const zone = SAFE_ZONE[page]
  const clampedLeft = Math.min(zone.leftMax, Math.max(zone.leftMin, left))
  const clampedTop = Math.min(zone.topMax, Math.max(zone.topMin, top))
  const clampedRotate = Math.min(14, Math.max(-14, rotate))

  return {
    top: Math.round(clampedTop * 10) / 10,
    left: Math.round(clampedLeft * 10) / 10,
    rotate: Math.round(clampedRotate * 10) / 10
  }
}

export const CHALK_LAYOUT_SLOTS = [
  { top: 6, left: -4, rotate: -11, fontSize: 32, opacity: 0.88 },
  { top: 8, left: 42, rotate: 9, fontSize: 30, opacity: 0.84 },
  { top: 14, left: 68, rotate: -7, fontSize: 34, opacity: 0.87 },
  { top: 18, left: 12, rotate: -5, fontSize: 34, opacity: 0.87 },
  { top: 20, left: 52, rotate: 12, fontSize: 30, opacity: 0.83 },
  { top: 28, left: -8, rotate: 8, fontSize: 32, opacity: 0.86 },
  { top: 30, left: 28, rotate: -9, fontSize: 30, opacity: 0.82 },
  { top: 36, left: 58, rotate: 6, fontSize: 34, opacity: 0.88 },
  { top: 38, left: 4, rotate: -12, fontSize: 30, opacity: 0.84 },
  { top: 44, left: 36, rotate: 4, fontSize: 32, opacity: 0.85 },
  { top: 48, left: 72, rotate: -8, fontSize: 30, opacity: 0.82 },
  { top: 52, left: -2, rotate: 10, fontSize: 34, opacity: 0.87 },
  { top: 58, left: 22, rotate: -6, fontSize: 30, opacity: 0.83 },
  { top: 62, left: 48, rotate: 7, fontSize: 32, opacity: 0.86 },
  { top: 68, left: 8, rotate: -4, fontSize: 30, opacity: 0.82 },
  { top: 72, left: 64, rotate: 11, fontSize: 32, opacity: 0.84 },
  { top: 78, left: 18, rotate: -10, fontSize: 30, opacity: 0.8 },
  { top: 82, left: 44, rotate: 5, fontSize: 32, opacity: 0.83 },
  { top: 86, left: 76, rotate: -6, fontSize: 30, opacity: 0.81 }
]
