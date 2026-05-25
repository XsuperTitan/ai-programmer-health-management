import { Component } from 'react'
import Taro from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import './index.scss'

const TAB_LIST = [
  { pagePath: '/pages/home/index', text: '首页' },
  { pagePath: '/pages/plan/index', text: '计划' },
  { pagePath: '/pages/customize/index', text: '定制' },
  { pagePath: '/pages/profile/index', text: '我的' }
]

interface CustomTabBarState {
  selected: number
}

export default class CustomTabBar extends Component<object, CustomTabBarState> {
  state: CustomTabBarState = {
    selected: 0
  }

  setSelected(index: number) {
    this.setState({ selected: index })
  }

  switchTab(index: number, path: string) {
    this.setSelected(index)
    Taro.switchTab({ url: path })
  }

  render() {
    const { selected } = this.state

    return (
      <View className='custom-tab-bar'>
        <View className='custom-tab-bar__inner'>
          {TAB_LIST.map((item, index) => (
            <View
              key={item.text}
              className={`custom-tab-bar__slot ${index > 0 ? 'custom-tab-bar__slot--divider' : ''}`}
            >
              <View
                className={`custom-tab-bar__item ${selected === index ? 'custom-tab-bar__item--active' : ''}`}
                onClick={() => this.switchTab(index, item.pagePath)}
              >
                <Text className='custom-tab-bar__text'>{item.text}</Text>
              </View>
            </View>
          ))}
        </View>
      </View>
    )
  }
}
