import Taro from '@tarojs/taro'
import type {
  UserProfile,
  HealthMetric,
  PillarScore,
  PlanDay,
  ReminderItem,
  HealthSession,
  HealthAlert,
  ProductItem
} from '@/types'

export const MOCK_PRODUCTS: ProductItem[] = [
  {
    id: 'p1',
    name: '米诺地尔泡沫剂',
    desc: '针对脱发风险 · 早晚涂抹',
    tag: '头发',
    price: '¥168'
  },
  {
    id: 'p2',
    name: '维生素 D3 软胶囊',
    desc: '改善维 D 偏低 · 每日 1 粒',
    tag: '补剂',
    price: '¥89'
  },
  {
    id: 'p3',
    name: '人体工学坐垫',
    desc: '久坐编程 · 缓解腰肩压力',
    tag: '体态',
    price: '¥299'
  }
]

const STORAGE_KEYS = {
  user: 'ph_user',
  session: 'ph_session',
  reminders: 'ph_reminders'
}

export const MOCK_METRICS: HealthMetric[] = [
  { key: 'vitamin_d', label: '维生素D', value: 18.5, unit: 'ng/mL', flag: 'low' },
  { key: 'ferritin', label: '铁蛋白', value: 22, unit: 'ng/mL', flag: 'normal' },
  { key: 'testosterone', label: '睾酮', value: 4.2, unit: 'ng/mL', flag: 'normal' },
  { key: 'alt', label: 'ALT', value: 45, unit: 'U/L', flag: 'high' },
  { key: 'bmi', label: 'BMI', value: 24.1, unit: '', flag: 'overweight' },
  { key: 'fasting_glucose', label: '空腹血糖', value: 5.4, unit: 'mmol/L', flag: 'normal' }
]

export const MOCK_SCORES: PillarScore[] = [
  {
    key: 'hair',
    label: '头发健康',
    score: 62,
    summary: '维生素D偏低，结合熬夜与压力，存在脱发风险信号',
    tips: ['23:30前入睡', '补充富含维生素D的食物', '每日 scalp 按摩3分钟'],
    icon: '💇',
    color: '#ff6800'
  },
  {
    key: 'muscle',
    label: '身材综合评分',
    score: 71,
    summary: 'BMI略偏高，久坐导致体脂分布不均，存在圆肩前倾体态',
    tips: ['每日5分钟体态矫正拉伸', '控制精制碳水摄入', '工间站立办公30分钟'],
    icon: '🧍',
    color: '#c8f000'
  },
  {
    key: 'body',
    label: '整体健康',
    score: 58,
    summary: 'BMI略高，ALT偏高，需关注代谢与肝脏负担',
    tips: ['减少含糖饮料', '每日6000步', '23点前停止进食'],
    icon: '🫀',
    color: '#ff9533'
  }
]

export const MOCK_PLAN: PlanDay[] = [
  {
    day: 1,
    date: '今天',
    habits: [
      { id: 'h1', title: '23:30 前放下手机', description: '设置睡眠闹钟，减少蓝光', duration: '1分钟', pillar: 'hair', completed: false },
      { id: 'h2', title: '45分钟起身拉伸', description: '颈肩环绕 + 站立30秒', duration: '3分钟', pillar: 'muscle', completed: false },
      { id: 'h3', title: '6000步目标', description: '工间散步或楼梯代替电梯', duration: '全天', pillar: 'body', completed: false }
    ]
  },
  {
    day: 2,
    date: '明天',
    habits: [
      { id: 'h4', title: ' scalp 按摩', description: '指腹从前额到后脑轻按', duration: '3分钟', pillar: 'hair', completed: false },
      { id: 'h5', title: '核心激活', description: '平板支撑 3×20秒', duration: '2分钟', pillar: 'muscle', completed: false },
      { id: 'h6', title: '替换含糖饮料', description: '改喝无糖茶或气泡水', duration: '全天', pillar: 'body', completed: false }
    ]
  },
  {
    day: 3,
    date: '第3天',
    habits: [
      { id: 'h7', title: '20-20-20 护眼', description: '每20分钟看6米外20秒', duration: '1分钟', pillar: 'hair', completed: false },
      { id: 'h8', title: '弹力带划船', description: '15次×2组', duration: '3分钟', pillar: 'muscle', completed: false },
      { id: 'h9', title: '增加蔬菜比例', description: '午餐加一份绿叶菜', duration: '全天', pillar: 'body', completed: false }
    ]
  }
]

