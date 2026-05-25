import { View, Text } from '@tarojs/components'
import type { ChalkMessage } from '@/types'
import './index.scss'

interface ChalkBackgroundProps {
  messages: ChalkMessage[]
}

export default function ChalkBackground({ messages }: ChalkBackgroundProps) {
  if (!messages.length) return null

  return (
    <View className='chalk-background'>
      {messages.map(msg => (
        <Text
          key={msg.id}
          className={`chalk-background__text chalk-background__text--${msg.color}`}
          style={{
            top: `${msg.top}%`,
            left: `${msg.left}%`,
            transform: `rotate(${msg.rotate}deg)`,
            transformOrigin: '0% 50%',
            fontSize: `${msg.fontSize}px`,
            opacity: msg.opacity
          }}
        >
          {msg.text}
        </Text>
      ))}
    </View>
  )
}
