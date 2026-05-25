import { View, Text } from '@tarojs/components'
import './index.scss'

interface SelectionCardProps {
  label: string
  desc?: string
  selected?: boolean
  icon?: string
  onClick?: () => void
}

export default function SelectionCard({
  label,
  desc,
  selected = false,
  icon,
  onClick
}: SelectionCardProps) {
  return (
    <View
      className={`selection-card ${selected ? 'selection-card--selected' : ''}`}
      onClick={onClick}
    >
      {icon && <Text className='selection-card__icon'>{icon}</Text>}
      <View className='selection-card__content'>
        <Text className='selection-card__label'>{label}</Text>
        {desc && <Text className='selection-card__desc'>{desc}</Text>}
      </View>
      <View className={`selection-card__check ${selected ? 'selection-card__check--on' : ''}`}>
        {selected && <Text className='selection-card__check-icon'>✓</Text>}
      </View>
    </View>
  )
}
