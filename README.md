# 程序员健康助手（ai-programmer-health-management）

Taro 4 + React + TypeScript 微信小程序，面向久坐编程族的健康评估与打卡计划。

## 技术栈

- Taro 4、React、TypeScript、Sass
- 微信小程序（custom TabBar）
- 本地 mock + Storage（预留后端接入）

## 快速开始

```bash
cd miniapp
npm install
npm run dev:weapp
```

构建产物：

```bash
npm run build:weapp
```

## 目录结构

```
miniapp/src/
├── pages/          # 首页、计划、问卷、结果等
├── components/     # ChalkBackground、ModuleCard、AlertBanner 等
├── services/       # mock 数据、粉笔字生成
├── styles/         # 主题与黑板页样式
└── custom-tab-bar/ # 底部导航
```

## 文档

- [Agent 会话历史摘要](docs/agent-session-history.md) — 需求、实现与扩展规划上下文

## 说明

本应用提供生活方式建议，不构成医疗诊断。
