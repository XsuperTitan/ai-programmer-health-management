# Agent 会话历史摘要（ai-health-management / 程序员健康助手小程序）

> 供下一个 Agent 作为上下文使用。项目路径：`/Users/mac/IdeaProjects/ai-health-management`，小程序代码在 `miniapp/`。

---

## 1. 项目概况

- **技术栈**：Taro 4 + React + TypeScript + Sass，微信小程序
- **入口**：`miniapp/src/pages/home/index`（Tab：首页 / 计划 / 我的）
- **数据**：当前以 `miniapp/src/services/mock.ts` 本地 mock + Storage 为主，部分功能预留后端接入
- **用户规则**：`appId` 必须始终为 string，不可转 Number

---

## 2. 首页改造（第一轮）

### 健康模块
- **原状**：5 个小 NavCard（上传报告、问卷、评分、计划、提醒）
- **现况**：仅 **3 个大 Banner**（`ModuleCard`），左侧写实配图（PNG），无 emoji
  1. **程序员头发健康** → 问卷/评分
  2. **程序员健身定制** → 计划 Tab
  3. **程序员健康自定义** → 上传体检报告（`/pages/report/index`）
- Banner 半透明玻璃态（参考 AlertBanner），可透出黑板粉笔字

### 关键事件提醒
- 首页/计划页：`AlertBanner`，位于健康模块与「最新评分」之间（首页）
- 按时段动态：`该睡觉了`、`涂米诺地尔`、`起身活动` 等（`getActiveAlerts()`）

### 最新评分
- 展示前 2 项评分（头发 + 第二维）
- **第二维已从「肌肉健康」改为「身材综合评分」**（`mock.ts` 中 `muscle` key 的 label/tips 已更新；内部 key 仍为 `muscle` 以兼容计划习惯 pillar）
- `getSession()` 会 merge 最新 MOCK_SCORES 文案到本地缓存

---

## 3. 视觉 / 主题演进

### 品牌色（保留）
- 兰博基尼橙 `#FF6800`、亮绿 `#C8F000`，用于 Banner 渐变、按钮、Tab 选中（曾为 cyan，后改橙）

### 背景风格（最终态）
| 区域 | 样式 |
|------|------|
| **首页 + 计划页** | 浅墨绿黑板 `#455A50~#526B60` + 粉笔白网格 + 粉笔字背景层 |
| **其他页面** | 深墨绿 `#1A2820` 系（`.page` 默认） |
| **顶部导航栏 + 底部 TabBar** | `#526B60`（比内容区深一点时的中间方案；与 chalk 页协调） |

### 主题变量
- `miniapp/src/styles/_theme.scss`
- 黑板浅色页：`miniapp/src/styles/chalk-page.scss`（`.page--chalk`）

### 自定义 TabBar
- `miniapp/src/custom-tab-bar/`（`custom: true`）
- 文案：**首页｜计划｜我的**，44px，选中美橙 `#FF6800`
- 三等分 + 分隔符 `::before`，**选中/未选中同字号**（解决对齐问题）
- 各 Tab 页 `useDidShow` 调用 `syncTabBar(index)`（`utils/tabBar.ts`）

---

## 4. 黑板粉笔字系统（ChalkBackground）

### 范围
- **仅首页、计划页**（`page--chalk` + `<ChalkBackground />`）

### 数量与布局
- **8～11 条** / 天 / 页（seed：`日期 + page + 昵称`）
- 位置：`utils/chalkLayout.ts` 槽位 + clamp，避免裁切
  - 按文案长度估算宽度，限制 left/top/rotate
  - 计划页 `topMax: 68%`（比首页更紧，避 TabBar）
  - `transformOrigin: '0% 50%'`，`max-width: 72%`

### 颜色（6 种，比前台字暗、比最初亮）
- `white | yellow | orange | green | cyan | coral`
- 推断逻辑：`constants/chalkColors.ts` → `inferChalkColor(text)`
- 数据源：`services/chalkMessages.ts` ← 健康 session、metrics、scores tips、计划习惯、reminders、alerts、用户 workHours

### 关键文件
- `components/ChalkBackground/`
- `services/chalkMessages.ts`
- `utils/chalkLayout.ts`
- `types/index.ts` → `ChalkMessage`, `ChalkPage`, `ChalkColorVariant`

