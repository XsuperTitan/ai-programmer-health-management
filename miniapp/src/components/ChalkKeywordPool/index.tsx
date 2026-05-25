import { View } from '@tarojs/components'
import { useMemo } from 'react'
import ChalkKeyword from '@/components/ChalkKeyword'
import { layoutPoolKeywords } from '@/utils/keywordLayout'
import type { KeywordCandidate } from '@/types'
import './index.scss'

interface ChalkKeywordPoolProps {
  candidates: KeywordCandidate[]
  selected: string[]
  erasingText: string | null
  disabled?: boolean
  onSelect: (text: string) => void
}

export default function ChalkKeywordPool({
  candidates,
  selected,
  erasingText,
  disabled,
  onSelect
}: ChalkKeywordPoolProps) {
  const poolItems = useMemo(
    () => candidates.filter(c => !selected.includes(c.text)),
    [candidates, selected]
  )

  const layouts = useMemo(() => layoutPoolKeywords(poolItems), [poolItems])

  const leftColumn = layouts.filter(l => l.column === 0)
  const rightColumn = layouts.filter(l => l.column === 1)

  const renderItem = (item: typeof layouts[0]) => (
    <ChalkKeyword
      key={item.text}
      text={item.text}
      color={item.color}
      rotate={item.rotate}
      erasing={erasingText === item.text}
      onTap={disabled || erasingText ? undefined : () => onSelect(item.text)}
    />
  )

  return (
    <View className='chalk-keyword-pool'>
      <View className='chalk-keyword-pool__column'>
        {leftColumn.map(renderItem)}
      </View>
      <View className='chalk-keyword-pool__column'>
        {rightColumn.map(renderItem)}
      </View>
    </View>
  )
}
