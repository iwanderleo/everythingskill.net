<template>
  <div class="min-h-screen flex flex-col">
    <AppHeader />
    <main class="flex-1">
      <slot />
    </main>
    <AppFooter />
  </div>
</template>

<script setup lang="ts">
const { locale } = useI18n()
const switchLocalePath = useSwitchLocalePath()
const baseUrl = 'https://everythingskill.net'

useHead(() => {
  const enPath = switchLocalePath('en') || '/'
  const zhPath = switchLocalePath('zh') || '/zh'
  const canonicalPath = locale.value === 'zh' ? zhPath : enPath

  return {
    htmlAttrs: {
      lang: locale.value === 'zh' ? 'zh-CN' : 'en',
      dir: 'ltr',
    },
    meta: [
      { id: 'og-locale-current', property: 'og:locale', content: locale.value === 'zh' ? 'zh_CN' : 'en_US' },
      { id: 'og-locale-alt-en', property: 'og:locale:alternate', content: 'en_US' },
      { id: 'og-locale-alt-zh', property: 'og:locale:alternate', content: 'zh_CN' },
    ],
    link: [
      { id: 'canonical-current', rel: 'canonical', href: `${baseUrl}${canonicalPath}` },
      { id: 'alternate-en', rel: 'alternate', hreflang: 'en', href: `${baseUrl}${enPath}` },
      { id: 'alternate-zh', rel: 'alternate', hreflang: 'zh-CN', href: `${baseUrl}${zhPath}` },
      { id: 'alternate-x-default', rel: 'alternate', hreflang: 'x-default', href: `${baseUrl}${enPath}` },
    ],
  }
})
</script>
