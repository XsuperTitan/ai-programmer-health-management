import { View, Text, Button } from '@tarojs/components'
import Taro, { useDidShow } from '@tarojs/taro'
import { useState } from 'react'
import ChalkBackground from '@/components/ChalkBackground'
import ChalkChip from '@/components/ChalkChip'
import { getKeywordCandidates } from '@/services/chalkMessages'
import {
  generatePlanFromKeywords,
  getSelectedKeywords
} from '@/services/mock'
import type { ChalkMessage, KeywordCandidate } from '@/types'
import './index.scss'

const MAX_KEYWORDS = 5

export default function KeywordPlanPage() {
  const [candidates, setCandidates] = useState<KeywordCandidate[]>([])
  const [selected, setSelected] = useState<string[]>([])
  const [submitting, setSubmitting] = useState(false)

  const decorMessages: ChalkMessage[] = [
    {
      id: 'kw-decor-1',
      text: '选你的改善点',
      top: 12,
      left: 8,
      rotate: -6,
      fontSize: 28,
      opacity: 0.45,
      color: 'yellow'
    }
  ]

  useDidShow(() => {
    setCandidates(getKeywordCandidates().slice(0, 16))
    setSelected(getSelectedKeywords())
  })

  const toggleKeyword = (text: string) => {
    setSelected(prev => {
      if (prev.includes(text)) {
        return prev.filter(k => k !== text)
      }
      if (prev.length >= MAX_KEYWORDS) {
        Taro.showToast({ title: `最多选择 ${MAX_KEYWORDS} 个`, icon: 'none' })
        return prev
      }
      return [...prev, text]
    })
  }

  const removeFromBoard = (text: string) => {
    setSelected(prev => prev.filter(k => k !== text))
  }

  const handleGenerate = () => {
    if (!selected.length) {
      Taro.showToast({ title: '请至少选择 1 个关键词', icon: 'none' })
      return
    }
    setSubmitting(true)
    generatePlanFromKeywords(selected)
    setTimeout(() => {
      setSubmitting(false)
      Taro.showToast({ title: '计划已生成', icon: 'success' })
      Taro.switchTab({ url: '/pages/plan/index' })
    }, 600)
  }

  return (
    <View className='page page--chalk keyword-plan-page'>
      <ChalkBackground messages={decorMessages} />

      <Text className='page-title'>健康关键词定制</Text>
      <Text className='page-subtitle'>
        从词库点选最多 {MAX_KEYWORDS} 个改善点，生成你的打卡计划
      </Text>

      <View className='keyword-plan-page__section'>
        <Text className='keyword-plan-page__section-title'>词库</Text>
        <Text className='keyword-plan-page__section-desc'>根据你的健康数据推荐</Text>
        <View className='keyword-plan-page__pool'>
          {candidates.map(c => (
            <ChalkChip
              key={c.text}
              label={c.text}
              selected={selected.includes(c.text)}
              onClick={() => toggleKeyword(c.text)}
            />
          ))}
        </View>
      </View>

      <View className='keyword-plan-page__section'>
        <Text className='keyword-plan-page__section-title'>
          我的改善板（{selected.length}/{MAX_KEYWORDS}）
        </Text>
        <View className='keyword-plan-page__board'>
          {selected.length ? (
            selected.map(text => (
              <ChalkChip
                key={text}
                label={text}
                onBoard
                onClick={() => removeFromBoard(text)}
              />
            ))
          ) : (
            <Text className='keyword-plan-page__board-empty'>点击上方词库添加关键词</Text>
          )}
        </View>
      </View>

      <View className='keyword-plan-page__actions'>
        <Button
          className='btn-primary'
          loading={submitting}
          disabled={!selected.length || submitting}
          onClick={handleGenerate}
        >
          生成打卡计划
        </Button>
      </View>

      <Text className='disclaimer-text'>
        关键词将写入你的 3 天微习惯计划，可在计划页每日打卡。
      </Text>
    </View>
  )
}
