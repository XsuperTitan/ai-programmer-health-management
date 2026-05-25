import { View, Text } from '@tarojs/components'
import './index.scss'

interface ProgressBarProps {
  current: number
  total: number
  label?: string
  variant?: 'default' | 'chalk'
}

export default function ProgressBar({ current, total, label, variant = 'default' }: ProgressBarProps) {
  const pct = total > 0 ? Math.round((current / total) * 100) : 0

  return (
    <View className={`progress-bar${variant === 'chalk' ? ' progress-bar--chalk' : ''}`}>
      {label && (
        <View className='progress-bar__header'>
          <Text className='progress-bar__label'>{label}</Text>
          <Text className='progress-bar__pct'>{current}/{total}</Text>
        </View>
      )}
      <View className='progress-bar__track'>
        <View className='progress-bar__fill' style={{ width: `${pct}%` }} />
      </View>
    </View>
  )
}
