import { View, Text } from '@tarojs/components'
import IconBadge from '@/components/IconBadge'
import type { AppIconKey } from '@/constants/icons'
import './index.scss'

interface SelectionCardProps {
  label: string
  desc?: string
  selected?: boolean
  iconKey?: AppIconKey
  onClick?: () => void
}

export default function SelectionCard({
  label,
  desc,
  selected = false,
  iconKey,
  onClick
}: SelectionCardProps) {
  return (
    <View
      className={`selection-card ${selected ? 'selection-card--selected' : ''}`}
      onClick={onClick}
    >
      {iconKey && <IconBadge iconKey={iconKey} size='xl' className='selection-card__icon' />}
      <View className='selection-card__content'>
        <Text className='selection-card__label'>{label}</Text>
        {desc && <Text className='selection-card__desc'>{desc}</Text>}
      </View>
      <View className={`selection-card__check ${selected ? 'selection-card__check--on' : ''}`} />
    </View>
  )
}
