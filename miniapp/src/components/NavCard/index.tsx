import { View, Text } from '@tarojs/components'
import IconBadge from '@/components/IconBadge'
import type { AppIconKey } from '@/constants/icons'
import './index.scss'

interface NavCardProps {
  iconKey: AppIconKey
  title: string
  subtitle: string
  tag?: string
  done?: boolean
  onClick?: () => void
}

export default function NavCard({
  iconKey,
  title,
  subtitle,
  tag,
  done = false,
  onClick
}: NavCardProps) {
  return (
    <View className='nav-card' onClick={onClick}>
      <IconBadge iconKey={iconKey} size='md' className='nav-card__icon' />
      <View className='nav-card__body'>
        <View className='nav-card__title-row'>
          <Text className='nav-card__title'>{title}</Text>
          {tag && <Text className='nav-card__tag'>{tag}</Text>}
          {done && <Text className='nav-card__done'>已完成</Text>}
        </View>
        <Text className='nav-card__subtitle'>{subtitle}</Text>
      </View>
      <Text className='nav-card__arrow'>›</Text>
    </View>
  )
}
