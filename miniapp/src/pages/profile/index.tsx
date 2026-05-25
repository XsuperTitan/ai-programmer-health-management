import { View, Text, Button, Input } from '@tarojs/components'
import Taro, { useDidShow } from '@tarojs/taro'
import { useState } from 'react'
import SelectionCard from '@/components/SelectionCard'
import NavCard from '@/components/NavCard'
import { getUser, saveUser, mockLogin } from '@/services/mock'
import { syncTabBar } from '@/utils/tabBar'
import type { UserProfile } from '@/types'
import './index.scss'

const JOB_OPTIONS = [
  { value: 'programmer', label: '程序员', desc: '默认画像' },
  { value: 'designer', label: '设计师', desc: '即将支持' },
  { value: 'pm', label: '产品经理', desc: '即将支持' }
]

const HOUR_OPTIONS = [
  { value: '8', label: '8小时', desc: '标准' },
  { value: '10', label: '10小时', desc: '常见' },
  { value: '12', label: '12小时+', desc: '高强度' }
]

export default function ProfilePage() {
  const [user, setUser] = useState<UserProfile>(getUser())
  const [editing, setEditing] = useState(false)
  const [nickname, setNickname] = useState('')

  useDidShow(() => {
    syncTabBar(3)
    const u = getUser()
    setUser(u)
    setNickname(u.nickname)
  })

  const handleLogin = () => {
    const loggedIn = mockLogin()
    setUser(loggedIn)
    setNickname(loggedIn.nickname)
    Taro.showToast({ title: '登录成功', icon: 'success' })
  }

  const handleSave = () => {
    const updated = { ...user, nickname: nickname || '程序员' }
    saveUser(updated)
    setUser(updated)
    setEditing(false)
    Taro.showToast({ title: '已保存', icon: 'success' })
  }

  const updateWorkHours = (hours: number) => {
    const updated = { ...user, workHours: hours }
    saveUser(updated)
    setUser(updated)
  }

  const updateJobType = (jobType: string) => {
    const updated = { ...user, jobType }
    saveUser(updated)
    setUser(updated)
  }

  return (
    <View className='page profile-page'>
      <View className='profile-page__header card'>
        <View className='profile-page__avatar'>
          <Text className='profile-page__avatar-text'>
            {user.nickname.charAt(0)}
          </Text>
        </View>
        {user.isLoggedIn ? (
          <>
            {editing ? (
              <Input
                className='profile-page__name-input'
                value={nickname}
                onInput={e => setNickname(e.detail.value)}
                placeholder='输入昵称'
              />
            ) : (
              <Text className='profile-page__name'>{user.nickname}</Text>
            )}
            <Text className='profile-page__status'>已登录 · 演示模式</Text>
            <Button
              className='profile-page__edit-btn'
              onClick={() => editing ? handleSave() : setEditing(true)}
            >
              {editing ? '保存' : '编辑昵称'}
            </Button>
          </>
        ) : (
          <>
            <Text className='profile-page__name'>未登录</Text>
            <Text className='profile-page__status'>登录后可同步健康数据</Text>
            <Button className='btn-primary profile-page__login-btn' onClick={handleLogin}>
              微信登录（演示）
            </Button>
          </>
        )}
      </View>

      <Text className='section-title'>职业类型</Text>
      {JOB_OPTIONS.map(opt => (
        <SelectionCard
          key={opt.value}
          label={opt.label}
          desc={opt.desc}
          selected={user.jobType === opt.value}
          onClick={() => updateJobType(opt.value)}
        />
      ))}

      <Text className='section-title'>日均工作时长</Text>
      {HOUR_OPTIONS.map(opt => (
        <SelectionCard
          key={opt.value}
          label={opt.label}
          desc={opt.desc}
          selected={String(user.workHours) === opt.value}
          onClick={() => updateWorkHours(Number(opt.value))}
        />
      ))}

      <Text className='section-title'>更多</Text>
      <NavCard
        icon='📄'
        title='隐私政策与免责声明'
        subtitle='了解数据使用与健康建议边界'
        onClick={() => Taro.navigateTo({ url: '/pages/disclaimer/index' })}
      />
      <NavCard
        icon='🔔'
        title='提醒设置'
        subtitle='管理健康提醒偏好'
        onClick={() => Taro.navigateTo({ url: '/pages/reminders/index' })}
      />
    </View>
  )
}
