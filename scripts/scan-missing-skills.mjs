/**
 * scripts/scan-missing-skills.mjs
 *
 * Fetches the awesome-persona-distill-skills README from GitHub,
 * extracts all repo URLs, and compares them against our skills.json.
 * Writes a JSON file listing repos that are not yet in our database.
 *
 * Usage:
 *   node scripts/scan-missing-skills.mjs
 *   GITHUB_TOKEN=xxx node scripts/scan-missing-skills.mjs
 */

import { readFileSync, writeFileSync } from 'fs'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

const __dirname = dirname(fileURLToPath(import.meta.url))
const SKILLS_FILE = join(__dirname, '../app/data/skills.json')
const ARCHIVED_FILE = join(__dirname, '../app/data/archived-skills.json')
const OUTPUT_FILE = join(__dirname, '../missing-skills.generated.json')
const TOKEN = process.env.GITHUB_TOKEN

const SOURCE_README_URL =
  'https://raw.githubusercontent.com/xixu-me/awesome-persona-distill-skills/main/README.md'

async function fetchText(url) {
  const headers = {
    'User-Agent': 'everythingskill-scanner/1.0',
    ...(TOKEN ? { Authorization: `Bearer ${TOKEN}` } : {}),
  }
  const res = await fetch(url, { headers })
  if (!res.ok) throw new Error(`HTTP ${res.status} fetching ${url}`)
  return res.text()
}

function extractGithubRepos(markdown) {
  const seen = new Set()
  const repos = []
  // Match github.com/owner/repo patterns in markdown links and plain URLs
  const re = /github\.com\/([A-Za-z0-9_.-]+\/[A-Za-z0-9_.-]+?)(?:\.git)?(?:[)\s"'#]|$)/g
  let m
  while ((m = re.exec(markdown)) !== null) {
    const ownerRepo = m[1].replace(/\/$/, '')
    // Skip the awesome list repo itself
    if (ownerRepo === 'xixu-me/awesome-persona-distill-skills') continue
    if (!seen.has(ownerRepo)) {
      seen.add(ownerRepo)
      repos.push({
        ownerRepo,
        github: `https://github.com/${ownerRepo}`,
      })
    }
  }
  return repos
}

async function main() {
  console.log('Fetching awesome-persona-distill-skills README…')
  const readme = await fetchText(SOURCE_README_URL)

  const awesomeRepos = extractGithubRepos(readme)
  console.log(`Found ${awesomeRepos.length} repos in source list.`)

  const content = readFileSync(SKILLS_FILE, 'utf8')
  const { skills } = JSON.parse(content)

  const archivedContent = readFileSync(ARCHIVED_FILE, 'utf8')
  const { archivedSkills } = JSON.parse(archivedContent)

  // Normalise existing + archived GitHub URLs → "owner/repo"
  const knownRepos = new Set(
    [...skills, ...archivedSkills]
      .map(s => {
        const m = (s.github ?? '').match(/github\.com\/([^/]+\/[^/]+?)(?:\.git)?$/)
        return m ? m[1] : null
      })
      .filter(Boolean),
  )

  const missing = awesomeRepos.filter(r => !knownRepos.has(r.ownerRepo))
  console.log(`${missing.length} repos not yet in skills.json.`)

  const output = {
    scannedAt: new Date().toISOString().slice(0, 10),
    source: SOURCE_README_URL,
    totalInSource: awesomeRepos.length,
    totalInDatabase: skills.length,
    missingCount: missing.length,
    missing: missing.map(r => ({
      github: r.github,
      repoName: r.ownerRepo.split('/')[1],
      ownerRepo: r.ownerRepo,
    })),
  }

  writeFileSync(OUTPUT_FILE, JSON.stringify(output, null, 2) + '\n', 'utf8')
  console.log(`Written to ${OUTPUT_FILE}`)
}

main().catch(err => {
  console.error(err)
  process.exit(1)
})
