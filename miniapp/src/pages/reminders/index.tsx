import { View, Text, Button } from '@tarojs/components'
import Taro, { useDidShow } from '@tarojs/taro'
import { useState } from 'react'
import SelectionCard from '@/components/SelectionCard'
import { getReminders, saveReminders, DEFAULT_REMINDERS } from '@/services/mock'
import type { ReminderItem } from '@/types'
import './index.scss'

export default function RemindersPage() {
  const [reminders, setReminders] = useState<ReminderItem[]>([])

  useDidShow(() => {
    setReminders(getReminders())
  })

  const toggleReminder = (id: string) => {
    const updated = reminders.map(r =>
      r.id === id ? { ...r, enabled: !r.enabled } : r
    )
    setReminders(updated)
    saveReminders(updated)
  }

  const requestSubscribe = () => {
    Taro.requestSubscribeMessage({
      tmplIds: [''],
      fail: () => {
        Taro.showToast({
          title: '请在正式版配置订阅消息模板',
          icon: 'none'
        })
      }
    })
  }

  const saveAll = () => {
    saveReminders(reminders)
    Taro.showToast({ title: '提醒已保存', icon: 'success' })
  }

  return (
    <View className='page reminders-page'>
      <Text className='page-title'>健康提醒</Text>
      <Text className='page-subtitle'>
        开启提醒后，将通过微信服务通知推送（需授权）
      </Text>

      {reminders.map(item => (
        <SelectionCard
          key={item.id}
          iconKey={item.iconKey}
          label={item.title}
          desc={`${item.description} · ${item.time}`}
          selected={item.enabled}
          onClick={() => toggleReminder(item.id)}
        />
      ))}

      <View className='reminders-page__info card'>
        <Text className='reminders-page__info-title'>提醒说明</Text>
        <Text className='reminders-page__info-text'>
          • 起身活动：每45分钟提醒一次，缓解久坐{'\n'}
          • 20-20-20：每20分钟看6米外20秒{'\n'}
          • 睡眠提醒：23:00 准备入睡{'\n'}
          • 微信订阅消息需每次授权（一次性）
        </Text>
      </View>

      <Button className='btn-primary' onClick={requestSubscribe}>
        授权微信提醒
      </Button>
      <Button className='btn-secondary' onClick={saveAll}>
        保存设置
      </Button>

      <Button
        className='btn-secondary'
        onClick={() => {
          saveReminders(DEFAULT_REMINDERS)
          setReminders(DEFAULT_REMINDERS)
          Taro.showToast({ title: '已重置', icon: 'none' })
        }}
      >
        恢复默认
      </Button>
    </View>
  )
}
