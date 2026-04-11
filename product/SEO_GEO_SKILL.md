# EverythingSkill.net — SEO / GEO Skill

Use this skill when working on search engine optimization or generative engine optimization (GEO) for everythingskill.net.

## 1. Site Identity

- **Domain**: everythingskill.net
- **Type**: Open-source AI Skill directory
- **Primary locale**: `en` (at `/`)
- **Secondary locale**: `zh-CN` (at `/zh`)
- **Core concept**: `.skill` files — structured plain-text AI prompt files that distill a person's thinking patterns, knowledge, and communication style

## 2. SEO Architecture

### Canonical + hreflang (in `app/layouts/default.vue`)

- Every page emits a locale-specific `rel=canonical`
- `hreflang=en`, `hreflang=zh-CN`, `hreflang=x-default` on every page
- `html[lang]` switches with locale

### Sitemap (`server/routes/sitemap.xml.ts`)

- `https://everythingskill.net/sitemap.xml`
- Static pages: `/`, `/skills`, `/about`, `/submit`, `/rankings/hot`, `/rankings/new`
- Dynamic skill pages: `/skills/[slug]` (one entry per skill × 2 locales)
- Each URL includes `<xhtml:link>` alternates for both locales

### robots.txt

```
User-agent: *
Allow: /
Sitemap: https://everythingskill.net/sitemap.xml
```

### Structured Data (JSON-LD)

| Page | Schema type |
|------|------------|
| Homepage | `WebSite` + `SearchAction` |
| Skill detail | `SoftwareApplication` |
| Other pages | None currently |

## 3. Known Issues (as of 2026-04-11)

| Severity | Issue |
|----------|-------|
| 🔴 High | `nuxt.config.ts` fallback description hardcodes "42 个 Skill" — site now has 80 |
| 🟡 Medium | No `Organization` schema — LLMs/AI search have no structured entity anchor for the site |
| 🟡 Medium | No `FAQPage` schema on homepage — GEO loses the "What is a .skill file?" answer surface |
| 🟡 Medium | No `ItemList` schema on `/skills` — AI engines can't enumerate the directory |
| 🟡 Medium | `about.vue` is missing `og:description` meta |
| 🟠 Low | `twitter:site` and `twitter:creator` tags missing |
| 🟠 Low | Global fallback `keywords` meta in `nuxt.config.ts` is outdated / thin |

## 4. GEO Principles for this Site

**GEO** = making content easily parseable and citable by LLM-based search (Perplexity, ChatGPT Search, Google AI Overviews, etc.).

Tactics that matter here:

1. **Entity clarity**: One clear `Organization` or `WebSite` JSON-LD with `name`, `url`, `description`, `sameAs` (GitHub, X)
2. **FAQ schema**: Answers to "What is a .skill file?" surface directly in AI answers
3. **ItemList schema**: Lets AI engines enumerate featured or top skills in a structured way
4. **Concise page descriptions**: Each meta description should be answerable as a standalone sentence
5. **Consistent terminology**: Always use `.skill file` (with the dot) as the primary entity name

## 5. Page-level SEO Checklist

For each page, verify:
- [ ] `<title>` unique and descriptive (< 60 chars)
- [ ] `meta description` present and locale-specific (120–160 chars)
- [ ] `og:title`, `og:description`, `og:url`, `og:image` all set
- [ ] `canonical` matches the current locale URL
- [ ] `hreflang` emitted (handled globally by `default.vue`)
- [ ] Appropriate JSON-LD block present

## 6. What Not to Do

- Do not add a static global canonical in `nuxt.config.ts` — it will override locale-aware canonicals
- Do not put live skill counts in static fallback meta — use dynamic computed values in page `useHead()`
- Do not add `noindex` to any crawlable page
- Do not duplicate `hreflang` — `default.vue` already handles it globally
