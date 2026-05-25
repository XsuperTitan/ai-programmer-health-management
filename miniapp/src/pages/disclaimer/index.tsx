import { View, Text } from '@tarojs/components'
import './index.scss'

export default function DisclaimerPage() {
  return (
    <View className='page disclaimer-page'>
      <Text className='page-title'>隐私与免责声明</Text>

      <View className='card'>
        <Text className='disclaimer-page__section-title'>服务性质</Text>
        <Text className='disclaimer-page__text'>
          本小程序提供的生活方式健康参考信息，不构成医疗诊断、治疗建议或处方。
          所有 AI 分析结果仅供参考，不能替代专业医疗机构的诊疗意见。
        </Text>
      </View>

      <View className='card'>
        <Text className='disclaimer-page__section-title'>数据隐私</Text>
        <Text className='disclaimer-page__text'>
          • 体检报告上传后，系统提取结构化指标用于分析{'\n'}
          • 原始报告图片可在分析完成后删除{'\n'}
          • 数据存储在本地演示模式，正式版将加密存储{'\n'}
          • 您可随时清除个人数据
        </Text>
      </View>

      <View className='card'>
        <Text className='disclaimer-page__section-title'>异常指标处理</Text>
        <Text className='disclaimer-page__text'>
          如发现体检报告中存在严重异常指标（如肿瘤标志物显著升高、
          严重肝肾功能异常等），请立即就医，勿依赖本应用建议延误治疗。
        </Text>
      </View>

      <View className='card'>
        <Text className='disclaimer-page__section-title'>产品推荐（未来功能）</Text>
        <Text className='disclaimer-page__text'>
          未来版本可能包含基于 AI 和健康数据的商品推荐。
          所有推荐将明确标注来源，用户可自主决定是否采纳。
        </Text>
      </View>

      <Text className='disclaimer-text'>
        使用本应用即表示您已阅读并同意以上内容。
      </Text>
    </View>
  )
}
