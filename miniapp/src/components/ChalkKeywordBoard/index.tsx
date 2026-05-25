import { View, Text } from '@tarojs/components'
import { useMemo } from 'react'
import ChalkKeyword from '@/components/ChalkKeyword'
import { layoutBoardKeywords } from '@/utils/keywordLayout'
import './index.scss'

interface ChalkKeywordBoardProps {
  selected: string[]
  fadingText: string | null
  maxCount: number
  onRemove: (text: string) => void
}

export default function ChalkKeywordBoard({
  selected,
  fadingText,
  maxCount,
  onRemove
}: ChalkKeywordBoardProps) {
  const layouts = useMemo(() => layoutBoardKeywords(selected), [selected])

  if (!selected.length && !fadingText) {
    return (
      <View className='chalk-keyword-board'>
        <Text className='chalk-keyword-board__empty'>点击上方粉笔词加入改善板</Text>
      </View>
    )
  }

  return (
    <View className='chalk-keyword-board'>
      {layouts.map(item => (
        <View
          key={item.text}
          className='chalk-keyword-board__item'
          style={{ marginTop: `${item.offsetTop}px` }}
        >
          <ChalkKeyword
            text={item.text}
            color={item.color}
            rotate={item.rotate}
            fading={fadingText === item.text}
            onTap={fadingText ? undefined : () => onRemove(item.text)}
          />
        </View>
      ))}
      <Text className='chalk-keyword-board__count'>{selected.length}/{maxCount}</Text>
    </View>
  )
}
