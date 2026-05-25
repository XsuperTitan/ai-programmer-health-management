import { View, Text, Button } from '@tarojs/components'
import Taro, { useDidShow } from '@tarojs/taro'
import { useState } from 'react'
import ModuleCard from '@/components/ModuleCard'
import AlertBanner from '@/components/AlertBanner'
import ScoreCard from '@/components/ScoreCard'
import ChalkBackground from '@/components/ChalkBackground'
import { getUser, getSession, getActiveAlerts } from '@/services/mock'
import { getChalkMessages } from '@/services/chalkMessages'
import { syncTabBar } from '@/utils/tabBar'
import type { UserProfile, HealthSession, HealthAlert, ChalkMessage } from '@/types'
import './index.scss'

export default function HomePage() {
  const [user, setUser] = useState<UserProfile>(getUser())
  const [session, setSession] = useState<HealthSession>(getSession())
  const [alerts, setAlerts] = useState<HealthAlert[]>(getActiveAlerts())
  const [chalkMessages, setChalkMessages] = useState<ChalkMessage[]>(getChalkMessages('home'))

  useDidShow(() => {
    syncTabBar(0)
    setUser(getUser())
    setSession(getSession())
    setAlerts(getActiveAlerts())
    setChalkMessages(getChalkMessages('home'))
  })

  const hasScores = session.scores.length > 0
  const stepDone = [session.reportUploaded, session.quizCompleted, hasScores]

  const goReport = () => Taro.navigateTo({ url: '/pages/report/index' })
  const goQuiz = () => Taro.navigateTo({ url: '/pages/quiz/index' })
  const goResult = () => Taro.navigateTo({ url: '/pages/result/index' })
  const goPlan = () => Taro.switchTab({ url: '/pages/plan/index' })
  const goReminders = () => Taro.navigateTo({ url: '/pages/reminders/index' })

  const goHair = () => {
    if (hasScores) {
      goResult()
    } else if (session.quizCompleted) {
      goResult()
    } else {
      goQuiz()
    }
  }

  const handleAlertAction = (alert: HealthAlert) => {
    if (alert.type === 'sleep') {
      goReminders()
      return
    }
    Taro.showToast({ title: '已记录', icon: 'success', duration: 1500 })
  }

  return (
    <View className='page page--chalk home-page'>
      <ChalkBackground messages={chalkMessages} />
      <View className='home-page__hero'>
        <Text className='home-page__greeting'>
          {user.isLoggedIn ? `你好，${user.nickname}` : '程序员健康助手'}
        </Text>
        <Text className='home-page__tagline'>
          上传体检报告 · 完成问卷 · 获取头发/身材/整体健康评分
        </Text>
      </View>

      {!hasScores && (
        <View className='home-page__steps card'>
          <Text className='section-title'>开始评估</Text>
          <View className='home-page__step-list'>
            {['上传体检报告', '填写健康问卷', '查看AI分析'].map((step, i) => (
              <View key={step} className='home-page__step'>
                <View className={`home-page__step-dot ${stepDone[i] ? 'home-page__step-dot--done' : ''}`}>
                  {stepDone[i] ? '✓' : i + 1}
                </View>
                <Text className='home-page__step-text'>{step}</Text>
              </View>
            ))}
          </View>
        </View>
      )}

      <View className='home-page__modules'>
        <View className='home-page__section-head'>
          <Text className='section-title'>健康模块</Text>
          <Text className='home-page__hot-badge'>HOT</Text>
        </View>

        <ModuleCard
        variant='hair'
        title='程序员头发健康'
        subtitle='脱发风险评估 · 护发方案 · 米诺地尔提醒'
        onClick={goHair}
      />
      <ModuleCard
        variant='fitness'
        title='程序员健身定制'
        subtitle='久坐族专属训练 · 身体拯救打卡计划'
        onClick={goPlan}
      />
      <ModuleCard
        variant='report'
        title='程序员健康自定义'
        subtitle='上传体检报告，AI 提取关键指标'
        onClick={goReport}
      />
      </View>

      <AlertBanner alerts={alerts} onAction={handleAlertAction} />

      {hasScores && (
        <View className='home-page__preview'>
          <Text className='section-title'>最新评分</Text>
          {session.scores.slice(0, 2).map(s => (
            <ScoreCard key={s.key} {...s} onClick={goResult} />
          ))}
          <Button className='btn-secondary' onClick={goResult}>
            查看完整报告
          </Button>
        </View>
      )}

      <Text className='disclaimer-text'>
        本应用提供生活方式建议，不构成医疗诊断。异常指标请咨询专业医生。
      </Text>
    </View>
  )
}
