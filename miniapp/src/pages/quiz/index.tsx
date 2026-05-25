import { View, Text, Button } from '@tarojs/components'
import Taro from '@tarojs/taro'
import { useState } from 'react'
import SelectionCard from '@/components/SelectionCard'
import ProgressBar from '@/components/ProgressBar'
import { QUIZ_QUESTIONS, completeQuiz } from '@/services/mock'
import './index.scss'

export default function QuizPage() {
  const [step, setStep] = useState(0)
  const [answers, setAnswers] = useState<Record<string, string>>({})
  const [submitting, setSubmitting] = useState(false)

  const question = QUIZ_QUESTIONS[step]
  const total = QUIZ_QUESTIONS.length
  const currentAnswer = answers[question.id]

  const selectOption = (value: string) => {
    setAnswers(prev => ({ ...prev, [question.id]: value }))
  }

  const goNext = () => {
    if (!currentAnswer) {
      Taro.showToast({ title: '请选择一个选项', icon: 'none' })
      return
    }
    if (step < total - 1) {
      setStep(step + 1)
    } else {
      setSubmitting(true)
      setTimeout(() => {
        completeQuiz()
        setSubmitting(false)
        Taro.redirectTo({ url: '/pages/result/index' })
      }, 1000)
    }
  }

  const goPrev = () => {
    if (step > 0) setStep(step - 1)
  }

  return (
    <View className='page quiz-page'>
      <ProgressBar current={step + 1} total={total} label='问卷进度' />

      <Text className='page-title'>{question.title}</Text>
      {question.subtitle && (
        <Text className='page-subtitle'>{question.subtitle}</Text>
      )}

      <View className='quiz-page__options'>
        {question.options.map(opt => (
          <SelectionCard
            key={opt.value}
            label={opt.label}
            desc={opt.desc}
            selected={currentAnswer === opt.value}
            onClick={() => selectOption(opt.value)}
          />
        ))}
      </View>

      <View className='quiz-page__actions'>
        {step > 0 && (
          <Button className='btn-secondary quiz-page__btn-half' onClick={goPrev}>
            上一题
          </Button>
        )}
        <Button
          className={`btn-primary ${step > 0 ? 'quiz-page__btn-half' : ''}`}
          loading={submitting}
          disabled={!currentAnswer || submitting}
          onClick={goNext}
        >
          {step < total - 1 ? '下一题' : submitting ? 'AI 分析中...' : '提交并查看结果'}
        </Button>
      </View>
    </View>
  )
}
