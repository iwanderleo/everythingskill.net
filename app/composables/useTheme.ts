import githubMarkdownDarkHref from 'github-markdown-css/github-markdown-dark.css?url'

export type AppTheme = 'light' | 'dark'

const THEME_STORAGE_KEY = 'everythingskill-theme'
const GITHUB_MARKDOWN_DARK_LINK_ID = 'github-markdown-dark-theme'

function getPreferredTheme(): AppTheme {
  if (typeof window === 'undefined') return 'light'

  const savedTheme = window.localStorage.getItem(THEME_STORAGE_KEY)
  if (savedTheme === 'light' || savedTheme === 'dark') {
    return savedTheme
  }

  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

function applyTheme(theme: AppTheme) {
  if (typeof document === 'undefined') return

  document.documentElement.dataset.theme = theme
  document.documentElement.style.colorScheme = theme

  let darkThemeLink = document.getElementById(GITHUB_MARKDOWN_DARK_LINK_ID) as HTMLLinkElement | null

  if (theme === 'dark') {
    if (!darkThemeLink) {
      darkThemeLink = document.createElement('link')
      darkThemeLink.id = GITHUB_MARKDOWN_DARK_LINK_ID
      darkThemeLink.rel = 'stylesheet'
      document.head.appendChild(darkThemeLink)
    }

    darkThemeLink.href = githubMarkdownDarkHref
    return
  }

  darkThemeLink?.remove()
}

export function useTheme() {
  const theme = useState<AppTheme>('app-theme', () => 'light')

  function setTheme(nextTheme: AppTheme) {
    theme.value = nextTheme

    if (typeof window !== 'undefined') {
      window.localStorage.setItem(THEME_STORAGE_KEY, nextTheme)
    }

    applyTheme(nextTheme)
  }

  function toggleTheme() {
    setTheme(theme.value === 'dark' ? 'light' : 'dark')
  }

  if (import.meta.client) {
    onMounted(() => {
      const resolvedTheme = getPreferredTheme()
      if (theme.value !== resolvedTheme) {
        theme.value = resolvedTheme
      }
      applyTheme(resolvedTheme)
    })
  }

  return {
    theme: readonly(theme),
    setTheme,
    toggleTheme,
  }
}