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

/** Rewrite relative image/link src to absolute GitHub raw URLs */
function rewriteRelativeUrls(html: string, rawBase: string): string {
  // src="./foo.png" or src="foo.png" → absolute github raw URL
  return html
    .replace(/(<img\s[^>]*src=")(?!https?:\/\/)([^"]+)(")/gi, (_, pre, path, post) => {
      const clean = path.replace(/^\.\//, '')
      return `${pre}${rawBase}/${clean}${post}`
    })
}

function parseMarkdown(raw: string, rawBase: string): string {
  marked.use({ gfm: true, breaks: false })
  const html = marked.parse(raw, { async: false }) as string
  return rewriteRelativeUrls(html, rawBase)
}

async function fetchReadmeData(owner: string, repo: string) {
  const rawUrl = (branch: string, file: string) =>
    `https://raw.githubusercontent.com/${owner}/${repo}/${branch}/${file}`

  // Fetch zh README.md — try main then master
  let zhRaw: string | null = null
  let zhBranch = 'main'
  for (const branch of ['main', 'master']) {
    zhRaw = await tryFetch(rawUrl(branch, 'README.md'))
    if (zhRaw) { zhBranch = branch; break }
  }

  // Fetch en README — try common filenames on main then master
  let enRaw: string | null = null
  let enBranch = 'main'
  const enFilenames = ['README_EN.md', 'README.en.md', 'README-EN.md', 'readme_en.md']
  outer: for (const branch of ['main', 'master']) {
    for (const fname of enFilenames) {
      enRaw = await tryFetch(rawUrl(branch, fname))
      if (enRaw) { enBranch = branch; break outer }
    }
  }

  return {
    zh: zhRaw ? parseMarkdown(zhRaw, `https://raw.githubusercontent.com/${owner}/${repo}/${zhBranch}`) : null,
    en: enRaw ? parseMarkdown(enRaw, `https://raw.githubusercontent.com/${owner}/${repo}/${enBranch}`) : null,
  }
}

export function useSkillReadme(skillId: string, githubUrl: string, skip = false) {
  if (skip || !githubUrl) {
    return {
      readmeHtml: ref<string | null>(null),
      readmeEnHtml: ref<string | null>(null),
      loading: ref(false),
    }
  }

  const parsed = extractOwnerRepo(githubUrl)
  if (!parsed) {
    return {
      readmeHtml: ref<string | null>(null),
      readmeEnHtml: ref<string | null>(null),
      loading: ref(false),
    }
  }

  const { owner, repo } = parsed
  const { data, status } = useAsyncData(
    `readme-${skillId}`,
    () => fetchReadmeData(owner, repo),
  )

  return {
    readmeHtml: computed(() => data.value?.zh ?? null),
    readmeEnHtml: computed(() => data.value?.en ?? null),
    loading: computed(() => status.value === 'pending'),
  }
}
