// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  css: [
    'github-markdown-css/github-markdown-light.css',
    '~/assets/css/main.css',
  ],
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  future: {
    compatibilityVersion: 4
  },
  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxt/icon',
    '@nuxt/fonts',
    '@nuxtjs/i18n',
  ],
  i18n: {
    locales: [
      { code: 'zh', name: '中文', language: 'zh-CN', file: 'zh.json' },
      { code: 'en', name: 'English', language: 'en-US', file: 'en.json' },
    ],
    defaultLocale: 'en',
    langDir: 'locales/',
    strategy: 'prefix_except_default',
    baseUrl: 'https://everythingskill.net',
    detectBrowserLanguage: false,
  },
  fonts: {
    families: [
      { name: 'Cal Sans', provider: 'google' },
      { name: 'Inter', provider: 'google', weights: [300, 400, 500, 600] },
      { name: 'Roboto Mono', provider: 'google', weights: [400, 600] },
    ],
  },
  app: {
    head: {
      title: 'EverythingSkill — 万物皆可 Skill',
      meta: [
        { name: 'description', content: '发现、分享、使用 AI Skill。一切皆可蒸馏为 Skill。收录 42 个高质量开源 Skill，覆盖职场、名人思维、人格蒸馏等 9 大分类。' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'keywords', content: 'AI Skill, AI提示词, skill文件, 人格蒸馏, 开源, ChatGPT, Claude, Cursor' },
        { name: 'author', content: 'EverythingSkill' },
        { property: 'og:type', content: 'website' },
        { property: 'og:site_name', content: 'EverythingSkill' },
        { property: 'og:title', content: 'EverythingSkill — 万物皆可 Skill' },
        { property: 'og:description', content: '开源 AI Skill 发现与分享平台。一切皆可蒸馏为 Skill。' },
        { property: 'og:url', content: 'https://everythingskill.net' },
        { property: 'og:image', content: 'https://everythingskill.net/og-image.png' },
        { property: 'og:image:width', content: '1200' },
        { property: 'og:image:height', content: '630' },
        { property: 'og:image:alt', content: 'EverythingSkill visual preview' },
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:title', content: 'EverythingSkill — 万物皆可 Skill' },
        { name: 'twitter:description', content: '开源 AI Skill 发现与分享平台。一切皆可蒸馏为 Skill。' },
        { name: 'twitter:image', content: 'https://everythingskill.net/twitter-image.png' },
        { name: 'twitter:image:alt', content: 'EverythingSkill visual preview' },
        { name: 'msapplication-TileColor', content: '#242424' },
        { name: 'msapplication-TileImage', content: '/mstile-150x150.png' },
        { name: 'theme-color', content: '#242424' },
      ],
      link: [
        { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/favicon-16x16.png' },
        { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/favicon-32x32.png' },
        { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        { rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon.png' },
        { rel: 'manifest', href: '/site.webmanifest' },
        { rel: 'mask-icon', href: '/safari-pinned-tab.svg', color: '#242424' },
      ],
      script: [
        {
          async: true,
          src: 'https://www.googletagmanager.com/gtag/js?id=G-KN3SZ4QDC1',
        },
        {
          children: "window.dataLayer = window.dataLayer || []; function gtag(){dataLayer.push(arguments);} gtag('js', new Date()); gtag('config', 'G-KN3SZ4QDC1');",
        },
      ],
    },
  },
})
