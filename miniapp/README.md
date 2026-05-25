# Programmer Health Management — Frontend

WeChat mini-program frontend for programmer occupational health management.

**Stack:** Taro 4 + React + TypeScript + Sass

## Features (MVP UI)

- Home hub with navigation cards
- Health report upload (camera/album + demo mode)
- 8-question programmer questionnaire with selection cards
- Three-pillar health score dashboard (hair / muscle / body)
- 7-day micro-habit plan with check-in
- Reminder settings UI
- Profile & disclaimer pages

> Currently uses **mock data** — backend integration comes in a separate phase.

## Quick Start

```bash
cd miniapp
npm install
npm run dev:weapp
```

Open WeChat DevTools → import `miniapp/dist` directory.

For H5 preview:

```bash
npm run dev:h5
```

## Project Structure

```
miniapp/
├── src/
│   ├── components/     # SelectionCard, ScoreCard, NavCard, ProgressBar
│   ├── pages/          # home, report, quiz, result, plan, reminders, profile
│   ├── services/       # mock data & local storage
│   └── types/          # TypeScript interfaces
├── config/             # Taro build config
└── project.config.json # WeChat project config
```

## Pages

| Page | Route | Description |
|------|-------|-------------|
| 首页 | pages/home | Main hub & step progress |
| 上传报告 | pages/report | Photo upload + OCR mock |
| 健康问卷 | pages/quiz | 8 selection-card questions |
| 健康报告 | pages/result | Three-pillar scores |
| 改善计划 | pages/plan | 7-day habit check-in |
| 健康提醒 | pages/reminders | Toggle reminder cards |
| 我的 | pages/profile | Login & profile settings |

## Next Steps (Backend)

- Replace mock service with FastAPI endpoints
- WeChat `code2session` real auth
- OCR + LLM analysis pipeline
- Subscription message delivery
