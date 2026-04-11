# EverythingSkill.net — Project Skill

Use this project skill whenever you work on the EverythingSkill.net repository.

## 1. Stack

| Layer | Choice |
|-------|--------|
| Framework | Nuxt 3 with compatibility v4 and `app/` layout |
| Styling | Tailwind CSS via `@nuxtjs/tailwindcss` |
| Icons | `@nuxt/icon` with Lucide |
| Fonts | Cal Sans, Inter, Roboto Mono via `@nuxt/fonts` |
| i18n | `@nuxtjs/i18n` with `prefix_except_default` |
| Markdown | `marked` + `github-markdown-css` |
| TypeScript | strict mode |

Keep `github-markdown-css` before `~/assets/css/main.css` in `nuxt.config.ts`.

## 2. Product Rules

- English is the default locale at `/`.
- Chinese lives under `/zh`.
- The site is an open-source AI skill directory, not a skill execution product.
- External project links should point to the public repo and public X profile.
- Avoid adding machine-specific paths, local environment notes, or private workflow details to public docs.

## 3. Data Model

The canonical dataset is `app/data/skills.json`.

Each skill uses persisted editorial fields:

- `id`
- `slug`
- `addedAt`
- `updatedAt`
- `name` / `nameZh`
- `summary` / `summaryZh`
- optional `detailIntroZh`
- `category`, `author`, `github`, `tags`, `featured`

Automation-owned fields:

- `stars`
- top-level `lastSyncedAt`

Use `getSkillSlug()` and `getSkillBySlug()` from `app/data/skills.ts` for all skill URLs and lookups.

## 4. Routing

- Homepage: `/`
- Chinese homepage: `/zh`
- Skill library: `/skills`
- Chinese skill library: `/zh/skills`
- Skill detail: `/skills/[slug]`
- Submit page: `/submit`
- Rankings: `/rankings/hot`, `/rankings/new`

All internal links must be locale-aware through `useLocalePath()` or `useSwitchLocalePath()`.

## 5. SEO

The site explicitly emits locale-aware SEO metadata in `app/layouts/default.vue`.

Required behavior:

- locale-specific canonical URL
- `hreflang` for `en`, `zh-CN`, and `x-default`
- correct `html lang`
- locale-specific `og:url`
- sitemap alternates from `server/routes/sitemap.xml.ts`

Do not reintroduce static global canonical tags that ignore locale.

## 6. README Rendering

`app/composables/useSkillReadme.ts`:

- fetches `README.md` plus common English variants
- tries `main` first, then `master`
- rewrites relative image paths to `raw.githubusercontent.com`

Template wrappers must keep both classes:

- `markdown-body`
- `readme-content`

## 7. i18n Rules

- Locale files live in `i18n/locales/en.json` and `i18n/locales/zh.json`.
- New UI strings must be added to both files.
- Keep key naming under namespaced camelCase.
- Prefer localized page metadata, not only localized visible text.

## 8. Automation

The daily sync workflow lives in `.github/workflows/daily-sync.yml` and currently updates the `dev` branch.

`scripts/sync-stars.mjs` must:

- preserve editorial metadata
- update stars sequentially to avoid rate limiting
- use `GITHUB_TOKEN` only from environment or GitHub Actions secrets

## 9. Open-source Hygiene

- Do not commit local absolute paths.
- Do not commit private tokens, cookies, or internal URLs.
- Use placeholder examples for credentials.
- Keep docs aligned with current routing and SEO behavior before release.

## 10. Common Gotchas

- `github-markdown-css` load order matters.
- `font-size: 13px` on README wrappers is intentional.
- Relative README asset URLs must be rewritten.
- Locale-aware links should not hard-code unprefixed routes.

## 11. UI Design System

Every new page must follow these conventions. Violations cause dark-mode breakage, visual inconsistency, and bad SEO.

### Page Wrapper

Every content page root must be `<div class="bg-white">`. Dark mode is handled globally:

```css
html[data-theme='dark'] .bg-white { background-color: var(--surface-bg) !important; }
```

### Page Spacing

Use `py-section` (80px) for vertical padding. Never use `py-12`, `py-16`, or arbitrary values.

### Max Width

| Context | Class |
|---------|-------|
| Full-width library / skill grid | `max-w-container` (1200px) |
| Two-column content pages (with sidebar) | `max-w-5xl` |
| Narrow editorial / single-column | `max-w-3xl` |

### Cards and Panels

`skill-card` is the universal card component for all regular pages. Example: `skill-card p-5` or `skill-card p-6`.

`detail-panel`, `detail-panel-soft`, `detail-step-dot`, and `detail-copy` are **only** for `app/pages/skills/[id].vue`. Never use them on other pages.

### Step Numbers

```html
<span class="w-6 h-6 rounded-full bg-mid-gray/10 flex items-center justify-center text-[11px] font-semibold text-charcoal">
  1
</span>
```

### Typography

```
h1: font-display text-display-section text-charcoal  style="line-height: 1.10;"
h2: font-display text-display-feature text-charcoal mb-4  style="line-height: 1.30;"
body: text-mid-gray  style="font-weight: 300; line-height: 1.50;"   (use 1.75 or 1.80 for long reads)
back links: text-sm text-mid-gray hover:text-charcoal
```

Never use `detail-copy` as a text color class on non-detail pages — use `text-mid-gray` directly.

### SEO

Use `useHead(computed(() => ({ title, meta, script })))` — **not** `useSeoMeta()`.

Do **not** set canonical or hreflang in page components. The `default.vue` layout handles these via `switchLocalePath()`.

Canonical URL helper pattern:

```ts
const pageUrl = computed(() => `https://everythingskill.net${localePath('/your-page')}`)
```

### Code Blocks

```html
<pre class="code-preview rounded-xl px-5 py-4 font-mono text-sm overflow-x-auto text-charcoal">
```

### Internal Links

Always use `useLocalePath()` for internal navigation. Never hard-code `/path` without locale awareness.
