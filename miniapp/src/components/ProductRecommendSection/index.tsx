import { View, Text } from '@tarojs/components'
import Taro from '@tarojs/taro'
import { MOCK_PRODUCTS } from '@/services/mock'
import type { ProductItem } from '@/types'
import './index.scss'

export default function ProductRecommendSection() {
  const handleTap = () => {
    Taro.showToast({ title: '产品推荐即将上线', icon: 'none' })
  }

  return (
    <View className='product-recommend'>
      <View className='product-recommend__head'>
        <Text className='product-recommend__title'>产品推荐</Text>
        <Text className='product-recommend__badge'>占位</Text>
      </View>
      <Text className='product-recommend__hint'>根据你的健康数据智能匹配，后端接入后展示</Text>

      {MOCK_PRODUCTS.map(item => (
        <View key={item.id} className='product-recommend__card' onClick={handleTap}>
          <View className='product-recommend__thumb'>
            <Text className='product-recommend__thumb-text'>{item.tag}</Text>
          </View>
          <View className='product-recommend__body'>
            <Text className='product-recommend__name'>{item.name}</Text>
            <Text className='product-recommend__desc'>{item.desc}</Text>
            <View className='product-recommend__footer'>
              <Text className='product-recommend__price'>{item.price}</Text>
              <Text className='product-recommend__action'>了解详情 →</Text>
            </View>
          </View>
        </View>
      ))}
    </View>
  )
}
