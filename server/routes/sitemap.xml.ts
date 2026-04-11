import { skills, getSkillSlug } from '../../app/data/skills'

const BASE_URL = 'https://everythingskill.net'
const LOCALES = ['en', 'zh'] as const

function escapeXml(s: string) {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
}

function localizePath(path: string, locale: (typeof LOCALES)[number]) {
  if (locale === 'en') return path
  return path === '/' ? '/zh' : `/zh${path}`
}

function alternateLinks(path: string) {
  return LOCALES.map(locale => {
    const href = `${BASE_URL}${localizePath(path, locale)}`
    return `    <xhtml:link rel="alternate" hreflang="${locale === 'zh' ? 'zh-CN' : 'en'}" href="${escapeXml(href)}" />`
  })
}

function url(path: string, locale: (typeof LOCALES)[number], priority: string, changefreq: string, lastmod?: string) {
  const loc = `${BASE_URL}${localizePath(path, locale)}`
  const parts = [
    '  <url>',
    `    <loc>${escapeXml(loc)}</loc>`,
    ...alternateLinks(path),
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
  const staticPaths = [
    { path: '/', priority: '1.0', changefreq: 'weekly', lastmod: today },
    { path: '/skills', priority: '0.9', changefreq: 'daily', lastmod: today },
    { path: '/about', priority: '0.5', changefreq: 'monthly' },
    { path: '/submit', priority: '0.6', changefreq: 'monthly' },
    { path: '/rankings/hot', priority: '0.7', changefreq: 'daily', lastmod: today },
    { path: '/rankings/new', priority: '0.7', changefreq: 'daily', lastmod: today },
    { path: '/guide', priority: '0.8', changefreq: 'monthly' },
  ]

  const staticUrls = staticPaths.flatMap(({ path, priority, changefreq, lastmod }) =>
    LOCALES.map(locale => url(path, locale, priority, changefreq, lastmod)),
  )

  const skillUrls = skills.flatMap(skill =>
    LOCALES.map(locale => url(`/skills/${getSkillSlug(skill)}`, locale, '0.8', 'weekly', today)),
  )

  const xml = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">',
    ...staticUrls,
    ...skillUrls,
    '</urlset>',
  ].join('\n')

  return xml
})
