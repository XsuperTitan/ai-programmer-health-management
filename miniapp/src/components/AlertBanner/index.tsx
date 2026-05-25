import { View, Text } from '@tarojs/components'
import type { HealthAlert } from '@/types'
import './index.scss'

interface AlertBannerProps {
  alerts: HealthAlert[]
  onAction?: (alert: HealthAlert) => void
}

export default function AlertBanner({ alerts, onAction }: AlertBannerProps) {
  if (!alerts.length) return null

  return (
    <View className='alert-banner'>
      <View className='alert-banner__header'>
        <View className='alert-banner__bell'>
          <View className='alert-banner__bell-body' />
          <View className='alert-banner__bell-clapper' />
        </View>
        <Text className='alert-banner__title'>关键事件提醒</Text>
      </View>
      {alerts.map(alert => (
        <View
          key={alert.id}
          className={`alert-banner__item alert-banner__item--${alert.urgency}`}
          onClick={() => onAction?.(alert)}
        >
          <View className={`alert-banner__dot alert-banner__dot--${alert.type}`} />
          <View className='alert-banner__content'>
            <Text className='alert-banner__item-title'>{alert.title}</Text>
            <Text className='alert-banner__item-desc'>{alert.description}</Text>
          </View>
          {alert.actionLabel && (
            <Text className='alert-banner__action'>{alert.actionLabel}</Text>
          )}
        </View>
      ))}
    </View>
  )
}
