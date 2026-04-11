/**
 * scripts/sync-stars.mjs
 *
 * Fetches the current star count for every skill in skills.json from the
 * GitHub REST API and writes the updated values + lastSyncedAt date back
 * to the JSON dataset in-place.
 *
 * This script must not rewrite editorial metadata such as slug, addedAt,
 * or updatedAt.
 *
 * Usage:
 *   GITHUB_TOKEN=YOUR_GITHUB_TOKEN node scripts/sync-stars.mjs
 */

import { readFileSync, writeFileSync } from 'fs'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

const __dirname = dirname(fileURLToPath(import.meta.url))
const SKILLS_FILE = join(__dirname, '../app/data/skills.json')
const TOKEN = process.env.GITHUB_TOKEN

async function fetchStars(ownerRepo) {
  const url = `https://api.github.com/repos/${ownerRepo}`
  const headers = {
    Accept: 'application/vnd.github+json',
    'X-GitHub-Api-Version': '2022-11-28',
    ...(TOKEN ? { Authorization: `Bearer ${TOKEN}` } : {}),
  }
  const res = await fetch(url, { headers })
  if (!res.ok) return null
  const data = await res.json()
  return data.stargazers_count ?? null
}

/**
 * Detect which README language variants exist in a repo.
 * Returns an array of locale codes, e.g. ['zh', 'en', 'ja'].
 *
 * Convention used:
 *   README.md       → 'zh'  (default / primary language of most skill repos)
 *   README_EN.md    → 'en'
 *   README_ZH.md    → 'zh'  (explicit zh variant, used when README.md is EN)
 *   README_JA.md    → 'ja'
 *   README_KO.md    → 'ko'
 *   README_FR.md    → 'fr'
 *   README_DE.md    → 'de'
 *   README_ES.md    → 'es'
 *   README_PT.md    → 'pt'
 *   README_RU.md    → 'ru'
 *
 * README.md is included only when no explicit zh/en variant replaces it.
 */
async function detectReadmeLocales(ownerRepo) {
  const headers = {
    Accept: 'application/vnd.github+json',
    'X-GitHub-Api-Version': '2022-11-28',
    ...(TOKEN ? { Authorization: `Bearer ${TOKEN}` } : {}),
  }

  // Map of locale → candidate filenames (first match wins)
  const localeFiles = [
    { locale: 'zh', files: ['README_ZH.md', 'README_zh.md', 'README.zh.md', 'README-ZH.md'] },
    { locale: 'en', files: ['README_EN.md', 'README_en.md', 'README.en.md', 'README-EN.md'] },
    { locale: 'ja', files: ['README_JA.md', 'README_ja.md', 'README.ja.md'] },
    { locale: 'ko', files: ['README_KO.md', 'README_ko.md'] },
    { locale: 'fr', files: ['README_FR.md', 'README_fr.md'] },
    { locale: 'de', files: ['README_DE.md', 'README_de.md'] },
    { locale: 'es', files: ['README_ES.md', 'README_es.md'] },
    { locale: 'pt', files: ['README_PT.md', 'README_pt.md'] },
    { locale: 'ru', files: ['README_RU.md', 'README_ru.md'] },
  ]

  const detected = {}

  // Check all explicit variant files via GitHub Contents API (single call per repo)
  for (const branch of ['main', 'master']) {
    const url = `https://api.github.com/repos/${ownerRepo}/contents/`
    const res = await fetch(`${url}?ref=${branch}`, { headers })
    if (!res.ok) continue
    const files = await res.json()
    if (!Array.isArray(files)) continue

    const fileNames = new Set(files.map(f => f.name))

    // Check root README.md exists (always include as fallback locale 'default')
    const hasDefaultReadme = fileNames.has('README.md')

    // Detect explicit locale variants
    for (const { locale, files: candidates } of localeFiles) {
      if (detected[locale]) continue
      for (const fname of candidates) {
        if (fileNames.has(fname)) {
          detected[locale] = fname
          break
        }
      }
    }

    // If no explicit 'zh' variant found but README.md exists, treat it as 'zh'
    // (most skill repos in this directory are Chinese-first)
    if (!detected.zh && !detected.en && hasDefaultReadme) {
      detected.zh = 'README.md'
    }
    else if (!detected.zh && hasDefaultReadme && !detected.en) {
      detected.zh = 'README.md'
    }
    else if (hasDefaultReadme && !detected.zh && !detected.en) {
      detected.zh = 'README.md'
    }
    // If README.md exists but we only found 'en' explicit variant, README.md = 'zh'
    if (hasDefaultReadme && detected.en && !detected.zh) {
      detected.zh = 'README.md'
    }
    // If README.md exists but we only found 'zh' explicit variant, README.md is redundant — skip
    // (README_ZH.md takes priority)

    break // success, no need to try master
  }

  return Object.keys(detected).sort()
}

function extractOwnerRepo(githubUrl) {
  const m = githubUrl.match(/github\.com\/([^/]+\/[^/]+?)(?:\.git)?$/)
  return m ? m[1] : null
}

async function main() {
  const content = readFileSync(SKILLS_FILE, 'utf8')
  const data = JSON.parse(content)

  const repos = data.skills
    .map(skill => ({
      github: skill.github,
      ownerRepo: extractOwnerRepo(skill.github),
    }))
    .filter(repo => repo.ownerRepo)

  // Deduplicate
  const unique = [...new Map(repos.map(r => [r.ownerRepo, r])).values()]

  // Fetch stars + readme locales for each repo (sequentially to avoid rate limiting)
  const starsMap = {}
  const localesMap = {}
  for (const { ownerRepo } of unique) {
    console.log(`Fetching ${ownerRepo}…`)
    const [stars, locales] = await Promise.all([
      fetchStars(ownerRepo),
      detectReadmeLocales(ownerRepo),
    ])
    starsMap[ownerRepo] = stars
    localesMap[ownerRepo] = locales
    await new Promise(r => setTimeout(r, 300))
  }

  const today = new Date().toISOString().slice(0, 10)
  data.skills = data.skills.map(skill => {
    const ownerRepo = extractOwnerRepo(skill.github)
    if (!ownerRepo) return skill
    const stars = starsMap[ownerRepo]
    const readmeLocales = localesMap[ownerRepo]
    const updated = { ...skill }
    if (stars != null) updated.stars = stars
    if (readmeLocales && readmeLocales.length > 0) updated.readmeLocales = readmeLocales
    return updated
  })
  data.lastSyncedAt = today

  writeFileSync(SKILLS_FILE, `${JSON.stringify(data, null, 2)}\n`, 'utf8')
  console.log(`✓ Synced ${unique.length} repos. lastSyncedAt = ${today}`)
}

main().catch(err => {
  console.error(err)
  process.exit(1)
})