---

## 5. 计划页改造

### 标题
- ~~7天微习惯计划~~ → **`{用户昵称}的身体拯救打卡计划`**
- 例：`码农小王的身体拯救打卡计划`（默认昵称「程序员」）
- 导航栏 config 仍为「改善计划」（`pages/plan/index.config.ts`）

### 产品推荐（占位）
- `components/ProductRecommendSection/`
- `MOCK_PRODUCTS` in `mock.ts`（3 条：米诺地尔、维 D、工学坐垫）
- 点击 toast「产品推荐即将上线」，**待后端接入**

---

## 6. 组件清单（新增/重要）

| 组件 | 路径 | 用途 |
|------|------|------|
| ModuleCard | `components/ModuleCard/` | 首页 3 大 Banner |
| AlertBanner | `components/AlertBanner/` | 关键事件提醒 |
| ChalkBackground | `components/ChalkBackground/` | 黑板粉笔字层 |
| ProductRecommendSection | `components/ProductRecommendSection/` | 计划页产品推荐占位 |
| CustomTabBar | `custom-tab-bar/` | 底部导航 |

---

## 7. 用户拍板记录

1. **粉笔字页面**：仅首页 + 计划
2. **粉笔字数量**：8～11 条，随机位置角度（日 seed 稳定）
3. **粉笔字内容**：根据用户健康数据生成（非纯运营配置）
4. **肌肉健康 → 身材综合评分**：已改（曾有一轮误解为「不改」，后以用户明确指令为准已改）
5. **Banner 透明**：健康模块要半透明，以便看到粉笔字
6. **导航栏/TabBar 颜色**：单独调淡为 `#526B60`，网格内容区不动

---

## 8. 扩展功能讨论（未落代码）

### 粉笔字点击 / 互动
- 可行但易误触；建议 V1：高亮 1～2 条；V2：点击出半屏说明或跳转模块

### 问卷 + 粉笔风
- 建议混合：黑板背景 + 粉笔装饰 + **前景仍用 SelectionCard**；纯粉笔选项可读性差

### 专页：拖拽粉笔词组成健康关键词 → 生成计划
- 用户认为方向好；建议独立「健康关键词定制」页
- MVP：**点选**加入计划板；V2 再拖拽（`movable-view`）
- 词库与健康数据 API 同源

---

## 9. 小修记录

- **免责声明小字** `.disclaimer-text`：`$text-muted` → `$text-secondary`（`#A8B8A4`），提高与黑板背景对比度

---

## 10. 资源文件

- 模块配图：`miniapp/src/assets/modules/module-{hair,fitness,report}.png`（已压缩 ~110–150KB）
- 主题：深色黑板 + 橙绿强调 + 浅 chalk 页

---

## 11. 常用命令

```bash
cd miniapp && npm run dev:weapp   # 开发
cd miniapp && npm run build:weapp # 构建
```

---

## 12. 后续 Agent 可接续事项

- [ ] 产品推荐接真实 API（替换 `MOCK_PRODUCTS`）
- [ ] 粉笔字 / 计划数据接后端（扩展 `getChalkMessages` 数据源）
- [ ] 粉笔字点击交互或关键词定制页 MVP
- [ ] 问卷页粉笔风装饰（不动选项组件）
- [ ] 全局其他页面是否统一 chalk 浅色背景（用户未要求）
- [ ] TabBar / 导航栏颜色若与新版 chalk 页不协调可再微调

---

## 13. 关键代码入口速查

```
miniapp/src/
├── app.config.ts          # 路由、TabBar custom、导航栏色
├── app.scss               # 全局样式、disclaimer、.page
├── styles/_theme.scss     # 颜色变量
├── styles/chalk-page.scss # .page--chalk
├── custom-tab-bar/        # 底部导航
├── services/
│   ├── mock.ts            # 用户、session、评分、计划、产品 mock
│   └── chalkMessages.ts   # 粉笔字生成
├── constants/chalkColors.ts
├── utils/chalkLayout.ts   # 粉笔字安全区
├── utils/tabBar.ts
├── pages/home/index.tsx
└── pages/plan/index.tsx
```

---

*文档生成自完整 Agent 会话，涵盖需求、实现、拍板与未做扩展。*
