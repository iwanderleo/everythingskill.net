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

  // Fetch stars for each repo (sequentially to avoid rate limiting)
  const starsMap = {}
  for (const { ownerRepo } of unique) {
    console.log(`Fetching stars for ${ownerRepo}…`)
    const stars = await fetchStars(ownerRepo)
    starsMap[ownerRepo] = stars
    // Small delay to respect rate limits
    await new Promise(r => setTimeout(r, 200))
  }

  const today = new Date().toISOString().slice(0, 10)
  data.skills = data.skills.map(skill => {
    const ownerRepo = extractOwnerRepo(skill.github)
    if (!ownerRepo) return skill
    const stars = starsMap[ownerRepo]
    // Only sync GitHub metrics. Editorial fields stay untouched in JSON.
    return stars == null ? skill : { ...skill, stars }
  })
  data.lastSyncedAt = today

  writeFileSync(SKILLS_FILE, `${JSON.stringify(data, null, 2)}\n`, 'utf8')
  console.log(`✓ Synced ${unique.length} repos. lastSyncedAt = ${today}`)
}

main().catch(err => {
  console.error(err)
  process.exit(1)
})
