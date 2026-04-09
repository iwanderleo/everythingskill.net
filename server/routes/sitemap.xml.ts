import { skills, getSkillSlug } from '../../app/data/skills'

const BASE_URL = 'https://everythingskill.net'

function escapeXml(s: string) {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
}

function url(loc: string, priority: string, changefreq: string, lastmod?: string) {
  const parts = [
    '  <url>',
    `    <loc>${escapeXml(BASE_URL + loc)}</loc>`,
    `    <changefreq>${changefreq}</changefreq>`,
    `    <priority>${priority}</priority>`,
  ]
  if (lastmod) parts.push(`    <lastmod>${lastmod}</lastmod>`)
  parts.push('  </url>')
  return parts.join('\n')
}

export default defineEventHandler((event) => {
  setHeader(event, 'Content-Type', 'application/xml; charset=utf-8')
  setHeader(event, 'Cache-Control', 'public, max-age=3600, s-maxage=86400')

  const today = new Date().toISOString().slice(0, 10)

  const staticUrls = [
    url('/', '1.0', 'weekly', today),
    url('/skills', '0.9', 'daily', today),
    url('/about', '0.5', 'monthly'),
    url('/submit', '0.6', 'monthly'),
  ]

  const skillUrls = skills.map(skill =>
    url(`/skills/${getSkillSlug(skill)}`, '0.8', 'weekly', today),
  )

  const xml = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    ...staticUrls,
    ...skillUrls,
    '</urlset>',
  ].join('\n')

  return xml
})
