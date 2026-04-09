# EverythingSkill.net — 项目规范（中文版）

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
  id: string            // 稳定内容标识，保持字符串，便于未来接数据库
  slug: string          // 持久化的 canonical URL slug
  addedAt: string       // 人工录入时间，格式 YYYY-MM-DD
  updatedAt: string     // 人工最后更新时间，格式 YYYY-MM-DD
  name: string          // 英文展示名（如 'Steve Jobs.skill'）
  nameZh: string        // 中文展示名（如 '乔布斯.skill'）
  summary: string       // 英文一句话摘要，用于卡片/榜单/详情页首屏
  summaryZh: string     // 中文一句话摘要，用于卡片/榜单/详情页首屏
  detailIntroZh?: string  // 中文详情导语，用于详情页展开说明，段落间用 \n\n 分隔
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
  // 返回数据中持久化保存的 canonical slug

getSkillBySlug(slug: string): Skill | undefined
  // 通过持久化 slug 反向查找 Skill
```

### `lastSyncedAt`
导出常量字符串：`export const lastSyncedAt = 'YYYY-MM-DD'`  
由 `scripts/sync-stars.mjs` 通过 GitHub Actions 每日更新。

### 人工字段与自动同步字段
- 人工维护：`id`、`slug`、`addedAt`、`updatedAt`、名称、摘要、详情导语、标签、分类、`featured`
- 自动同步：`stars`、顶层 `lastSyncedAt`
- 新增记录时，`addedAt` 与 `updatedAt` 初始应相同
- 后续人工编辑内容时，只更新 `updatedAt`，不要改 `addedAt`

### 内容字段语义
- `summary` / `summaryZh`：一句话价值摘要，用于卡片、榜单、详情页首屏
- `detailIntroZh`：详情页展开导语，写场景、价值、背景，不要重复摘要原句
- `detailIntroZh` 负责“为什么值得看”，`summaryZh` 负责“它是什么”

---

## 4. URL 与路由规范

**Slug = 数据集中持久化保存的 canonical 字段**

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
→ 通过 GitHub REST API 获取 star 数，更新 `skills.json` 中的 `stars: N` 和顶层 `lastSyncedAt`  
→ 自动 commit 并 `git push`

`scripts/sync-stars.mjs` 注意事项：
- 每次请求间隔 200ms，避免触发 GitHub API 频率限制
- 直接读取并写回 JSON 数据集
- 必须保留 `slug`、`addedAt`、`updatedAt` 这类人工维护字段
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
