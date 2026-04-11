import { marked } from 'marked'

function extractOwnerRepo(githubUrl: string): { owner: string; repo: string } | null {
  const m = githubUrl.match(/github\.com\/([^/]+)\/([^/?#]+)/i)
  if (!m || !m[1] || !m[2]) return null
  return { owner: m[1], repo: m[2].replace(/\.git$/, '') }
}

async function tryFetch(url: string): Promise<string | null> {
  try {
    const text = await $fetch<string>(url, { responseType: 'text' })
    return text || null
  }
  catch {
    return null
  }
}

/** Rewrite relative image/link src to absolute GitHub URLs */
function rewriteRelativeUrls(html: string, rawBase: string, blobBase: string): string {
  // img src: relative → raw URL (so images display inline)
  let result = html.replace(/(<img\s[^>]*src=")(?!https?:\/\/)([^"]+)(")/gi, (_, pre, path, post) => {
    const clean = path.replace(/^\.\//, '')
    return `${pre}${rawBase}/${clean}${post}`
  })
  // a href: relative → GitHub blob URL (avoids broken internal routes like /zh/skills/README_ZH.md)
  result = result.replace(/(<a\s[^>]*href=")(?!https?:\/\/|#|mailto:)([^"]+)(")/gi, (_, pre, path, post) => {
    const clean = path.replace(/^\.\//, '')
    return `${pre}${blobBase}/${clean}${post}`
  })
  return result
}

function parseMarkdown(raw: string, rawBase: string, blobBase: string): string {
  marked.use({ gfm: true, breaks: false })
  const html = marked.parse(raw, { async: false }) as string
  return rewriteRelativeUrls(html, rawBase, blobBase)
}

/**
 * Return ordered candidate filenames to try when fetching a given locale.
 * First match wins.
 */
function localeToFilenames(locale: string): string[] {
  const lc = locale.toLowerCase()
  const uc = locale.toUpperCase()
  if (lc === 'zh') return ['README_ZH.md', 'README_zh.md', 'README.zh.md', 'README-ZH.md', 'README.md']
  if (lc === 'en') return ['README_EN.md', 'README.en.md', 'README-EN.md', 'readme_en.md']
  return [`README_${uc}.md`, `README_${lc}.md`, `README.${lc}.md`, `README-${uc}.md`]
}

/**
 * Fetch README content for the given locale codes.
 * Returns a Record<localeCode, renderedHtml> for locales that have content.
 */
async function fetchReadmeByLocales(owner: string, repo: string, locales: string[]) {
  const rawUrl = (branch: string, file: string) =>
    `https://raw.githubusercontent.com/${owner}/${repo}/${branch}/${file}`

  // Detect active branch + cache README.md to avoid double-fetching for 'zh'
  let activeBranch = 'main'
  const contentCache: Record<string, string> = {}
  for (const branch of ['main', 'master']) {
    const probe = await tryFetch(rawUrl(branch, 'README.md'))
    if (probe !== null) {
      activeBranch = branch
      contentCache[`${branch}/README.md`] = probe
      break
    }
  }

  const rawBase = `https://raw.githubusercontent.com/${owner}/${repo}/${activeBranch}`
  const blobBase = `https://github.com/${owner}/${repo}/blob/${activeBranch}`

  async function fetchFile(fname: string): Promise<string | null> {
    const key = `${activeBranch}/${fname}`
    if (Object.prototype.hasOwnProperty.call(contentCache, key)) return contentCache[key]!
    const raw = await tryFetch(rawUrl(activeBranch, fname))
    if (raw !== null) contentCache[key] = raw
    return raw
  }

  const result: Record<string, string> = {}
  for (const locale of locales) {
    const lc = locale.toLowerCase()
    for (const fname of localeToFilenames(lc)) {
      const raw = await fetchFile(fname)
      if (raw) {
        result[lc] = parseMarkdown(raw, rawBase, blobBase)
        break
      }
    }
  }
  return result
}

export function useSkillReadme(
  skillId: string,
  githubUrl: string,
  skip = false,
  readmeLocales?: string[],
) {
  const empty = {
    readmeByLocale: ref<Record<string, string>>({}),
    availableLocales: computed((): string[] => []),
    loading: ref(false),
  }

  if (skip || !githubUrl) return empty

  const parsed = extractOwnerRepo(githubUrl)
  if (!parsed) return empty

  const { owner, repo } = parsed

  // If readmeLocales provided by sync script, use those; otherwise try zh + en.
  const locales = readmeLocales && readmeLocales.length > 0 ? readmeLocales : ['zh', 'en']

  const { data, status } = useAsyncData(
    `readme-${skillId}`,
    () => fetchReadmeByLocales(owner, repo, locales),
  )

  return {
    readmeByLocale: computed(() => data.value ?? {}),
    availableLocales: computed(() => Object.keys(data.value ?? {})),
    loading: computed(() => status.value === 'pending'),
  }
}
