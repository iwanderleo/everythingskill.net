# EverythingSkill.net — Project Skill

Use this skill whenever working on the **everythingskill.net** project.  
Workspace root: `/path/to/everythingskill.net`

---

## 1. Tech Stack

| Layer | Choice |
|-------|--------|
| Framework | Nuxt 3, compatibility v4 (`future.compatibilityVersion: 4`, `app/` directory layout) |
| Styling | Tailwind CSS v3 via `@nuxtjs/tailwindcss` |
| Icons | `@nuxt/icon` (Lucide icon set: `lucide:*`) |
| Fonts | `@nuxt/fonts` — Cal Sans, Inter, Roboto Mono via Google |
| i18n | `@nuxtjs/i18n`, `strategy: no_prefix`, default locale `zh`, locales in `i18n/locales/` |
| Markdown | `marked` ^18 with `gfm: true, breaks: false` |
| GitHub CSS | `github-markdown-css` (light theme) |
| TypeScript | strict, Nuxt auto-imports |

**Key dependencies never to change without discussion:**
- `tailwind.config.ts` — `plugins: []` (typography plugin removed; use github-markdown-css instead)
- CSS load order in `nuxt.config.ts: css` array: `github-markdown-css` **first**, then `~/assets/css/main.css`

---

## 2. Design System (Cal.com-inspired)

### Colors (tailwind.config.ts)
```
charcoal:    #242424   — primary text, buttons, headings
midnight:    #111111   — deepest overlays
mid-gray:    #898989   — secondary text, descriptions, muted labels
light-gray:  #f5f5f5   — subtle section differentiation
link-blue:   #0099ff   — hyperlinks only
```
**No brand colors.** The palette is fully grayscale — boldness through monochrome.

### Typography
- **Display / Headings**: Cal Sans (weight 600). All `h1`–`h6` use Cal Sans via `@layer base`.
- **Body / UI**: Inter (weights 300–600).
- **Code / Mono**: Roboto Mono.
- Hero title: `font-weight: 500`
- Hero subtitle: `font-weight: 400`
- Buttons: `font-medium` (not `font-semibold` — this was explicitly corrected)

### Tailwind font size tokens
```
display-hero:     64px / 1.10 / w600
display-section:  48px / 1.10 / w600
display-feature:  24px / 1.30 / w600
display-sub:      20px / 1.20 / w600
display-card:     16px / 1.10 / w600
display-caption:  12px / 1.50 / w600
```

### Shadow / Elevation System — shadow-first, no CSS borders
```
shadow-card:      rgba(19,19,22,.7) 0 1px 5px -4px, rgba(34,42,53,.08) 0 0 0 1px, rgba(34,42,53,.04) 0 4px 8px
shadow-ring:      rgba(34,42,53,.08) 0 0 0 1px
shadow-inset-highlight: rgba(255,255,255,.15) 0 2px 0 inset
shadow-soft:      rgba(34,42,53,.05) 0 4px 8px
```
Hover on cards: elevate `shadow-card` → deeper version + `translateY(-1px)`.

### Border Radius Scale
```
sm:   4px
DEFAULT/md: 8px
lg:   12px
xl:   16px
2xl:  29px
pill: 9999px
```

