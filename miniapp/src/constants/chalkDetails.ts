import type { ChalkLinkType } from '@/types'

export interface ChalkDetail {
  title: string
  body: string
  actionLabel?: string
  actionUrl?: string
}

const LINK_TYPE_DETAILS: Record<ChalkLinkType, ChalkDetail> = {
  sleep: {
    title: '早睡建议',
    body: '23:30 前放下手机，保障头发恢复与代谢健康。长期熬夜会加剧脱发风险并升高 ALT。',
    actionLabel: '设置睡眠提醒',
    actionUrl: '/pages/reminders/index'
  },
  medication: {
    title: '涂米诺地尔',
    body: '早晚用药窗口各一次，涂抹后轻按摩头皮 3 分钟。保持头皮清洁干燥，坚持 3 个月以上可见效。',
    actionLabel: '查看提醒设置',
    actionUrl: '/pages/reminders/index'
  },
  habit: {
    title: '起身活动',
    body: '久坐编程 45 分钟后，站起来做颈肩环绕和拉伸，缓解圆肩前倾与手腕压力。',
    actionLabel: '查看打卡计划',
    actionUrl: '/pages/plan/index'
  },
  module: {
    title: '完善健康档案',
    body: '上传体检报告并完成问卷，获取基于你的数据的个性化评分与改善计划。',
    actionLabel: '去填写问卷',
    actionUrl: '/pages/quiz/index'
  }
}

const TEXT_DETAILS: Record<string, ChalkDetail> = {
  '早睡': LINK_TYPE_DETAILS.sleep,
  '涂米诺地尔': LINK_TYPE_DETAILS.medication,
  '起身活动': LINK_TYPE_DETAILS.habit,
  '23:30放下手机': LINK_TYPE_DETAILS.sleep,
  '少熬夜': {
    title: '减少熬夜',
    body: '长期高强度编程需保障 7 小时睡眠，23:30 前停止屏幕刺激。',
    actionLabel: '设置提醒',
    actionUrl: '/pages/reminders/index'
  },
  '护眼休息': {
    title: '20-20-20 护眼',
    body: '每 20 分钟看 6 米外 20 秒，缓解屏幕眼疲劳，保护视力和专注力。',
    actionLabel: '查看提醒',
    actionUrl: '/pages/reminders/index'
  },
  '完成健康问卷': LINK_TYPE_DETAILS.module,
  '上传体检报告': {
    title: '上传体检报告',
    body: 'AI 提取维 D、ALT、BMI 等关键指标，结合问卷生成三维健康评分。',
    actionLabel: '去上传',
    actionUrl: '/pages/report/index'
  },
  '6000步': {
    title: '每日 6000 步',
    body: '工间散步、楼梯代替电梯，改善 BMI 与代谢指标。',
    actionLabel: '查看计划',
    actionUrl: '/pages/plan/index'
  }
}

export function getChalkDetail(text: string, linkType?: ChalkLinkType): ChalkDetail {
  if (TEXT_DETAILS[text]) return TEXT_DETAILS[text]
  if (linkType && LINK_TYPE_DETAILS[linkType]) return LINK_TYPE_DETAILS[linkType]
  return {
    title: text,
    body: '坚持这个小习惯，比一次性高强度训练更有效。把它加入你的每日打卡计划吧。',
    actionLabel: '查看计划',
    actionUrl: '/pages/plan/index'
  }
}
