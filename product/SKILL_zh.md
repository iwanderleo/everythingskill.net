# EverythingSkill.net — 项目规范

在开发 EverythingSkill.net 时使用本规范。

## 1. 技术栈

| 层级 | 选型 |
|------|------|
| 框架 | Nuxt 3，兼容模式 v4，使用 `app/` 目录结构 |
| 样式 | Tailwind CSS |
| 图标 | `@nuxt/icon`，Lucide 图标集 |
| 字体 | Cal Sans、Inter、Roboto Mono |
| 国际化 | `@nuxtjs/i18n`，`prefix_except_default` |
| Markdown | `marked` + `github-markdown-css` |
| TypeScript | strict 模式 |

保留 `nuxt.config.ts` 中的 CSS 加载顺序：先 `github-markdown-css`，后 `~/assets/css/main.css`。

## 2. 产品规则

- 英文默认路由是 `/`。
- 中文路由在 `/zh`。
- 这是开源 AI Skill 聚合目录，不是 Skill 执行平台。
- 站点外链应指向公开 GitHub 仓库和公开 X 账号。
- 对外文档不要出现本机路径、内网信息、个人私有流程备注。

## 3. 数据模型

权威数据源是 `app/data/skills.json`。

Skill 的核心人工字段包括：

- `id`
- `slug`
- `addedAt`
- `updatedAt`
- `name` / `nameZh`
- `summary` / `summaryZh`
- `detailIntroZh`
- `category`、`author`、`github`、`tags`、`featured`

自动维护字段：

- `stars`
- 顶层 `lastSyncedAt`

所有 Skill URL 和查找都必须使用 `app/data/skills.ts` 里的 `getSkillSlug()` 与 `getSkillBySlug()`。

## 4. 路由约定

- 首页：`/`
- 中文首页：`/zh`
- Skill 目录：`/skills`
- 中文 Skill 目录：`/zh/skills`
- Skill 详情：`/skills/[slug]`
- 提交页：`/submit`
- 榜单页：`/rankings/hot`、`/rankings/new`

内部链接必须通过 `useLocalePath()` 或 `useSwitchLocalePath()` 生成，不能重新写死英文无前缀路径。

## 5. SEO 规则

`app/layouts/default.vue` 负责统一输出多语言 SEO 头信息。

必须保持：

- 语言对应的 canonical
- `hreflang`：`en`、`zh-CN`、`x-default`
- 正确的 `html lang`
- locale-aware 的 `og:url`
- `server/routes/sitemap.xml.ts` 中的双语 alternate sitemap

不要重新加回忽略语言前缀的全局静态 canonical。

## 6. README 渲染

`app/composables/useSkillReadme.ts` 负责：

- 获取 `README.md` 与常见英文变体
- 优先尝试 `main`，再尝试 `master`
- 将相对图片路径改写为 `raw.githubusercontent.com` 绝对路径

渲染容器需要同时保留：

- `markdown-body`
- `readme-content`

## 7. 国际化规范

- 语言文件在 `i18n/locales/en.json` 和 `i18n/locales/zh.json`
- 新增 UI 文案必须双语同步
- Key 命名保持命名空间 + camelCase
- 页面 SEO 文案也要随语言切换，而不只是界面文本切换

## 8. 自动化

每日同步工作流位于 `.github/workflows/daily-sync.yml`，当前写回 `dev` 分支。

`scripts/sync-stars.mjs` 必须：

- 保留人工维护字段
- 顺序获取 stars，避免触发限流
- 只从环境变量或 GitHub Actions secrets 读取 `GITHUB_TOKEN`

## 9. 开源隐私要求

- 不提交本机绝对路径
- 不提交 token、cookie、内网地址
- 凭据示例只用占位符
- 发版前确保文档与当前路由、SEO 实现一致

## 10. 常见注意点

- `github-markdown-css` 的加载顺序很重要
- README 包裹层的 `font-size: 13px` 是故意的
- README 相对资源路径必须改写
- 多语言页面不能写死非 locale-aware 的内部链接
