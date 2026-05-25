import { View, Text } from '@tarojs/components'
import './index.scss'

interface ChalkChipProps {
  label: string
  selected?: boolean
  onBoard?: boolean
  onClick?: () => void
}

export default function ChalkChip({ label, selected, onBoard, onClick }: ChalkChipProps) {
  return (
    <View
      className={`chalk-chip${selected ? ' chalk-chip--selected' : ''}${onBoard ? ' chalk-chip--board' : ''}`}
      onClick={onClick}
    >
      <Text className='chalk-chip__text'>{label}</Text>
      {onBoard && <Text className='chalk-chip__remove'>×</Text>}
    </View>
  )
}