export const DEFAULT_REMINDERS: ReminderItem[] = [
  { id: 'r1', title: '起身活动', description: '每45分钟提醒一次', time: '09:00-18:00', enabled: true, icon: '🚶' },
  { id: 'r2', title: '20-20-20 护眼', description: '缓解屏幕眼疲劳', time: '每20分钟', enabled: true, icon: '👁️' },
  { id: 'r3', title: '睡眠提醒', description: '23:00 准备入睡', time: '23:00', enabled: false, icon: '🌙' },
  { id: 'r4', title: '计划打卡', description: '每日习惯完成提醒', time: '21:00', enabled: false, icon: '✅' }
]

export const QUIZ_QUESTIONS = [
  {
    id: 'coding_hours',
    title: '每日编程时长',
    subtitle: '含会议、调试、写代码',
    options: [
      { value: '4', label: '≤4小时', desc: '轻度' },
      { value: '6', label: '5-8小时', desc: '常规' },
      { value: '10', label: '9-12小时', desc: '高强度' },
      { value: '14', label: '>12小时', desc: '超负荷' }
    ]
  },
  {
    id: 'sleep_quality',
    title: '睡眠质量',
    subtitle: '近两周平均感受',
    options: [
      { value: '5', label: '很好', desc: '7h+ 精神好' },
      { value: '4', label: '较好', desc: '基本恢复' },
      { value: '3', label: '一般', desc: '偶尔疲惫' },
      { value: '2', label: '较差', desc: '经常睡不够' },
      { value: '1', label: '很差', desc: '长期失眠' }
    ]
  },
  {
    id: 'neck_pain',
    title: '颈肩不适程度',
    subtitle: '1=无 5=严重',
    options: [
      { value: '1', label: '无', desc: '' },
      { value: '2', label: '轻微', desc: '偶尔酸' },
      { value: '3', label: '中等', desc: '每周多次' },
      { value: '4', label: '明显', desc: '影响工作' },
      { value: '5', label: '严重', desc: '需就医' }
    ]
  },
  {
    id: 'wrist_pain',
    title: '手腕/腱鞘不适',
    subtitle: '鼠标手、键盘腕',
    options: [
      { value: '1', label: '无', desc: '' },
      { value: '2', label: '轻微', desc: '偶尔麻' },
      { value: '3', label: '中等', desc: '持续酸' },
      { value: '4', label: '明显', desc: '影响打字' },
      { value: '5', label: '严重', desc: '需就医' }
    ]
  },
  {
    id: 'hair_loss',
    title: '脱发/发际线',
    subtitle: '自我评估',
    options: [
      { value: '0', label: '无变化', desc: '' },
      { value: '1', label: '轻微', desc: '洗头掉发略多' },
      { value: '2', label: '中等', desc: '发际线后移' },
      { value: '3', label: '明显', desc: '头顶稀疏' },
      { value: '4', label: '严重', desc: '大面积脱发' }
    ]
  },
  {
    id: 'exercise',
    title: '每周运动频率',
    subtitle: '中等强度以上',
    options: [
      { value: '0', label: '几乎不', desc: '' },
      { value: '1', label: '1次', desc: '' },
      { value: '2', label: '2-3次', desc: '' },
      { value: '4', label: '4-5次', desc: '' },
      { value: '6', label: '6次+', desc: '' }
    ]
  },
  {
    id: 'caffeine',
    title: '每日咖啡因',
    subtitle: '咖啡/茶/功能饮料',
    options: [
      { value: '0', label: '不喝', desc: '' },
      { value: '1', label: '1杯', desc: '' },
      { value: '2', label: '2-3杯', desc: '' },
      { value: '4', label: '4杯+', desc: '' }
    ]
  },
  {
    id: 'eye_exam',
    title: '上次眼科检查',
    subtitle: '',
    options: [
      { value: '6', label: '6个月内', desc: '' },
      { value: '12', label: '1年内', desc: '' },
      { value: '24', label: '1-2年', desc: '' },
      { value: '99', label: '2年以上', desc: '' }
    ]
  }
]

