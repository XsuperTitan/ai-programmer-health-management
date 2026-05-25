import { View, Text } from '@tarojs/components'
import Taro from '@tarojs/taro'
import type { ChalkDetail } from '@/constants/chalkDetails'
import './index.scss'

interface ChalkDetailSheetProps {
  visible: boolean
  detail: ChalkDetail | null
  onClose: () => void
}

export default function ChalkDetailSheet({ visible, detail, onClose }: ChalkDetailSheetProps) {
  if (!visible || !detail) return null

  const handleAction = () => {
    onClose()
    if (!detail.actionUrl) return
    if (detail.actionUrl.includes('/pages/plan/') || detail.actionUrl.includes('/pages/home/')) {
      Taro.switchTab({ url: detail.actionUrl })
    } else {
      Taro.navigateTo({ url: detail.actionUrl })
    }
  }

  return (
    <View className='chalk-detail-sheet' onClick={onClose}>
      <View className='chalk-detail-sheet__panel' onClick={e => e.stopPropagation()}>
        <View className='chalk-detail-sheet__handle' />
        <Text className='chalk-detail-sheet__title'>{detail.title}</Text>
        <Text className='chalk-detail-sheet__body'>{detail.body}</Text>
        {detail.actionLabel && detail.actionUrl && (
          <View className='chalk-detail-sheet__action btn-primary' onClick={handleAction}>
            <Text className='chalk-detail-sheet__action-text'>{detail.actionLabel}</Text>
          </View>
        )}
        <View className='chalk-detail-sheet__close' onClick={onClose}>
          <Text className='chalk-detail-sheet__close-text'>关闭</Text>
        </View>
      </View>
    </View>
  )
}
