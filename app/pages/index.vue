<template>
  <div>
    <!-- Hero Section -->
    <section class="bg-white">
      <div class="mx-auto max-w-container px-6 pt-section pb-section-lg text-center">
        <div
          class="inline-flex items-center gap-2 rounded-pill px-4 py-1.5 text-sm text-mid-gray mb-10 animate-fade-in"
          style="box-shadow: rgba(34, 42, 53, 0.08) 0px 0px 0px 1px;"
        >
          {{ $t('hero.badge') }}
        </div>

        <h1 class="font-display text-4xl sm:text-5xl lg:text-display-hero text-charcoal animate-slide-up" style="line-height: 1.10; font-weight: 500;">
          {{ $t('hero.title') }}
        </h1>

        <div class="mt-6 animate-slide-up" style="animation-delay: 0.1s;">
          <p class="text-lg sm:text-xl text-mid-gray" style="line-height: 1.60; font-weight: 400;">{{ $t('hero.subtitle1') }}</p>
          <p class="text-lg sm:text-xl text-mid-gray" style="line-height: 1.60; font-weight: 400;">{{ $t('hero.subtitle2') }}</p>
        </div>

      </div>
    </section>

    <!-- Featured Skills -->
    <section class="bg-light-gray">
      <div class="mx-auto max-w-container px-6 py-section-lg">
        <div class="flex items-end justify-between mb-10">
          <div>
            <h2 class="font-display text-display-section text-charcoal" style="line-height: 1.10;">{{ $t('home.featuredTitle') }}</h2>
            <p class="text-sm text-mid-gray mt-3" style="line-height: 1.50;">{{ $t('home.featuredSubtitle') }}</p>
          </div>
          <NuxtLink :to="localePath('/skills')" class="btn-secondary text-sm hidden sm:inline-flex">
            {{ $t('home.viewAll') }}
            <Icon name="lucide:arrow-right" class="w-4 h-4" />
          </NuxtLink>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <SkillCard v-for="skill in featuredSkills" :key="skill.id" :skill="skill" />
        </div>

        <div class="mt-8 text-center sm:hidden">
          <NuxtLink :to="localePath('/skills')" class="btn-secondary">
            {{ $t('home.viewAll') }}
            <Icon name="lucide:arrow-right" class="w-4 h-4" />
          </NuxtLink>
        </div>
      </div>
    </section>

    <!-- Categories -->
    <section class="bg-white">
      <div class="mx-auto max-w-container px-6 py-section-lg text-center">
        <h2 class="font-display text-display-section text-charcoal" style="line-height: 1.10;">{{ $t('home.categoriesTitle') }}</h2>
        <p class="text-sm text-mid-gray mt-3 mb-12" style="line-height: 1.50;">{{ $t('home.categoriesSubtitle') }}</p>

        <div class="grid grid-cols-2 sm:grid-cols-4 gap-5">
          <NuxtLink
            v-for="cat in categories"
            :key="cat.key"
            :to="localePath({ path: '/skills', query: { category: cat.key } })"
            class="skill-card group flex flex-col items-center gap-4 p-8"
          >
            <div class="flex h-12 w-12 items-center justify-center rounded-lg bg-light-gray group-hover:bg-charcoal/5 transition-colors">
              <Icon :name="cat.icon" class="w-6 h-6 text-charcoal" />
            </div>
            <div class="text-center">
              <div class="font-display text-display-sub text-charcoal">{{ locale === 'en' ? cat.label : cat.labelZh }}</div>
              <div class="text-xs text-mid-gray mt-1">{{ locale === 'en' ? cat.labelZh : cat.label }}</div>
            </div>
            <div class="text-xs text-mid-gray">
              {{ getSkillsByCategory(cat.key).length }} skills
            </div>
          </NuxtLink>
        </div>
      </div>
    </section>

    <!-- What is Skill -->
    <section class="bg-light-gray">
      <div class="mx-auto max-w-container px-6 py-section-lg">
        <div class="skill-card p-8 sm:p-12">
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 class="font-display text-display-section text-charcoal mb-6" style="line-height: 1.10;">{{ $t('home.whatIsTitle') }}</h2>
              <p class="text-mid-gray mb-4" style="line-height: 1.50; font-weight: 300;">
                <code class="text-charcoal font-mono font-semibold">.skill</code> {{ $t('home.whatIsDesc1') }}
              </p>
              <p class="text-mid-gray mb-8" style="line-height: 1.50; font-weight: 300;">
                {{ $t('home.whatIsDesc2') }}
              </p>
              <div class="flex flex-col gap-3">
                <div class="flex items-center gap-3 text-sm text-charcoal">
                  <Icon name="lucide:check" class="w-4 h-4 text-charcoal" />
                  {{ $t('home.compatible') }}
                </div>
                <div class="flex items-center gap-3 text-sm text-charcoal">
                  <Icon name="lucide:check" class="w-4 h-4 text-charcoal" />
                  {{ $t('home.plainText') }}
                </div>
                <div class="flex items-center gap-3 text-sm text-charcoal">
                  <Icon name="lucide:check" class="w-4 h-4 text-charcoal" />
                  {{ $t('home.openSource') }}
                </div>
              </div>
              <div class="mt-8">
                <NuxtLink :to="localePath('/guide')" class="inline-flex items-center gap-1.5 text-sm font-medium text-charcoal hover:opacity-70 transition-opacity">
                  {{ $t('home.guideLink') }}
                  <Icon name="lucide:arrow-right" class="w-3.5 h-3.5" />
                </NuxtLink>
              </div>
            </div>
            <!-- Code preview -->
            <div class="code-preview rounded-lg p-6 font-mono text-sm">
              <div class="flex items-center gap-2 mb-5 text-mid-gray">
                <div class="w-3 h-3 rounded-full traffic-dot" />
                <div class="w-3 h-3 rounded-full traffic-dot" />
                <div class="w-3 h-3 rounded-full traffic-dot" />
                <span class="ml-2 text-xs">example.skill</span>
              </div>
              <pre class="text-charcoal leading-relaxed whitespace-pre-wrap"><span class="font-semibold"># 乔布斯.skill</span>

