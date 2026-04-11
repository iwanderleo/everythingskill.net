/**
 * scripts/generate-readme.mjs
 *
 * Regenerates the "## Skill Directory / ## Skill 目录" section in both
 * README.md and README_zh.md from the current app/data/skills.json.
 *
 * Called automatically by check-archived.mjs after any archive/restore event,
 * and by the daily-sync GitHub Action to keep READMEs always in sync.
 *
 * Usage:
 *   node scripts/generate-readme.mjs
 */

import { readFileSync, writeFileSync } from 'fs'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

const __dirname = dirname(fileURLToPath(import.meta.url))
const SKILLS_FILE = join(__dirname, '../app/data/skills.json')
const README_EN   = join(__dirname, '../README.md')
const README_ZH   = join(__dirname, '../README_zh.md')

function replaceSection(content, startMarker, endMarker, newSection) {
  const startIdx = content.indexOf('\n' + startMarker)
  const endIdx   = content.indexOf('\n' + endMarker, startIdx + 1)
  if (startIdx === -1 || endIdx === -1) {
    console.warn(`  [warn] Could not find section "${startMarker}" → "${endMarker}"`)
    return content
  }
  return content.slice(0, startIdx + 1) + newSection + '\n' + content.slice(endIdx + 1)
}

export async function generateReadme() {
  const { skills, categories, lastSyncedAt } = JSON.parse(readFileSync(SKILLS_FILE, 'utf8'))

  // Group by category
  const byCategory = {}
  for (const skill of skills) {
    ;(byCategory[skill.category] = byCategory[skill.category] ?? []).push(skill)
  }

  // ── English ──────────────────────────────────────────────────────────────
  const enLines = [
    `## Skill Directory\n`,
    `> ${skills.length} Skills · ${categories.length} Categories · Last synced ${lastSyncedAt}\n`,
  ]
  for (const cat of categories) {
    const catSkills = byCategory[cat.key] ?? []
    if (!catSkills.length) continue
    enLines.push(`### ${cat.label}\n`)
    for (const s of catSkills) {
      enLines.push(`- [${s.name}](${s.github}) — ${s.summary}`)
    }
    enLines.push('')
  }

  // ── Chinese ───────────────────────────────────────────────────────────────
  const zhLines = [
    `## Skill 目录\n`,
    `> ${skills.length} 个 Skill · ${categories.length} 个分类 · 最后同步 ${lastSyncedAt}\n`,
  ]
  for (const cat of categories) {
    const catSkills = byCategory[cat.key] ?? []
    if (!catSkills.length) continue
    zhLines.push(`### ${cat.labelZh}\n`)
    for (const s of catSkills) {
      zhLines.push(`- [${s.nameZh || s.name}](${s.github}) — ${s.summaryZh || s.summary}`)
    }
    zhLines.push('')
  }

  // ── Write ─────────────────────────────────────────────────────────────────
  let enContent = readFileSync(README_EN, 'utf8')
  enContent = replaceSection(enContent, '## Skill Directory', '## Submit a Skill', enLines.join('\n'))
  writeFileSync(README_EN, enContent, 'utf8')

  let zhContent = readFileSync(README_ZH, 'utf8')
  zhContent = replaceSection(zhContent, '## Skill 目录', '## 提交 Skill', zhLines.join('\n'))
  writeFileSync(README_ZH, zhContent, 'utf8')

  console.log(`README updated: ${skills.length} active skills (${lastSyncedAt})`)
}

// Run directly
generateReadme().catch(err => { console.error(err); process.exit(1) })
