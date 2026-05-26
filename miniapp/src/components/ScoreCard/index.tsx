import { View, Text } from '@tarojs/components'
import IconBadge from '@/components/IconBadge'
import type { AppIconKey } from '@/constants/icons'
import './index.scss'

interface ScoreCardProps {
  iconKey: AppIconKey
  label: string
  score: number
  summary: string
  color: string
  onClick?: () => void
}

export default function ScoreCard({
  iconKey,
  label,
  score,
  summary,
  color,
  onClick
}: ScoreCardProps) {
  const level =
    score >= 80 ? '优秀' : score >= 60 ? '良好' : score >= 40 ? '需改善' : '需关注'

  return (
    <View className='score-card' onClick={onClick}>
      <View className='score-card__header'>
        <IconBadge iconKey={iconKey} size='md' className='score-card__icon' />
        <View className='score-card__info'>
          <Text className='score-card__label'>{label}</Text>
          <Text className='score-card__level' style={{ color }}>{level}</Text>
        </View>
        <View className='score-card__ring' style={{ borderColor: color }}>
          <Text className='score-card__score' style={{ color }}>{score}</Text>
        </View>
      </View>
      <Text className='score-card__summary'>{summary}</Text>
    </View>
  )
}
