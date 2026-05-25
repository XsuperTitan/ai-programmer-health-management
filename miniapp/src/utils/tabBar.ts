import Taro from '@tarojs/taro'

export function syncTabBar(index: number) {
  const page = Taro.getCurrentInstance().page
  if (!page) return
  const tabBar = Taro.getTabBar<{ setSelected: (i: number) => void }>(page)
  tabBar?.setSelected?.(index)
}
