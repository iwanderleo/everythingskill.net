import rawData from './skills.json'

interface RawSkill {
  id: string
  slug: string
  addedAt: string
  updatedAt: string
  name: string
  nameZh: string
  summary?: string
  summaryZh?: string
  detailIntroZh?: string
  description?: string
  descriptionZh?: string
  longDescriptionZh?: string
  category: SkillCategory
  author: string
  github: string
  githubStatus?: 404
  stars?: number
  tags: string[]
  featured?: boolean
}

export interface Skill {
  id: string
  slug: string
  addedAt: string
  updatedAt: string
  name: string
  nameZh: string
  summary: string
  summaryZh: string
  detailIntroZh?: string
  category: SkillCategory
  author: string
  github: string
  githubStatus?: 404
  stars?: number
  tags: string[]
  featured?: boolean
}

export type SkillCategory =
  | 'workplace'
  | 'media'
  | 'persona'
  | 'relationship'
  | 'celebrity'
  | 'education'
  | 'mystical'
  | 'tool'
  | 'defense'

export interface CategoryInfo {
  key: SkillCategory
  label: string
  labelZh: string
  icon: string
  badgeClass: string
}

export interface SkillsDataset {
  lastSyncedAt: string
  categories: CategoryInfo[]
  skills: Skill[]
}

interface RawSkillsDataset {
  lastSyncedAt: string
  categories: CategoryInfo[]
  skills: RawSkill[]
}

const raw = rawData as RawSkillsDataset

const data: SkillsDataset = {
  lastSyncedAt: raw.lastSyncedAt,
  categories: raw.categories,
  skills: raw.skills.map(({ summary, summaryZh, detailIntroZh, description, descriptionZh, longDescriptionZh, ...skill }) => ({
    ...skill,
    summary: summary ?? description ?? '',
    summaryZh: summaryZh ?? descriptionZh ?? '',
    detailIntroZh: detailIntroZh ?? longDescriptionZh,
  })),
}

export const lastSyncedAt = data.lastSyncedAt
export const categories = data.categories
export const skills = data.skills

/** Return the canonical persisted URL slug for a skill */
export function getSkillSlug(skill: Skill): string {
  return skill.slug
}

/** Look up a skill by its URL slug */
export function getSkillBySlug(slug: string): Skill | undefined {
  return skills.find(s => s.slug === slug)
}

export function getSkillsByCategory(category: SkillCategory): Skill[] {
  return skills.filter(s => s.category === category)
}

export function getFeaturedSkills(): Skill[] {
  return skills.filter(s => s.featured)
}

export function searchSkills(query: string): Skill[] {
  const q = query.toLowerCase()
  return skills.filter(s =>
    s.name.toLowerCase().includes(q) ||
    s.nameZh.includes(q) ||
    s.summary.toLowerCase().includes(q) ||
    s.summaryZh.includes(q) ||
    s.tags.some(t => t.includes(q)) ||
    s.author.toLowerCase().includes(q)
  )
}

export function getCategoryInfo(key: SkillCategory): CategoryInfo | undefined {
  return categories.find(c => c.key === key)
}