<span class="text-mid-gray">## 身份</span>
你是史蒂夫·乔布斯的 AI 化身

<span class="text-mid-gray">## 核心思维模型</span>
- 现实扭曲力场
- 极致简洁主义
- 用户体验至上
- Say no to 1000 things

<span class="text-mid-gray">## 决策风格</span>
直觉 + 审美 + 第一性原理</pre>
            </div>
          </div>
        </div>
      </div>
    </section>

  </div>
</template>

<script setup lang="ts">
import { skills, categories, getSkillsByCategory } from '~/data/skills'

const { locale } = useI18n()
const localePath = useLocalePath()
const siteUrl = 'https://everythingskill.net'
const homeUrl = computed(() => `${siteUrl}${localePath('/')}`)
const skillDirectoryUrl = computed(() => `${siteUrl}${localePath('/skills')}`)
const featuredSkills = computed(() =>
  [...skills]
    .filter(skill => !skill.githubStatus && typeof skill.stars === 'number')
    .sort((left, right) => {
      if ((right.stars ?? 0) !== (left.stars ?? 0)) {
        return (right.stars ?? 0) - (left.stars ?? 0)
      }

      return Date.parse(right.updatedAt) - Date.parse(left.updatedAt)
    })
    .slice(0, 6),
)

useHead({
  title: computed(() => locale.value === 'zh'
    ? 'EverythingSkill — 万物皆可 Skill | 开源 AI Skill 发现平台'
    : 'EverythingSkill | Open-source AI Skill Discovery'),
  meta: computed(() => {
    const description = locale.value === 'zh'
      ? '一切皆可蒸馏为 Skill。发现、分享、使用最好的开源 AI Skill，让 AI 真正理解每一种能力。收录高质量 Skill，覆盖职场、名人思维、人格蒸馏等多个分类。'
      : 'Everything can be distilled into a Skill. Discover, share, and use open-source AI Skills across workplace, celebrity, persona, and more.'

    return [
      { name: 'description', content: description },
      { property: 'og:title', content: locale.value === 'zh' ? 'EverythingSkill — 万物皆可 Skill' : 'EverythingSkill' },
      { property: 'og:description', content: description },
      { property: 'og:url', content: homeUrl.value },
    ]
  }),
  script: computed(() => [
    {
      type: 'application/ld+json',
      children: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        name: 'EverythingSkill',
        url: homeUrl.value,
        inLanguage: locale.value === 'zh' ? 'zh-CN' : 'en',
        description: locale.value === 'zh'
          ? '开源 AI Skill 发现与分享平台。一切皆可蒸馏为 Skill。'
          : 'Open-source AI Skill discovery and sharing platform.',
        potentialAction: {
          '@type': 'SearchAction',
          target: { '@type': 'EntryPoint', urlTemplate: `${skillDirectoryUrl.value}?q={search_term_string}` },
          'query-input': 'required name=search_term_string',
        },
      }),
    },
    {
      type: 'application/ld+json',
      children: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'Organization',
        name: 'EverythingSkill',
        url: siteUrl,
        description: 'Open-source AI Skill discovery and sharing platform.',
        sameAs: [
          'https://github.com/iwanderleo/everythingskill.net',
          'https://x.com/iwanderleo',
        ],
      }),
    },
    {
      type: 'application/ld+json',
      children: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: [
          {
            '@type': 'Question',
            name: locale.value === 'zh' ? '什么是 .skill 文件？' : 'What is a .skill file?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: locale.value === 'zh'
                ? '.skill 文件是一种纯文本 AI 提示文件，将一个人的思维方式、知识体系与表达风格提炼成 AI 可以理解和模拟的格式。可以理解为 AI 的「人格插件」，兼容 Claude、ChatGPT、Cursor 等工具。'
                : 'A .skill file is a plain-text AI prompt file that distills a person\'s thinking patterns, knowledge system, and communication style into a format AI can understand and simulate. Think of it as an AI personality plugin — compatible with Claude, ChatGPT, Cursor, and more.',
            },
          },
          {
            '@type': 'Question',
            name: locale.value === 'zh' ? 'EverythingSkill 是什么？' : 'What is EverythingSkill?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: locale.value === 'zh'
                ? 'EverythingSkill 是一个开源 AI Skill 目录站，收录 GitHub 上分散的 .skill 文件，提供中英双语页面、分类浏览、搜索和 README 渲染。'
                : 'EverythingSkill is an open-source directory for discovering AI .skill files. It curates community-made skills into a bilingual searchable catalog with category pages and rendered README previews.',
            },
          },
        ],
      }),
    },
  ]),
})
</script>
