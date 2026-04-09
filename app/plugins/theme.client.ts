import githubMarkdownDarkHref from 'github-markdown-css/github-markdown-dark.css?url'
import { type AppTheme } from '~/composables/useTheme'

export default defineNuxtPlugin(() => {
  const savedTheme = window.localStorage.getItem('everythingskill-theme')
  const theme: AppTheme = savedTheme === 'light' || savedTheme === 'dark'
    ? savedTheme
    : (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')

  const themeState = useState<AppTheme>('app-theme', () => theme)
  themeState.value = theme

  document.documentElement.dataset.theme = theme
  document.documentElement.style.colorScheme = theme

  let darkThemeLink = document.getElementById('github-markdown-dark-theme') as HTMLLinkElement | null

  if (theme === 'dark') {
    if (!darkThemeLink) {
      darkThemeLink = document.createElement('link')
      darkThemeLink.id = 'github-markdown-dark-theme'
      darkThemeLink.rel = 'stylesheet'
      darkThemeLink.href = githubMarkdownDarkHref
      document.head.appendChild(darkThemeLink)
    }
  } else {
    darkThemeLink?.remove()
  }
})