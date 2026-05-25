export default defineAppConfig({
  pages: [
    'pages/home/index',
    'pages/report/index',
    'pages/quiz/index',
    'pages/result/index',
    'pages/plan/index',
    'pages/reminders/index',
    'pages/profile/index',
    'pages/disclaimer/index'
  ],
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#526b60',
    navigationBarTitleText: '程序员健康助手',
    navigationBarTextStyle: 'white',
    backgroundColor: '#526b60'
  },
  tabBar: {
    custom: true,
    color: '#8a9a86',
    selectedColor: '#ff6800',
    backgroundColor: '#526b60',
    borderStyle: 'black',
    list: [
      {
        pagePath: 'pages/home/index',
        text: '首页'
      },
      {
        pagePath: 'pages/plan/index',
        text: '计划'
      },
      {
        pagePath: 'pages/profile/index',
        text: '我的'
      }
    ]
  }
})
