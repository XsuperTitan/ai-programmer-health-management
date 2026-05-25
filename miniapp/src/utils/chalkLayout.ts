import type { ChalkPage } from '@/types'

const SAFE_ZONE: Record<ChalkPage, { topMin: number; topMax: number; leftMin: number; leftMax: number }> = {
  home: { topMin: 8, topMax: 78, leftMin: 4, leftMax: 58 },
  plan: { topMin: 8, topMax: 68, leftMin: 4, leftMax: 55 }
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
  text: string,
  fontSize: number
): { top: number; left: number; rotate: number } {
  const zone = SAFE_ZONE[page]
  const widthPct = estimateTextWidthPercent(text, fontSize)
  const rotateRad = (rotate * Math.PI) / 180
  const rotationExtra = Math.abs(Math.sin(rotateRad)) * 3

  const maxLeft = Math.max(zone.leftMin, zone.leftMax - widthPct - rotationExtra)
  const clampedLeft = Math.min(maxLeft, Math.max(zone.leftMin, left))
  const clampedTop = Math.min(zone.topMax, Math.max(zone.topMin, top))
  const clampedRotate = Math.min(10, Math.max(-10, rotate))

  return {
    top: Math.round(clampedTop * 10) / 10,
    left: Math.round(clampedLeft * 10) / 10,
    rotate: Math.round(clampedRotate * 10) / 10
  }
}

export const CHALK_LAYOUT_SLOTS = [
  { top: 10, left: 6, rotate: -8, fontSize: 32, opacity: 0.88 },
  { top: 10, left: 38, rotate: 6, fontSize: 30, opacity: 0.84 },
  { top: 18, left: 20, rotate: -5, fontSize: 34, opacity: 0.87 },
  { top: 18, left: 48, rotate: 7, fontSize: 30, opacity: 0.83 },
  { top: 26, left: 8, rotate: 9, fontSize: 32, opacity: 0.86 },
  { top: 26, left: 32, rotate: -6, fontSize: 30, opacity: 0.82 },
  { top: 34, left: 44, rotate: 5, fontSize: 34, opacity: 0.88 },
  { top: 34, left: 12, rotate: -9, fontSize: 30, opacity: 0.84 },
  { top: 42, left: 28, rotate: 4, fontSize: 32, opacity: 0.85 },
  { top: 42, left: 50, rotate: -7, fontSize: 30, opacity: 0.82 },
  { top: 50, left: 6, rotate: 8, fontSize: 34, opacity: 0.87 },
  { top: 50, left: 36, rotate: -4, fontSize: 30, opacity: 0.83 },
  { top: 58, left: 18, rotate: -6, fontSize: 32, opacity: 0.86 },
  { top: 58, left: 42, rotate: 9, fontSize: 30, opacity: 0.82 },
  { top: 66, left: 8, rotate: 5, fontSize: 32, opacity: 0.84 },
  { top: 66, left: 30, rotate: -8, fontSize: 30, opacity: 0.8 },
  { top: 74, left: 22, rotate: 6, fontSize: 32, opacity: 0.83 },
  { top: 74, left: 46, rotate: -5, fontSize: 30, opacity: 0.81 }
]
