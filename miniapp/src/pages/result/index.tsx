import { View, Text, Button } from '@tarojs/components'
import Taro, { useDidShow } from '@tarojs/taro'
import { useState } from 'react'
import ScoreCard from '@/components/ScoreCard'
import { getSession, completeQuiz, MOCK_METRICS } from '@/services/mock'
import type { PillarScore, HealthMetric } from '@/types'
import './index.scss'

const RESULT_KEYWORDS = ['护发', '控糖', '护腰']

const FLAG_LABEL: Record<string, string> = {
  low: '偏低',
  normal: '正常',
  high: '偏高',
  overweight: '超重'
}

const FLAG_CLASS: Record<string, string> = {
  low: 'tag-amber',
  normal: 'tag-teal',
  high: 'tag-rose',
  overweight: 'tag-amber'
}

export default function ResultPage() {
  const [scores, setScores] = useState<PillarScore[]>([])
  const [metrics, setMetrics] = useState<HealthMetric[]>([])

  useDidShow(() => {
    const session = getSession()
    if (session.scores.length) {
      setScores(session.scores)
      setMetrics(session.metrics)
    } else {
      const demo = completeQuiz()
      setScores(demo.scores)
      setMetrics(demo.metrics.length ? demo.metrics : MOCK_METRICS)
    }
  })

  const avgScore = scores.length
    ? Math.round(scores.reduce((s, x) => s + x.score, 0) / scores.length)
    : 0

  const goPlan = () => Taro.switchTab({ url: '/pages/plan/index' })

  const onShare = () => {
    Taro.showToast({ title: '点击右上角分享', icon: 'none' })
  }

  return (
    <View className='page result-page'>
      <View className='result-page__keywords'>
        {RESULT_KEYWORDS.map((kw, i) => (
          <Text
            key={kw}
            className='result-page__keyword'
            style={{
              transform: `rotate(${[-4, 3, -2][i]}deg)`
            }}
          >
            {kw}
          </Text>
        ))}
      </View>

      <View className='result-page__summary card'>
        <Text className='result-page__summary-label'>综合健康指数</Text>
        <Text className='result-page__summary-score'>{avgScore}</Text>
        <Text className='result-page__summary-desc'>
          基于体检报告 + 程序员生活方式问卷
        </Text>
      </View>

      <Text className='section-title'>三维评分</Text>
      {scores.map(s => (
        <View key={s.key} className='result-page__pillar'>
          <ScoreCard {...s} />
          <View className='result-page__tips card'>
            <Text className='result-page__tips-title'>改善建议</Text>
            {s.tips.map((tip, i) => (
              <Text key={i} className='result-page__tip-item'>• {tip}</Text>
            ))}
          </View>
        </View>
      ))}

      {metrics.length > 0 && (
        <>
          <Text className='section-title'>报告指标</Text>
          <View className='result-page__metrics card'>
            {metrics.map(m => (
              <View key={m.key} className='result-page__metric-row'>
                <Text className='result-page__metric-label'>{m.label}</Text>
                <View className='result-page__metric-right'>
                  <Text className='result-page__metric-value'>
                    {m.value}{m.unit ? ` ${m.unit}` : ''}
                  </Text>
                  <Text className={`tag ${FLAG_CLASS[m.flag]}`}>
                    {FLAG_LABEL[m.flag]}
                  </Text>
                </View>
              </View>
            ))}
          </View>
        </>
      )}

      <Button className='btn-primary' onClick={goPlan}>
        查看7天改善计划
      </Button>
      <Button className='btn-secondary' onClick={onShare}>
        分享健康卡片
      </Button>

      <Text className='disclaimer-text'>
        以上分析仅供参考，不构成医疗诊断。如有异常指标，请及时就医。
      </Text>
    </View>
  )
}
