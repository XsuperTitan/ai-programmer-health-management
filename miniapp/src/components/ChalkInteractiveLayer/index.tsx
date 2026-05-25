import { View } from '@tarojs/components'
import type { ChalkMessage } from '@/types'
import { estimateTextWidthPercent } from '@/utils/chalkLayout'
import './index.scss'

interface ChalkInteractiveLayerProps {
  messages: ChalkMessage[]
  onMessageTap: (message: ChalkMessage) => void
}

export default function ChalkInteractiveLayer({ messages, onMessageTap }: ChalkInteractiveLayerProps) {
  const highlights = messages.filter(m => m.highlight)
  if (!highlights.length) return null

  return (
    <View className='chalk-interactive-layer'>
      {highlights.map(msg => {
        const widthPct = Math.min(estimateTextWidthPercent(msg.text, msg.fontSize) + 4, 72)
        const heightPct = (msg.fontSize / 750) * 100 * 2.2

        return (
          <View
            key={`hit-${msg.id}`}
            className='chalk-interactive-layer__hit'
            style={{
              top: `${msg.top}%`,
              left: `${msg.left}%`,
              width: `${widthPct}%`,
              height: `${heightPct}%`,
              transform: `rotate(${msg.rotate}deg)`,
              transformOrigin: '0% 50%'
            }}
            onClick={() => onMessageTap(msg)}
          />
        )
      })}
    </View>
  )
}