export function getUser(): UserProfile {
  try {
    const raw = Taro.getStorageSync(STORAGE_KEYS.user)
    if (raw) return JSON.parse(raw)
  } catch (_) { /* ignore */ }
  return {
    nickname: '程序员',
    avatarUrl: '',
    jobType: 'programmer',
    workHours: 10,
    isLoggedIn: false
  }
}

export function saveUser(user: UserProfile): void {
  Taro.setStorageSync(STORAGE_KEYS.user, JSON.stringify(user))
}

export function getSession(): HealthSession {
  try {
    const raw = Taro.getStorageSync(STORAGE_KEYS.session)
    if (raw) {
      const session = JSON.parse(raw) as HealthSession
      if (session.scores?.length) {
        session.scores = session.scores.map(s => {
          const latest = MOCK_SCORES.find(m => m.key === s.key)
          return latest ? { ...latest, score: s.score } : s
        })
      }
      return session
    }
  } catch (_) { /* ignore */ }
  return {
    reportUploaded: false,
    quizCompleted: false,
    metrics: [],
    scores: [],
    plan: []
  }
}

export function saveSession(session: HealthSession): void {
  Taro.setStorageSync(STORAGE_KEYS.session, JSON.stringify(session))
}

export function getReminders(): ReminderItem[] {
  try {
    const raw = Taro.getStorageSync(STORAGE_KEYS.reminders)
    if (raw) return JSON.parse(raw)
  } catch (_) { /* ignore */ }
  return DEFAULT_REMINDERS
}

export function saveReminders(items: ReminderItem[]): void {
  Taro.setStorageSync(STORAGE_KEYS.reminders, JSON.stringify(items))
}

export function getActiveAlerts(): HealthAlert[] {
  const hour = new Date().getHours()
  const alerts: HealthAlert[] = []

  if (hour >= 22 || hour < 6) {
    alerts.push({
      id: 'sleep',
      type: 'sleep',
      title: '该睡觉了',
      description: '23:30 前放下手机，保障头发与代谢恢复',
      urgency: hour >= 23 ? 'high' : 'normal',
      actionLabel: '去设置'
    })
  }

  if (hour >= 7 && hour <= 10) {
    alerts.push({
      id: 'minoxidil',
      type: 'medication',
      title: '涂米诺地尔',
      description: '早晨用药窗口，涂抹后轻按摩 3 分钟',
      urgency: 'normal',
      actionLabel: '已完成'
    })
  }

  if (hour >= 12 && hour <= 14) {
    alerts.push({
      id: 'stand',
      type: 'habit',
      title: '起身活动',
      description: '久坐编程 45 分钟，该站起来拉伸颈肩了',
      urgency: 'normal',
      actionLabel: '知道了'
    })
  }

  if (hour >= 20 && hour < 22) {
    alerts.push({
      id: 'minoxidil-pm',
      type: 'medication',
      title: '涂米诺地尔',
      description: '晚间第二次用药，保持头皮清洁干燥',
      urgency: 'normal',
      actionLabel: '已完成'
    })
  }

  return alerts.slice(0, 2)
}

export function mockLogin(): UserProfile {
  const user: UserProfile = {
    nickname: '码农小王',
    avatarUrl: '',
    jobType: 'programmer',
    workHours: 10,
    isLoggedIn: true
  }
  saveUser(user)
  return user
}

export function completeReportUpload(): HealthSession {
  const session = getSession()
  session.reportUploaded = true
  session.metrics = MOCK_METRICS
  saveSession(session)
  return session
}

export function completeQuiz(): HealthSession {
  const session = getSession()
  session.quizCompleted = true
  session.scores = MOCK_SCORES
  session.plan = MOCK_PLAN
  saveSession(session)
  return session
}

export function toggleHabitComplete(dayIndex: number, habitId: string): PlanDay[] {
  const session = getSession()
  const plan = session.plan.length ? session.plan : MOCK_PLAN
  const updated = plan.map((day, i) => {
    if (i !== dayIndex) return day
    return {
      ...day,
      habits: day.habits.map(h =>
        h.id === habitId ? { ...h, completed: !h.completed } : h
      )
    }
  })
  session.plan = updated
  saveSession(session)
  return updated
}
