import { View, Text, Button } from '@tarojs/components'
import Taro, { useDidShow } from '@tarojs/taro'
import { useState } from 'react'
import ChalkBackground from '@/components/ChalkBackground'
import ChalkKeywordPool from '@/components/ChalkKeywordPool'
import ChalkKeywordBoard from '@/components/ChalkKeywordBoard'
import { fetchKeywordLibrary } from '@/services/keywordApi'
import {
  generatePlanFromKeywords,
  getSelectedKeywords,
  needsPlanOverrideConfirm
} from '@/services/mock'
import { syncTabBar } from '@/utils/tabBar'
import { getTabChalkMessages } from '@/services/chalkMessages'
import type { ChalkMessage, KeywordCandidate } from '@/types'
import './index.scss'

const MAX_KEYWORDS = 7
const ERASE_MS = 300
const FADE_MS = 200

export default function CustomizePage() {
  const [candidates, setCandidates] = useState<KeywordCandidate[]>([])
  const [selected, setSelected] = useState<string[]>([])
  const [chalkMessages, setChalkMessages] = useState<ChalkMessage[]>(getTabChalkMessages())
  const [erasingText, setErasingText] = useState<string | null>(null)
  const [fadingText, setFadingText] = useState<string | null>(null)
  const [submitting, setSubmitting] = useState(false)

  useDidShow(() => {
    syncTabBar(2)
    fetchKeywordLibrary().then(setCandidates)
    setSelected(getSelectedKeywords())
    setChalkMessages(getTabChalkMessages())
  })

  const handlePoolSelect = (text: string) => {
    if (erasingText || fadingText) return
    if (selected.length >= MAX_KEYWORDS) {
      Taro.showToast({ title: `最多选择 ${MAX_KEYWORDS} 个`, icon: 'none' })
      return
    }
    setErasingText(text)
    setTimeout(() => {
      setSelected(prev => [...prev, text])
      setErasingText(null)
    }, ERASE_MS)
  }

  const handleBoardRemove = (text: string) => {
    if (erasingText || fadingText) return
    setFadingText(text)
    setTimeout(() => {
      setSelected(prev => prev.filter(t => t !== text))
      setFadingText(null)
    }, FADE_MS)
  }

  const doGenerate = () => {
    setSubmitting(true)
    generatePlanFromKeywords(selected)
    setTimeout(() => {
      setSubmitting(false)
      Taro.showToast({ title: '计划已生成', icon: 'success' })
      Taro.switchTab({ url: '/pages/plan/index' })
    }, 600)
  }

  const handleGenerate = () => {
    if (!selected.length) {
      Taro.showToast({ title: '请至少选择 1 个关键词', icon: 'none' })
      return
    }
    if (needsPlanOverrideConfirm()) {
      Taro.showModal({
        title: '替换当前计划？',
        content: '将用定制关键词覆盖问卷生成的打卡计划，是否继续？',
        success: res => {
          if (res.confirm) doGenerate()
        }
      })
      return
    }
    doGenerate()
  }

  const poolDisabled = Boolean(erasingText || fadingText)

  return (
    <View className='page page--chalk customize-page'>
      <ChalkBackground messages={chalkMessages} />

      <View className='customize-page__content'>
        <Text className='page-title'>健康关键词定制</Text>
        <Text className='page-subtitle'>
          点选粉笔词擦入改善板，最多 {MAX_KEYWORDS} 个
        </Text>

        <View className='customize-page__section'>
          <Text className='customize-page__section-title'>词库</Text>
          <Text className='customize-page__section-desc'>根据你的健康数据推荐</Text>
          <ChalkKeywordPool
            candidates={candidates}
            selected={selected}
            erasingText={erasingText}
            disabled={poolDisabled}
            onSelect={handlePoolSelect}
          />
        </View>

        <View className='customize-page__section'>
          <Text className='customize-page__section-title'>我的改善板</Text>
          <ChalkKeywordBoard
            selected={selected}
            fadingText={fadingText}
            maxCount={MAX_KEYWORDS}
            onRemove={handleBoardRemove}
          />
        </View>

        <View className='customize-page__actions'>
          <Button
            className='btn-primary'
            loading={submitting}
            disabled={!selected.length || submitting || poolDisabled}
            onClick={handleGenerate}
          >
            生成打卡计划
          </Button>
        </View>

        <Text className='disclaimer-text'>
          关键词将写入你的 3 天微习惯计划，可在计划页每日打卡。
        </Text>
      </View>
    </View>
  )
}
