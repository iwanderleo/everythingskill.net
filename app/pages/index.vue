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
          <NuxtLink to="/skills" class="btn-secondary text-sm hidden sm:inline-flex">
            {{ $t('home.viewAll') }}
            <Icon name="lucide:arrow-right" class="w-4 h-4" />
          </NuxtLink>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <SkillCard v-for="skill in featuredSkills" :key="skill.id" :skill="skill" />
        </div>

        <div class="mt-8 text-center sm:hidden">
          <NuxtLink to="/skills" class="btn-secondary">
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
            :to="`/skills?category=${cat.key}`"
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
            </div>
            <!-- Code preview -->
            <div class="rounded-lg p-6 font-mono text-sm" style="background: #fafafa; box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 1.9px 0px inset;">
              <div class="flex items-center gap-2 mb-5 text-mid-gray">
                <div class="w-3 h-3 rounded-full" style="background: #ddd;" />
                <div class="w-3 h-3 rounded-full" style="background: #ddd;" />
                <div class="w-3 h-3 rounded-full" style="background: #ddd;" />
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
  title: 'EverythingSkill — 万物皆可 Skill | 开源 AI Skill 发现平台',
  meta: [
    { name: 'description', content: '一切皆可蒸馏为 Skill。发现、分享、使用最好的开源 AI Skill，让 AI 真正理解每一种能力。收录 42 个高质量 Skill，覆盖职场、名人思维、人格蒸馏等 9 大分类。' },
    { property: 'og:title', content: 'EverythingSkill — 万物皆可 Skill' },
    { property: 'og:description', content: '开源 AI Skill 发现与分享平台。一切皆可蒸馏为 Skill。' },
    { property: 'og:url', content: 'https://everythingskill.net' },
  ],
  link: [{ rel: 'canonical', href: 'https://everythingskill.net' }],
  script: [{
    type: 'application/ld+json',
    children: JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: 'EverythingSkill',
      url: 'https://everythingskill.net',
      description: '开源 AI Skill 发现与分享平台。一切皆可蒸馏为 Skill。',
      potentialAction: {
        '@type': 'SearchAction',
        target: { '@type': 'EntryPoint', urlTemplate: 'https://everythingskill.net/skills?q={search_term_string}' },
        'query-input': 'required name=search_term_string',
      },
    }),
  }],
})
</script>
