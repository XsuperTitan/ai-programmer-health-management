import { View, Text } from '@tarojs/components'
import type { ChalkColorVariant } from '@/constants/chalkColors'
import './index.scss'

interface ChalkKeywordProps {
  text: string
  color: ChalkColorVariant
  rotate?: number
  erasing?: boolean
  fading?: boolean
  onTap?: () => void
}

export default function ChalkKeyword({
  text,
  color,
  rotate = 0,
  erasing = false,
  fading = false,
  onTap
}: ChalkKeywordProps) {
  return (
    <View
      className={`chalk-keyword${erasing ? ' chalk-keyword--erasing' : ''}${fading ? ' chalk-keyword--fading' : ''}`}
      style={{ transform: `rotate(${rotate}deg)` }}
      onClick={onTap}
    >
      <Text className={`chalk-keyword__text chalk-keyword__text--${color}`}>
        {text}
      </Text>
    </View>
  )
}
