# EverythingSkill.net

EverythingSkill.net is an open-source directory for discovering AI `.skill` projects on GitHub. It curates community-made skills into a bilingual library, adds structured metadata, and turns scattered repos into a searchable, linkable catalog.

[Live site](https://everythingskill.net) • [X](https://x.com/iwanderleo) • [MIT License](LICENSE)

## Preview

![EverythingSkill preview](public/og-image.png)

## Why This Exists

The `.skill` ecosystem is fragmented across personal repos, trend threads, and community lists. This project gives those skills a cleaner home:

- browseable category pages
- locale-aware detail pages
- curated metadata in English and Chinese
- canonical URLs, `hreflang`, and bilingual sitemap output
- GitHub star syncing for lightweight ranking signals

## Highlights

- English default routing at `/` and Chinese routing at `/zh`
- Skill detail pages that fetch and render upstream GitHub README files
- daily GitHub star sync through GitHub Actions
- generated favicon, app icon, and social preview asset set
- open dataset driven by `app/data/skills.json`

## Tech Stack

- Nuxt 3
- Vue 3
- Tailwind CSS
- `@nuxtjs/i18n`
- `@nuxt/icon`
- `@nuxt/fonts`
- `marked` + `github-markdown-css`

## Local Development

Install dependencies:

```bash
npm install
```

Run the dev server:

```bash
npm run dev
```

Build for production:

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```

## Project Structure

```text
app/                   Nuxt app source
app/data/skills.json   Curated skill dataset
i18n/locales/          English and Chinese UI copy
public/                Icons, manifest, OG, and social assets
scripts/               Project automation scripts
server/routes/         Sitemap and server routes
product/               Product docs and internal project guidance
```

## Data And Routing

The catalog is driven by `app/data/skills.json`.

Each skill record includes:

- stable `id`
- canonical `slug`
- English and Chinese names
- English and Chinese summaries
- author, tags, category, and GitHub source URL
- optional `stars` maintained by automation

Routing and lookups are built around persisted slugs via `getSkillSlug()` and `getSkillBySlug()` in `app/data/skills.ts`.

## SEO And Social

The site currently ships:

- locale-aware canonical URLs
- `hreflang` for `en`, `zh-CN`, and `x-default`
- bilingual sitemap entries with alternates
- generated favicon, Apple touch icon, Android icons, and manifest
- OG and Twitter preview images under `public/`

## Automation

`.github/workflows/daily-sync.yml` can run on schedule or manually.

It:

- fetches GitHub star counts for curated repos
- updates `app/data/skills.json`
- commits and pushes the refreshed dataset back to the target branch

## Product Docs

Project direction and repo-specific instructions live in `product/`:

- `product/readme.md`
- `product/SKILL.md`
- `product/SKILL_zh.md`

## Contributing

Contributions are useful in these areas:

- adding or correcting skill entries
- improving localization quality
- refining SEO and social previews
- polishing the browse and submission experience

If you edit dataset entries, preserve editorial fields and avoid overwriting automation-owned fields unless that is intentional.

## License

This project is released under the MIT License. See `LICENSE`.
