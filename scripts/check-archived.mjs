/**
 * scripts/check-archived.mjs
 *
 * Daily two-way status check:
 *  1. Active skills  → ping GitHub. If 404, auto-archive them.
 *  2. Archived skills → ping GitHub. If accessible again, restore to skills.json.
 *
 * All state changes are appended to app/data/skill-status-log.json.
 *
 * Usage:
 *   node scripts/check-archived.mjs
 *   GITHUB_TOKEN=xxx node scripts/check-archived.mjs
 */

import { readFileSync, writeFileSync } from 'fs'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'
import { generateReadme } from './generate-readme.mjs'

const __dirname = dirname(fileURLToPath(import.meta.url))
const SKILLS_FILE   = join(__dirname, '../app/data/skills.json')
const ARCHIVED_FILE = join(__dirname, '../app/data/archived-skills.json')
const LOG_FILE      = join(__dirname, '../app/data/skill-status-log.json')
const TOKEN = process.env.GITHUB_TOKEN

const today = new Date().toISOString().slice(0, 10)

function extractOwnerRepo(githubUrl) {
  const m = githubUrl.match(/github\.com\/([^/]+\/[^/]+?)(?:\.git)?$/)
  return m ? m[1] : null
}

async function checkRepo(ownerRepo) {
  const url = `https://api.github.com/repos/${ownerRepo}`
  const headers = {
    Accept: 'application/vnd.github+json',
    'X-GitHub-Api-Version': '2022-11-28',
    ...(TOKEN ? { Authorization: `Bearer ${TOKEN}` } : {}),
  }
  const res = await fetch(url, { headers })
  if (res.ok) {
    const data = await res.json()
    return { accessible: true, stars: data.stargazers_count ?? null }
  }
  return { accessible: false, stars: null }
}

function appendLog(logData, entry) {
  logData.events.push(entry)
  console.log(`  [log] ${entry.action}: ${entry.skillId} — ${entry.reason ?? ''}`)
}

async function main() {
  const skillsData   = JSON.parse(readFileSync(SKILLS_FILE, 'utf8'))
  const archivedData = JSON.parse(readFileSync(ARCHIVED_FILE, 'utf8'))
  const logData      = JSON.parse(readFileSync(LOG_FILE, 'utf8'))

  const newlyArchived = []
  const remainingActive = []

  // ── Phase 1: Check active skills for 404 ──────────────────────────────────
  console.log(`\n── Phase 1: Checking ${skillsData.skills.length} active skills ──`)
  for (const skill of skillsData.skills) {
    const ownerRepo = extractOwnerRepo(skill.github)
    if (!ownerRepo) { remainingActive.push(skill); continue }

    console.log(`Checking active: ${ownerRepo}…`)
    const { accessible } = await checkRepo(ownerRepo)

    if (!accessible) {
      console.log(`  ✗ 404 — archiving`)
      const archivedEntry = {
        ...skill,
        updatedAt: today,
        archivedAt: today,
        archivedReason: 'github_404',
      }
      // Remove runtime-only fields that don't belong in archive
      delete archivedEntry.stars
      newlyArchived.push(archivedEntry)
      appendLog(logData, {
        date: today,
        skillId: skill.id,
        skillName: skill.nameZh || skill.name,
        action: 'archived',
        reason: 'github_404',
        github: skill.github,
      })
    } else {
      remainingActive.push(skill)
    }
  }

  // ── Phase 2: Check archived skills for restoration ────────────────────────
  const stillArchived = []
  const allArchived = [...archivedData.archivedSkills, ...newlyArchived]

  console.log(`\n── Phase 2: Checking ${allArchived.length} archived skills ──`)
  for (const skill of allArchived) {
    const ownerRepo = extractOwnerRepo(skill.github)
    if (!ownerRepo) { stillArchived.push(skill); continue }

    console.log(`Checking archived: ${ownerRepo}…`)
    const { accessible, stars } = await checkRepo(ownerRepo)

    if (accessible) {
      console.log(`  ✓ Accessible again — restoring`)
      const { archivedAt, archivedReason, ...restoredSkill } = skill
      restoredSkill.updatedAt = today
      if (stars != null) restoredSkill.stars = stars
      remainingActive.push(restoredSkill)
      appendLog(logData, {
        date: today,
        skillId: skill.id,
        skillName: skill.nameZh || skill.name,
        action: 'restored',
        github: skill.github,
      })
    } else {
      stillArchived.push(skill)
    }
  }

  // ── Write files ───────────────────────────────────────────────────────────
  skillsData.skills = remainingActive
  archivedData.archivedSkills = stillArchived

  writeFileSync(SKILLS_FILE,   JSON.stringify(skillsData,   null, 2) + '\n', 'utf8')
  writeFileSync(ARCHIVED_FILE, JSON.stringify(archivedData, null, 2) + '\n', 'utf8')
  writeFileSync(LOG_FILE,      JSON.stringify(logData,      null, 2) + '\n', 'utf8')

  const archived  = allArchived.length - stillArchived.filter(s => archivedData.archivedSkills.includes(s)).length
  console.log(`\nDone. Newly archived: ${newlyArchived.length}, restored: ${allArchived.length - stillArchived.length}`)

  // Regenerate README files to reflect current active skills
  if (newlyArchived.length > 0 || (allArchived.length - stillArchived.length) > 0) {
    console.log('\nRegenerating README files…')
    await generateReadme()
  }
}

main().catch(err => {
  console.error(err)
  process.exit(1)
})
