import { View, Text, Button, Image } from '@tarojs/components'
import Taro from '@tarojs/taro'
import { useState } from 'react'
import SelectionCard from '@/components/SelectionCard'
import { completeReportUpload } from '@/services/mock'
import './index.scss'

type UploadMode = 'camera' | 'album' | null

export default function ReportPage() {
  const [mode, setMode] = useState<UploadMode>(null)
  const [preview, setPreview] = useState('')
  const [uploading, setUploading] = useState(false)

  const handleChoose = async (source: UploadMode) => {
    setMode(source)
    try {
      const res = await Taro.chooseImage({
        count: 1,
        sizeType: ['compressed'],
        sourceType: source === 'camera' ? ['camera'] : ['album']
      })
      if (res.tempFilePaths?.[0]) {
        setPreview(res.tempFilePaths[0])
      }
    } catch (_) {
      Taro.showToast({ title: '已取消', icon: 'none' })
    }
  }

  const handleUpload = () => {
    if (!preview) {
      Taro.showToast({ title: '请先选择报告图片', icon: 'none' })
      return
    }
    setUploading(true)
    setTimeout(() => {
      completeReportUpload()
      setUploading(false)
      Taro.showToast({ title: '上传成功', icon: 'success' })
      setTimeout(() => {
        Taro.navigateTo({ url: '/pages/quiz/index' })
      }, 800)
    }, 1200)
  }

  return (
    <View className='page report-page'>
      <Text className='page-title'>上传体检报告</Text>
      <Text className='page-subtitle'>
        支持拍照或相册选择，系统将提取维生素D、铁蛋白、BMI等关键指标
      </Text>

      <Text className='section-title'>选择上传方式</Text>

      <SelectionCard
        icon='📷'
        label='拍照上传'
        desc='直接拍摄纸质报告'
        selected={mode === 'camera'}
        onClick={() => handleChoose('camera')}
      />
      <SelectionCard
        icon='🖼️'
        label='从相册选择'
        desc='选择已有照片或截图'
        selected={mode === 'album'}
        onClick={() => handleChoose('album')}
      />

      {preview && (
        <View className='report-page__preview card'>
          <Text className='report-page__preview-label'>报告预览</Text>
          <Image className='report-page__preview-img' src={preview} mode='aspectFit' />
          <Text className='report-page__preview-hint'>
            上传后可在结果页手动修正识别指标
          </Text>
        </View>
      )}

      <Button
        className='btn-primary'
        loading={uploading}
        disabled={!preview || uploading}
        onClick={handleUpload}
      >
        {uploading ? 'AI 识别中...' : '确认上传并识别'}
      </Button>

      <Button
        className='btn-secondary'
        onClick={() => {
          completeReportUpload()
          Taro.navigateTo({ url: '/pages/quiz/index' })
        }}
      >
        跳过（使用演示数据）
      </Button>

      <Text className='disclaimer-text'>
        报告数据仅用于健康参考，原始图片可在分析后删除。
      </Text>
    </View>
  )
}
