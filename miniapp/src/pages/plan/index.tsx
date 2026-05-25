import { View, Text } from '@tarojs/components'
import Taro, { useDidShow } from '@tarojs/taro'
import { useState } from 'react'
import SelectionCard from '@/components/SelectionCard'
import ProgressBar from '@/components/ProgressBar'
import ChalkBackground from '@/components/ChalkBackground'
import ProductRecommendSection from '@/components/ProductRecommendSection'
import { getSession, getUser, MOCK_PLAN, toggleHabitComplete } from '@/services/mock'
import { getChalkMessages } from '@/services/chalkMessages'
import { syncTabBar } from '@/utils/tabBar'
import type { PlanDay, ChalkMessage, UserProfile } from '@/types'
import './index.scss'

const PILLAR_LABEL: Record<string, string> = {
  hair: '头发',
  muscle: '肌肉',
  body: '整体'
}

function planTitle(nickname: string) {
  return `${nickname}的身体拯救打卡计划`
}

export default function PlanPage() {
  const [plan, setPlan] = useState<PlanDay[]>([])
  const [activeDay, setActiveDay] = useState(0)
  const [user, setUser] = useState<UserProfile>(getUser())
  const [chalkMessages, setChalkMessages] = useState<ChalkMessage[]>(getChalkMessages('plan'))

  useDidShow(() => {
    syncTabBar(1)
    const session = getSession()
    setUser(getUser())
    setPlan(session.plan.length ? session.plan : MOCK_PLAN)
    setChalkMessages(getChalkMessages('plan'))
  })

  const currentDay = plan[activeDay]
  const completedCount = currentDay?.habits.filter(h => h.completed).length ?? 0
  const totalCount = currentDay?.habits.length ?? 0
  const title = planTitle(user.nickname)

  const handleToggle = (habitId: string) => {
    const updated = toggleHabitComplete(activeDay, habitId)
    setPlan(updated)
  }

  if (!plan.length) {
    return (
      <View className='page page--chalk plan-page'>
        <ChalkBackground messages={chalkMessages} />
        <Text className='page-title'>{title}</Text>
        <Text className='page-subtitle'>请先完成问卷获取个性化计划</Text>
        <View
          className='plan-page__empty card'
          onClick={() => Taro.navigateTo({ url: '/pages/quiz/index' })}
        >
          <Text className='plan-page__empty-icon'>🎯</Text>
          <Text className='plan-page__empty-text'>去填写问卷</Text>
        </View>
      </View>
    )
  }

  return (
    <View className='page page--chalk plan-page'>
      <ChalkBackground messages={chalkMessages} />
      <Text className='page-title'>{title}</Text>
      <Text className='page-subtitle'>
        每个习惯 ≤3 分钟，专为久坐编程族设计
      </Text>

      <View className='plan-page__day-tabs'>
        {plan.map((day, i) => (
          <View
            key={day.day}
            className={`plan-page__day-tab ${activeDay === i ? 'plan-page__day-tab--active' : ''}`}
            onClick={() => setActiveDay(i)}
          >
            <Text className='plan-page__day-tab-text'>{day.date}</Text>
          </View>
        ))}
      </View>

      {currentDay && (
        <>
          <ProgressBar
            current={completedCount}
            total={totalCount}
            label={`${currentDay.date} 完成进度`}
          />

          {currentDay.habits.map(habit => (
            <View key={habit.id} className='plan-page__habit'>
              <SelectionCard
                icon={
                  habit.pillar === 'hair' ? '💇' :
                  habit.pillar === 'muscle' ? '💪' : '🫀'
                }
                label={habit.title}
                desc={`${PILLAR_LABEL[habit.pillar]} · ${habit.duration} · ${habit.description}`}
                selected={habit.completed}
                onClick={() => handleToggle(habit.id)}
              />
            </View>
          ))}
        </>
      )}

      <ProductRecommendSection />

      <Text className='disclaimer-text'>
        坚持比强度更重要。完成今日计划后，记得开启提醒保持习惯。
      </Text>
    </View>
  )
}
