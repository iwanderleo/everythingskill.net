<template>
  <div class="bg-white">
    <div class="mx-auto max-w-3xl px-6 py-section">
      <h1 class="font-display text-display-hero text-charcoal mb-10" style="line-height: 1.10;">{{ $t('aboutPage.title') }}</h1>

      <div class="space-y-8 text-mid-gray" style="line-height: 1.50; font-weight: 300;">
        <p class="text-lg">
          <strong class="text-charcoal font-semibold">EverythingSkill.net</strong> {{ $t('aboutPage.intro') }}
        </p>

        <div>
          <h2 class="font-display text-display-feature text-charcoal mb-4" style="line-height: 1.30;">{{ $t('aboutPage.originTitle') }}</h2>
          <p>{{ $t('aboutPage.originBody1') }}</p>
          <p class="mt-4">
            {{ $t('aboutPage.originBody2') }}
          </p>
        </div>

        <div>
          <h2 class="font-display text-display-feature text-charcoal mb-4" style="line-height: 1.30;">{{ $t('aboutPage.whatWeDoTitle') }}</h2>
          <ul class="space-y-4">
            <li class="flex items-start gap-3">
              <Icon name="lucide:compass" class="w-5 h-5 text-charcoal mt-0.5 flex-shrink-0" />
              <span><strong class="text-charcoal font-semibold">{{ $t('aboutPage.discoverTitle') }}</strong> — {{ $t('aboutPage.discoverBody') }}</span>
            </li>
            <li class="flex items-start gap-3">
              <Icon name="lucide:share-2" class="w-5 h-5 text-charcoal mt-0.5 flex-shrink-0" />
              <span><strong class="text-charcoal font-semibold">{{ $t('aboutPage.shareTitle') }}</strong> — {{ $t('aboutPage.shareBody') }}</span>
            </li>
            <li class="flex items-start gap-3">
              <Icon name="lucide:book-open" class="w-5 h-5 text-charcoal mt-0.5 flex-shrink-0" />
              <span><strong class="text-charcoal font-semibold">{{ $t('aboutPage.learnTitle') }}</strong> — {{ $t('aboutPage.learnBody') }}</span>
            </li>
          </ul>
        </div>

        <div>
          <h2 class="font-display text-display-feature text-charcoal mb-4" style="line-height: 1.30;">{{ $t('aboutPage.thanksTitle') }}</h2>
          <p>
            {{ $t('aboutPage.thanksBody') }}
            <a href="https://x.com/jinchenma_ai" target="_blank" rel="noopener" class="text-link-blue underline">@jinchenma_ai</a>
            {{ $t('aboutPage.thanksTail') }}
          </p>
        </div>

        <div class="flex gap-3 pt-4">
          <a href="https://github.com/iwanderleo/everythingskill.net" target="_blank" rel="noopener" class="btn-secondary">
            <Icon name="lucide:github" class="w-4 h-4" />
            GitHub
          </a>
          <NuxtLink :to="localePath('/skills')" class="btn-primary">
            {{ $t('aboutPage.browseCta') }}
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const { locale } = useI18n()
const localePath = useLocalePath()
const pageUrl = computed(() => `https://everythingskill.net${localePath('/about')}`)

useHead({
  title: computed(() => locale.value === 'zh' ? '关于 EverythingSkill — 万物皆可 Skill' : 'About EverythingSkill'),
  meta: computed(() => {
    const description = locale.value === 'zh'
      ? 'EverythingSkill 是一个开源的 AI Skill 发现与分享平台，致力于将世间万物蒸馏为可复用的 .skill 文件。'
      : 'EverythingSkill is an open-source AI Skill discovery and sharing platform.'

    return [
      { name: 'description', content: description },
      { property: 'og:title', content: locale.value === 'zh' ? '关于 — EverythingSkill' : 'About — EverythingSkill' },
      { property: 'og:url', content: pageUrl.value },
    ]
  }),
})
</script>
