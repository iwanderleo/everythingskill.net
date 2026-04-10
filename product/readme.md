# EverythingSkill.net — Product Readme

## 产品定位

EverythingSkill.net 是一个开源 AI Skill 目录站，用来收集、整理、展示 GitHub 上分散的 `.skill` 项目，并通过统一的数据结构、双语页面和 SEO 规范提升可发现性。

当前产品不是 Skill 执行器，而是一个：

- 开源 Skill 聚合入口
- 双语内容目录
- GitHub README 展示层
- 轻量榜单与发现工具

## 当前版本

当前线上版本已经具备：

- 英文默认站点 `/`
- 中文站点 `/zh`
- Skill 目录页、详情页、关于页、提交页
- 热榜 / 新榜页面
- GitHub README 抓取与渲染
- GitHub stars 自动同步
- locale-aware canonical、`hreflang`、sitemap
- 一套完整的 favicon / app icon / OG / Twitter 资产

## 用户价值

对访客：

- 更快找到高质量 `.skill` 项目
- 理解每个 Skill 的定位、来源、分类与 README 内容
- 在英文和中文之间自然切换

对创作者：

- 获得额外曝光入口
- 让项目以更结构化方式被索引和发现
- 通过目录化展示降低传播成本

## 信息架构

- 首页：品牌、概念、精选 Skill、分类入口
- Skill 目录：按分类筛选、搜索全部条目
- Skill 详情：基础信息、README、stars 趋势、跳转源仓库
- 榜单页：按 stars 和收录时间发现项目
- About：项目背景和产品解释
- Submit：提交入口和审核说明

## 数据策略

权威数据源：`app/data/skills.json`

设计原则：

- Skill 的 `slug` 持久化保存，不再从 GitHub URL 临时推导
- 编辑字段与自动同步字段严格分离
- 手工维护名称、摘要、分类、标签、时间戳
- 自动同步 stars 和 `lastSyncedAt`

## SEO 策略

当前 SEO 方案已经是多语言成套实现，而不是只加一个 `/zh` 路径：

- 英文默认根路径，中文使用 `/zh`
- 每个页面输出 locale-aware canonical
- 输出 `hreflang=en`、`hreflang=zh-CN`、`x-default`
- `html lang` 随语言切换
- sitemap 为双语 URL，并带 alternate links
- 社交分享图与浏览器图标统一托管在 `public/`

## 开源策略

仓库现在面向公开协作，要求：

- 文档不出现本机绝对路径
- 不提交个人敏感信息、token、cookie、私有链接
- 示例凭据只用占位符
- 对外文档优先解释产品和结构，而不是个人工作习惯

## 接下来最值得做的事情

### 1. 数据与发现

- 提升提交流程，从静态表单走向真实贡献工作流
- 增加更多结构化筛选能力
- 给 Skill 增加更稳定的质量信号

### 2. 详情页增强

- 支持 locale-aware 的社交分享图
- 增加更多仓库元数据展示
- 优化 README 复杂内容的渲染体验

### 3. 社区能力

- 设计提交审核机制
- 增加创作者归属与引用说明
- 明确收录标准和拒绝标准

## 成功标准

- 新访客能在几秒内理解站点用途
- 搜索引擎能清楚区分英文与中文页面
- 每个 Skill 页面都能稳定指向源仓库并展示 README
- 数据与文档可以在开源协作下持续维护
