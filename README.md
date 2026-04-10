# EverythingSkill.net

EverythingSkill.net is an open-source directory for discovering AI `.skill` projects on GitHub. It curates community-made skills, organizes them into browseable categories, and provides bilingual product pages with localized SEO.

Live site: [everythingskill.net](https://everythingskill.net)
Project repository: [github.com/iwanderleo/everythingskill.net](https://github.com/iwanderleo/everythingskill.net)

## What This Project Does

- Aggregates open-source `.skill` repositories into a structured catalog
- Supports English as the default locale at `/` and Chinese at `/zh`
- Generates locale-aware canonical URLs, `hreflang`, and sitemap entries
- Pulls GitHub README content for each skill detail page
- Syncs repository star counts automatically with GitHub Actions

## Current Stack

- Nuxt 3
- Vue 3
- Tailwind CSS
- `@nuxtjs/i18n` for bilingual routing
- `@nuxt/icon` and `@nuxt/fonts`
- `marked` + `github-markdown-css` for README rendering

## Local Development

Install dependencies:

```bash
npm install
```

Start the dev server:

```bash
npm run dev
```

Build for production:

```bash
npm run build
```

Preview the production build locally:

```bash
npm run preview
```

## Project Structure

```text
app/                   Nuxt app source
app/data/skills.json   Curated skill dataset
i18n/locales/          English and Chinese UI copy
public/                Favicon, manifest, OG, and social assets
scripts/               Project automation scripts
server/routes/         Sitemap and server routes
product/               Product docs and project skill instructions
```

## Data Model

The catalog is driven by `app/data/skills.json`.

Each skill record includes:

- stable `id`
- canonical `slug`
- English and Chinese names
- English and Chinese summary copy
- category, tags, author, and source GitHub URL
- optional star count from the sync workflow

Routing and lookups are built around persisted slugs via `getSkillSlug()` and `getSkillBySlug()` in `app/data/skills.ts`.

## Internationalization And SEO

The site is configured for multilingual SEO:

- English default routes use unprefixed URLs like `/skills`
- Chinese routes use `/zh/...`
- runtime head output includes canonical, `hreflang`, `x-default`, and locale-specific `html lang`
- `server/routes/sitemap.xml.ts` emits bilingual URLs with alternate links
- social assets and app icons are generated under `public/`

## Automation

The workflow at `.github/workflows/daily-sync.yml` runs daily and can also be triggered manually.

It:

- fetches GitHub star counts for the curated repositories
- updates `app/data/skills.json`
- commits and pushes changes back to the target branch

## Product Docs

Project-specific planning and working docs live in `product/`:

- `product/readme.md` for product direction
- `product/SKILL.md` for the English project skill document
- `product/SKILL_zh.md` for the Chinese project skill document

## Contributing

Contributions are welcome, especially in these areas:

- adding or correcting skill entries
- improving localization quality
- refining SEO and social previews
- polishing UI, filtering, and submission flows

If you contribute data changes, keep editorial fields stable and avoid overwriting automation-owned fields unless that is the point of the change.

## Notes

- This repository currently does not include a license file.
- The daily star sync workflow targets the `dev` branch.