### CSS Component Classes (defined in `main.css`)
- `.skill-card` — card shadow, white bg, `p-7`, no border
- `.btn-primary` — charcoal bg (#242424), white text, `inset-highlight` shadow
- `.btn-secondary` — white bg, shadow ring border
- `.badge` — pill shape, shadow ring, `text-xs font-medium text-mid-gray`
- `.badge-{category}` — all render as `bg-white text-charcoal` (grayscale by design)
- `.form-input` — shadow ring border, `rounded-md`, focus adds blue ring

---

## 3. Data Schema — `app/data/skills.json` + `app/data/skills.ts`

### Skill interface
```ts
interface Skill {
  id: string            // stable content id, string-based for future DB migration
  slug: string          // canonical URL slug, persisted in data
  addedAt: string       // editorial create date, YYYY-MM-DD
  updatedAt: string     // editorial last-update date, YYYY-MM-DD
  name: string          // English display name (e.g. 'Steve Jobs.skill')
  nameZh: string        // Chinese display name (e.g. '乔布斯.skill')
  summary: string       // English one-liner used in cards, rankings, and detail hero
  summaryZh: string     // Chinese one-liner used in cards, rankings, and detail hero
  detailIntroZh?: string  // Chinese editorial expansion for detail pages (newlines as \n\n)
  category: SkillCategory
  author: string        // GitHub username
  github: string        // Full GitHub URL, e.g. https://github.com/owner/repo
  githubStatus?: 404    // Only present if repo is confirmed 404
  stars?: number        // Updated by daily-sync CI
  tags: string[]        // lowercase kebab-case
  featured?: boolean    // true = shown in homepage featured section
}
```

### Categories (9 total)
`workplace | media | persona | relationship | celebrity | education | mystical | tool | defense`

### Helper functions (must be used everywhere for URLs)
```ts
getSkillSlug(skill: Skill): string
  // returns the persisted canonical slug

getSkillBySlug(slug: string): Skill | undefined
  // reverse lookup by persisted slug
```

### `lastSyncedAt`
Exported string constant: `export const lastSyncedAt = 'YYYY-MM-DD'`  
Updated by `scripts/sync-stars.mjs` via GitHub Actions daily cron.

### Editorial vs automation-owned fields
- Manual/editorial: `id`, `slug`, `addedAt`, `updatedAt`, names, summaries, detail intro, tags, category, featured
- Automation-owned: `stars`, top-level `lastSyncedAt`
- New records should initialize `addedAt === updatedAt`
- Later editorial changes should only move `updatedAt`

### Content field semantics
- `summary` / `summaryZh`: one-line value proposition; used in cards, ranking rows, and the detail page hero
- `detailIntroZh`: editorial expansion for the detail page; explain scenarios, value, and context instead of repeating the summary
- Do not duplicate the summary sentence inside `detailIntroZh`

---

## 4. URL & Routing Conventions

**Slug = persisted canonical field in dataset**

| Route | Pattern | Example |
|-------|---------|---------|
| Skill detail | `/skills/[slug]` | `/skills/colleague-skill` |
| Skill directory | `/skills` | — |
| Homepage | `/` | — |
| Submit | `/submit` | — |

- `[id].vue` uses `getSkillBySlug(route.params.id)` to look up skill
- All internal NuxtLinks use `` `/skills/${getSkillSlug(skill)}` ``
- Canonical, og:url, ld+json URLs all use `getSkillSlug(skill.value)`
- Sitemap: `server/routes/sitemap.xml.ts` uses `getSkillSlug`

**Old `skill.id`-based URLs are not yet 301-redirected** — potential future task.

---

## 5. Navigation Structure (AppHeader.vue)

Desktop nav order (left to right):
1. **热榜** — disabled `<span>` + "即将上线" badge (not a link yet)
2. **Skill目录** → `/skills`
3. **GitHub** → external link to project repo
4. Language switcher (zh ↔ EN)
5. **提交 Skill** button (`btn-primary`) → `/submit`

Removed: Home link, About link.  
Mobile nav mirrors desktop items.

---

## 6. README Markdown Rendering

### Composable: `useSkillReadme.ts`
- Fetches `README.md` (zh) and common EN variants (`README_EN.md`, `README.en.md`, etc.)
- Tries `main` branch first, then `master`
- `marked.use({ gfm: true, breaks: false })`
- `rewriteRelativeUrls()` rewrites relative `<img src>` to absolute `raw.githubusercontent.com` URLs

### Template usage
```vue
<div
  class="markdown-body readme-content"
  style="font-size: 13px"
  v-html="readmeHtml"
/>
```
Both classes required: `markdown-body` (triggers github-markdown-css) + `readme-content` (triggers our overrides).  
Inline `font-size: 13px` is intentional — parent `text-sm` would otherwise override `!important`.

### CSS overrides (in `main.css`)
```css
.readme-content.markdown-body {
  font-size: 13px !important;
  line-height: 1.75;
  font-weight: 450;
  color: #1a1a1a;
  background: transparent;
}
/* Code blocks: dark (#1c1c1c bg, #e8e8e8 text) */
/* Headings: Cal Sans */
/* Mono: Roboto Mono */
/* Table th: text-align: revert (allows marked's inline column-alignment styles) */
```

---

## 7. i18n Conventions

- Locale files: `i18n/locales/zh.json` and `en.json`
- Default locale: `zh` (Chinese-first product)
- `strategy: no_prefix` — no language prefix in URLs
- All new UI strings must have keys in **both** files
- Key naming: `namespace.camelCase` (e.g. `nav.trending`, `skill.starsTrendLabel`)
- Hero subtitle is **two separate keys**: `hero.subtitle1` + `hero.subtitle2`  
  (not one key — this controls line break placement)

---

## 8. CI / Automation

### Daily Star Sync
`.github/workflows/daily-sync.yml` — runs at `0 2 * * *` UTC  
Command: `node scripts/sync-stars.mjs`  
→ Fetches star counts via GitHub REST API, updates `stars: N` and `lastSyncedAt` in `skills.json`  
→ Commits back with `git push`

`scripts/sync-stars.mjs` notes:
- 200ms delay between API requests to avoid rate limiting
- Reads and writes the JSON dataset directly
- Must preserve editorial metadata such as `slug`, `addedAt`, and `updatedAt`
- Requires `GITHUB_TOKEN` env var for authenticated requests

---

## 9. SEO Conventions (detail pages)

In `[id].vue`, every skill detail page must have:
- `<title>` — `{skill.nameZh} — EverythingSkill`
- `<meta name="description">` — `skill.descriptionZh`
- `<link rel="canonical">` — `https://everythingskill.net/skills/${getSkillSlug(skill.value)}`
- `og:url` — same as canonical
- `og:title`, `og:description`, `og:image`
- `twitter:card`, `twitter:title`, `twitter:description`, `twitter:image`
- JSON-LD `SoftwareApplication` schema with `url: https://everythingskill.net/skills/${getSkillSlug(...)}`

---

## 10. Stars Trend Chart

Embedded as SVG from star-history.com API in a sidebar card on the detail page:
```
https://api.star-history.com/svg?repos={ownerRepo}&type=Date
```
`ownerRepo` is computed from `skill.value.github` via `extractOwnerRepo()`.  
Chart is hidden (`v-if`) when repo URL is not available.

---

## 11. Adding a New Skill — Checklist

1. Add entry to `app/data/skills.ts` `skills` array with all required fields
2. Set `id` to a short kebab-case identifier (this is for internal use only; URL uses `getSkillSlug`)
3. Verify `github` URL is reachable; if 404, add `githubStatus: 404`
4. Set `stars` to current count; CI will keep it updated
5. Set `featured: true` only for top-tier skills (handful per category max)
6. Fetch actual star count from GitHub before setting initial value
7. No need to update routing — it's dynamic; URL derives from repo name automatically

---

## 12. Known Gotchas

| Problem | Fix |
|---------|-----|
| CSS cascade: github-markdown-css overridden | Load it **first** in `nuxt.config.ts css` array |
| `font-size` not applying to markdown body | Use `!important` AND inline `style="font-size: 13px"` on wrapper |
| Table column alignment broken | Use `text-align: revert` on `th`, not `text-align: left` |
| Relative `<img>` URLs broken in README | `rewriteRelativeUrls()` in composable handles this |
| `<div align="center">` in README | CSS `[align="center"] { text-align: center }` needed |
| Buttons look too heavy | Use `font-medium`, not `font-semibold` |
| `@tailwindcss/typography` conflicts | **Uninstalled** — do not re-add; use github-markdown-css instead |

适用范围：所有针对 **everythingskill.net** 项目的开发工作。  
工程根目录：`/path/to/everythingskill.net`

---

## 1. 技术栈

| 层级 | 选型 |
|------|------|
| 框架 | Nuxt 3，兼容模式 v4（`future.compatibilityVersion: 4`，使用 `app/` 目录结构） |
| 样式 | Tailwind CSS v3，通过 `@nuxtjs/tailwindcss` 接入 |
| 图标 | `@nuxt/icon`，使用 Lucide 图标集，前缀 `lucide:*` |
| 字体 | `@nuxt/fonts` — Cal Sans、Inter、Roboto Mono，来源 Google Fonts |
| 国际化 | `@nuxtjs/i18n`，`strategy: no_prefix`，默认语言 `zh`，文件在 `i18n/locales/` |
| Markdown | `marked` ^18，配置 `gfm: true, breaks: false` |
| GitHub 样式 | `github-markdown-css`（light 主题） |
| TypeScript | strict 模式，Nuxt 自动导入 |

**以下依赖不得随意修改：**
- `tailwind.config.ts` — `plugins: []`（typography 插件已移除，使用 github-markdown-css 代替）
- `nuxt.config.ts` 的 `css` 数组加载顺序：`github-markdown-css` **必须在前**，`~/assets/css/main.css` 在后

---

## 2. 设计系统（Cal.com 风格）

### 颜色（tailwind.config.ts）
```
charcoal:    #242424   — 主色调：正文、按钮、标题
midnight:    #111111   — 最深遮罩色
mid-gray:    #898989   — 次要文字、说明、弱化标签
light-gray:  #f5f5f5   — 区块背景微弱区分
link-blue:   #0099ff   — 仅用于超链接
```
**无品牌色。** 整体为全灰度调色板，通过黑白对比来体现力量感。

### 字体规范
- **标题 / 展示**：Cal Sans（weight 600），所有 `h1`–`h6` 通过 `@layer base` 设置
- **正文 / UI**：Inter（weights 300–600）
- **代码 / 等宽**：Roboto Mono
- Hero 主标题：`font-weight: 500`
- Hero 副标题：`font-weight: 400`
- 按钮：`font-medium`（**不是** `font-semibold`，已明确纠正）

### Tailwind 字号 Token
```
display-hero:     64px / 行高1.10 / w600
display-section:  48px / 行高1.10 / w600
display-feature:  24px / 行高1.30 / w600
display-sub:      20px / 行高1.20 / w600
display-card:     16px / 行高1.10 / w600
display-caption:  12px / 行高1.50 / w600
```

### 阴影 / 层级系统 — 以 shadow 代替 border
```
shadow-card:      rgba(19,19,22,.7) 0 1px 5px -4px, rgba(34,42,53,.08) 0 0 0 1px, rgba(34,42,53,.04) 0 4px 8px
shadow-ring:      rgba(34,42,53,.08) 0 0 0 1px
shadow-inset-highlight: rgba(255,255,255,.15) 0 2px 0 inset
shadow-soft:      rgba(34,42,53,.05) 0 4px 8px
```
卡片 hover：加深 `shadow-card` + `translateY(-1px)`

### 圆角规格
```
sm:   4px
DEFAULT/md: 8px
lg:   12px
xl:   16px
2xl:  29px
pill: 9999px
```

### CSS 组件类（定义在 `main.css`）
- `.skill-card` — 卡片阴影，白色背景，`p-7`，无 border
- `.btn-primary` — charcoal 背景（#242424），白色文字，inset 高光阴影
- `.btn-secondary` — 白色背景，shadow ring 边框
- `.badge` — pill 形状，shadow ring，`text-xs font-medium text-mid-gray`
- `.badge-{category}` — 所有分类徽标均为 `bg-white text-charcoal`（全灰度设计）
- `.form-input` — shadow ring 边框，`rounded-md`，focus 时添加蓝色 focus ring

---

## 3. 数据结构 — `app/data/skills.ts`

### Skill 接口字段说明
```ts
interface Skill {
  id: string            // 内部 slug，kebab-case（如 'steve-jobs'）
  name: string          // 英文展示名（如 'Steve Jobs.skill'）
  nameZh: string        // 中文展示名（如 '乔布斯.skill'）
  description: string   // 英文一句话摘要
  descriptionZh: string // 中文一句话摘要
  longDescriptionZh?: string  // 中文详细描述，段落间用 \n\n 分隔
  category: SkillCategory
  author: string        // GitHub 用户名
  github: string        // 完整 GitHub URL，如 https://github.com/owner/repo
  githubStatus?: 404    // 仅在确认仓库 404 时设置
  stars?: number        // 由 CI 每日自动更新
  tags: string[]        // 全小写 kebab-case
  featured?: boolean    // true = 展示在首页精选区
}
```

### 分类（9 个）
`workplace | media | persona | relationship | celebrity | education | mystical | tool | defense`

### 辅助函数（所有 URL 必须使用这两个函数）
```ts
getSkillSlug(skill: Skill): string
  // 从 GitHub URL 提取仓库名，转小写
  // 例：github.com/titanwings/colleague-skill → 'colleague-skill'

getSkillBySlug(slug: string): Skill | undefined
  // 通过 slug 反向查找 Skill
```

### `lastSyncedAt`
导出常量字符串：`export const lastSyncedAt = 'YYYY-MM-DD'`  
由 `scripts/sync-stars.mjs` 通过 GitHub Actions 每日更新。

---

## 4. URL 与路由规范

**Slug = GitHub 仓库名（小写）**

| 页面 | 路径规则 | 示例 |
|------|---------|------|
| Skill 详情页 | `/skills/[slug]` | `/skills/colleague-skill` |
| Skill 目录页 | `/skills` | — |
| 首页 | `/` | — |
| 提交页 | `/submit` | — |

- `[id].vue` 使用 `getSkillBySlug(route.params.id)` 查找 Skill
- 所有内部 NuxtLink 使用 `` `/skills/${getSkillSlug(skill)}` ``
- canonical、og:url、ld+json 中的 URL 全部使用 `getSkillSlug(skill.value)`
- Sitemap：`server/routes/sitemap.xml.ts` 也使用 `getSkillSlug`

**注意：旧的基于 `skill.id` 的 URL 尚未做 301 重定向**，是待处理的潜在任务。

---

## 5. 导航结构（AppHeader.vue）

桌面端导航顺序（从左到右）：
1. **热榜** — 禁用的 `<span>` + "即将上线" 徽标（暂无链接）
2. **Skill目录** → `/skills`
3. **GitHub** → 外链项目仓库
4. 语言切换器（zh ↔ EN）
5. **提交 Skill** 按钮（`btn-primary`）→ `/submit`

已移除：首页链接、关于链接。  
移动端导航与桌面端保持一致。

---

## 6. README Markdown 渲染

### Composable：`useSkillReadme.ts`
- 获取 `README.md`（中文）以及常见英文变体（`README_EN.md`、`README.en.md` 等）
- 优先尝试 `main` 分支，失败则尝试 `master`
- `marked.use({ gfm: true, breaks: false })`
- `rewriteRelativeUrls()` 将相对路径 `<img src>` 重写为绝对 `raw.githubusercontent.com` URL

### 模板中的用法
```vue
<div
  class="markdown-body readme-content"
  style="font-size: 13px"
  v-html="readmeHtml"
/>
```
两个 class 缺一不可：`markdown-body`（触发 github-markdown-css）+ `readme-content`（触发我们的覆盖样式）。  
内联 `style="font-size: 13px"` 是故意的——父级 `text-sm` 会覆盖 `!important`，需要双重保险。

### CSS 覆盖（在 `main.css` 中）
```css
.readme-content.markdown-body {
  font-size: 13px !important;
  line-height: 1.75;
  font-weight: 450;
  color: #1a1a1a;
  background: transparent;
}
/* 代码块：深色背景（#1c1c1c 底色，#e8e8e8 文字） */
/* 标题：Cal Sans */
/* 等宽字体：Roboto Mono */
/* 表格 th：text-align: revert（保留 marked 生成的列对齐内联样式） */
```

---

## 7. 国际化（i18n）规范

- 语言文件：`i18n/locales/zh.json` 和 `en.json`
- 默认语言：`zh`（产品以中文为主）
- `strategy: no_prefix` — URL 中无语言前缀
- 所有新增 UI 文字必须在**两个**语言文件中同步添加
- Key 命名：`命名空间.camelCase`（如 `nav.trending`、`skill.starsTrendLabel`）
- Hero 副标题拆分为**两个独立 key**：`hero.subtitle1` + `hero.subtitle2`  
  （不能合并为一个 key——这样拆分是为了精确控制换行位置）

---

## 8. CI / 自动化

### 每日 Stars 同步
`.github/workflows/daily-sync.yml` — 每天 UTC 02:00 执行  
命令：`node scripts/sync-stars.mjs`  
→ 通过 GitHub REST API 获取 star 数，更新 `skills.ts` 中的 `stars: N` 和 `lastSyncedAt`  
→ 自动 commit 并 `git push`

`scripts/sync-stars.mjs` 注意事项：
- 每次请求间隔 200ms，避免触发 GitHub API 频率限制
- 用正则匹配 `github:` 和 `stars:` 字段的相邻关系来原地更新
- 需要 `GITHUB_TOKEN` 环境变量

---

## 9. SEO 规范（详情页）

`[id].vue` 中每个 Skill 详情页必须包含：
- `<title>` — `{skill.nameZh} — EverythingSkill`
- `<meta name="description">` — `skill.descriptionZh`
- `<link rel="canonical">` — `https://everythingskill.net/skills/${getSkillSlug(skill.value)}`
- `og:url` — 同 canonical
- `og:title`、`og:description`、`og:image`
- `twitter:card`、`twitter:title`、`twitter:description`、`twitter:image`
- JSON-LD `SoftwareApplication` schema，其中 `url` 使用 `getSkillSlug(...)`

---

## 10. Stars 趋势图

在详情页侧边栏以 SVG 形式嵌入，来源为 star-history.com API：
```
https://api.star-history.com/svg?repos={ownerRepo}&type=Date
```
`ownerRepo` 通过 `extractOwnerRepo()` 从 `skill.value.github` 中计算得出。  
当仓库 URL 不可用时，图表通过 `v-if` 隐藏。

---

## 11. 新增 Skill 操作清单

1. 在 `app/data/skills.ts` 的 `skills` 数组中添加完整条目
2. `id` 设为短 kebab-case 标识符（仅供内部使用，URL 使用 `getSkillSlug` 结果）
3. 验证 `github` URL 可访问；若 404，添加 `githubStatus: 404`
4. `stars` 设为当前 star 数；CI 会自动保持更新
5. `featured: true` 仅用于顶级精选 Skill（每个分类不超过少数几个）
6. 添加前先从 GitHub 获取真实 star 数
7. 无需修改路由 — 路由是动态的，URL 自动从仓库名派生

---

## 12. 已知坑

| 问题 | 解决方案 |
|------|---------|
| CSS 层叠：github-markdown-css 被覆盖 | 在 `nuxt.config.ts css` 数组中**第一个**加载 |
| `font-size` 样式对 markdown body 不生效 | 同时用 `!important` 和 `style="font-size: 13px"` 内联双重保险 |
| 表格列对齐失效 | `th` 用 `text-align: revert`，不要写 `text-align: left` |
| README 中相对路径图片无法显示 | composable 里的 `rewriteRelativeUrls()` 负责处理 |
| README 中 `<div align="center">` 不生效 | CSS 添加 `[align="center"] { text-align: center }` |
| 按钮文字偏重 | 用 `font-medium`，不要用 `font-semibold` |
| `@tailwindcss/typography` 冲突 | **已卸载** — 禁止重新安装，使用 github-markdown-css 代替 |
