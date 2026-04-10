<template>
  <div class="bg-white min-h-screen">
    <div class="mx-auto max-w-container px-6 py-12">

      <!-- Not found -->
      <div v-if="!skill" class="text-center py-section">
        <Icon name="lucide:file-question" class="w-12 h-12 text-mid-gray/40 mx-auto mb-4" />
        <h2 class="font-display text-display-feature text-charcoal mb-3">{{ $t('skill.notFound') }}</h2>
        <p class="text-mid-gray mb-8">{{ $t('skill.notFoundDesc') }}</p>
        <NuxtLink :to="localePath('/skills')" class="btn-primary">{{ $t('skill.notFoundCta') }}</NuxtLink>
      </div>

      <template v-else>
        <!-- Back nav -->
        <NuxtLink :to="localePath('/skills')" class="inline-flex items-center gap-1.5 text-sm text-mid-gray hover:text-charcoal transition-colors mb-10">
          <Icon name="lucide:arrow-left" class="w-4 h-4" />
          {{ $t('skill.backToDir') }}
        </NuxtLink>

        <!-- 2-column layout: main + sidebar -->
        <div class="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_272px] gap-10 xl:gap-12 items-start">

          <!-- ── Left: Main content ── -->
          <div class="min-w-0">
            <!-- Header -->
            <div class="mb-7">
              <h1 class="font-display text-display-hero text-charcoal mb-2" style="line-height: 1.08;">{{ skillName }}</h1>
              <p class="text-mid-gray font-mono text-sm">{{ skill.name }}</p>
            </div>

            <!-- Summary tagline -->
            <p class="max-w-3xl text-[22px] sm:text-[24px] text-charcoal mb-6 leading-relaxed" style="font-weight: 500; line-height: 1.55;">
              {{ skillDescription }}
            </p>

            <!-- Source status -->
            <div v-if="skill.githubStatus === 404" class="flex items-start gap-2.5 rounded-md px-4 py-3 mb-6" style="background: #fffbeb; box-shadow: rgba(217,119,6,0.2) 0px 0px 0px 1px;">
              <Icon name="lucide:alert-triangle" class="w-4 h-4 text-amber-500 mt-0.5 shrink-0" />
              <p class="text-sm text-amber-700" style="line-height: 1.65;">
                <span class="font-semibold">{{ $t('skill.github404Warning') }}</span>
              </p>
            </div>

            <!-- Why it matters -->
            <div v-if="locale !== 'en' && skill.detailIntroZh" class="detail-panel detail-panel-soft rounded-xl px-6 py-6 mb-10">
              <h2 class="font-display text-lg font-semibold text-charcoal mb-4">{{ $t('skill.whyItMatters') }}</h2>
              <template v-for="(para, i) in skill.detailIntroZh.split('\n\n')" :key="i">
                <p class="detail-copy text-[15px] mb-4 last:mb-0" style="line-height: 1.85; font-weight: 400;">{{ para }}</p>
              </template>
            </div>

            <!-- README section -->
            <div id="readme-section" v-if="!skill.githubStatus" class="mb-10 scroll-mt-8">
              <div class="flex items-center justify-between mb-4">
                <h2 class="font-display text-base font-semibold text-charcoal flex items-center gap-2">
                  <Icon name="lucide:book-open" class="w-4 h-4 text-mid-gray" />
                  {{ $t('skill.readmeTitle') }}
                </h2>
                <!-- Language tabs -->
                <div v-if="readmeEnHtml" class="detail-tab-group flex items-center gap-1 rounded-pill p-0.5">
                  <button
                    :class="['px-3 py-1 text-xs font-semibold rounded-pill transition-colors', readmeTab === 'zh' ? 'bg-charcoal text-white' : 'text-mid-gray hover:text-charcoal']"
                    @click="readmeTab = 'zh'"
                  >
                    {{ $t('skill.readmeZh') }}
                  </button>
                  <button
                    :class="['px-3 py-1 text-xs font-semibold rounded-pill transition-colors', readmeTab === 'en' ? 'bg-charcoal text-white' : 'text-mid-gray hover:text-charcoal']"
                    @click="readmeTab = 'en'"
                  >
                    {{ $t('skill.readmeEn') }}
                  </button>
                </div>
              </div>

              <!-- Loading -->
              <div v-if="readmeLoading" class="detail-panel detail-panel-soft rounded-lg p-6">
                <div class="space-y-3 animate-pulse">
                  <div class="h-4 bg-mid-gray/10 rounded w-3/4" />
                  <div class="h-3 bg-mid-gray/10 rounded w-full" />
                  <div class="h-3 bg-mid-gray/10 rounded w-5/6" />
                  <div class="h-3 bg-mid-gray/10 rounded w-2/3" />
                </div>
                <p class="text-xs text-mid-gray/60 mt-4">{{ $t('skill.readmeLoading') }}</p>
              </div>

              <!-- No README -->
              <div v-else-if="!readmeHtml && !readmeEnHtml" class="detail-panel detail-panel-soft rounded-lg px-6 py-5 text-center">
                <Icon name="lucide:file-x" class="w-8 h-8 text-mid-gray/30 mx-auto mb-2" />
                <p class="text-sm text-mid-gray/70">{{ $t('skill.readmeNotFound') }}</p>
              </div>

              <!-- README content -->
              <div v-else class="detail-panel detail-panel-soft readme-shell rounded-xl px-7 py-6" style="max-height: 680px; overflow-y: auto; scrollbar-width: thin; scrollbar-color: rgba(0,0,0,0.15) transparent; font-size: 13px;">
                <!-- eslint-disable vue/no-v-html -->
                <div
                  class="markdown-body readme-content"
                  v-html="readmeTab === 'en' && readmeEnHtml ? readmeEnHtml : (readmeHtml ?? readmeEnHtml ?? '')"
                />
              </div>
            </div>

            <!-- How to use -->
            <div class="detail-panel detail-panel-soft rounded-xl px-6 py-6 mb-8">
              <h2 class="font-display text-lg font-semibold text-charcoal mb-5 flex items-center gap-2">
                <Icon name="lucide:zap" class="w-4 h-4 text-mid-gray" />
                {{ $t('skill.howToUse') }}
              </h2>
              <ol class="space-y-4">
                <li class="flex gap-4">
                  <span class="detail-step-dot flex-shrink-0 flex items-center justify-center w-6 h-6 rounded-full text-[11px] font-semibold text-charcoal">1</span>
                  <div>
                    <p class="text-sm font-semibold text-charcoal mb-0.5">{{ $t('skill.step1Title') }}</p>
                    <p class="detail-copy text-sm" style="line-height: 1.65;">{{ $t('skill.step1Desc') }}</p>
                  </div>
                </li>
                <li class="flex gap-4">
                  <span class="detail-step-dot flex-shrink-0 flex items-center justify-center w-6 h-6 rounded-full text-[11px] font-semibold text-charcoal">2</span>
                  <div>
                    <p class="text-sm font-semibold text-charcoal mb-0.5">{{ $t('skill.step2Title') }}</p>
                    <p class="detail-copy text-sm" style="line-height: 1.65;">{{ $t('skill.step2Desc') }}</p>
                  </div>
                </li>
                <li class="flex gap-4">
                  <span class="detail-step-dot flex-shrink-0 flex items-center justify-center w-6 h-6 rounded-full text-[11px] font-semibold text-charcoal">3</span>
                  <div>
                    <p class="text-sm font-semibold text-charcoal mb-0.5">{{ $t('skill.step3Title') }}</p>
                    <p class="detail-copy text-sm" style="line-height: 1.65;">{{ $t('skill.step3DescPrefix') }} {{ skillName }} {{ $t('skill.step3DescSuffix') }}</p>
                  </div>
                </li>
              </ol>
            </div>

            <!-- Related Skills -->
            <div v-if="relatedSkills.length" class="mt-14 pt-10" style="border-top: 1px solid rgba(0,0,0,0.06);">
              <h2 class="font-display text-display-feature text-charcoal mb-7">{{ $t('skill.related') }}</h2>
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <SkillCard v-for="s in relatedSkills" :key="s.id" :skill="s" />
              </div>
            </div>
          </div>

          <!-- ── Right: Sidebar ── -->
          <div class="lg:sticky lg:top-8 space-y-4">
            <!-- Meta card -->
            <div class="detail-panel rounded-xl bg-white p-6 space-y-5">
              <div class="flex flex-wrap gap-2">
                <span class="badge text-[11px] py-1 px-2.5 text-charcoal">
                  <Icon :name="categoryInfo?.icon || 'lucide:box'" class="w-3 h-3 mr-1" />
                  {{ locale === 'en' ? categoryInfo?.label : categoryInfo?.labelZh }}
                </span>
                <span v-if="skill.featured" class="status-chip inline-flex items-center">
                  {{ $t('skill.featured') }}
                </span>
              </div>
              <div class="subtle-divider-top" />
              <!-- Repository -->
              <div>
                <p class="text-[11px] font-semibold uppercase tracking-wider text-mid-gray/70 mb-3">{{ $t('skill.repositoryLabel') }}</p>
                <a :href="skill.github" target="_blank" rel="noopener" class="inline-flex items-center gap-2 text-sm font-medium text-charcoal hover:text-mid-gray transition-colors">
                  <Icon name="lucide:github" class="w-4 h-4 text-mid-gray" />
                  {{ ownerRepo || skill.author }}
                </a>
              </div>
            </div>

            <!-- Stars -->
            <component
              :is="starHistoryUrl ? 'a' : 'div'"
              :href="starHistoryUrl || undefined"
              :target="starHistoryUrl ? '_blank' : undefined"
              :rel="starHistoryUrl ? 'noopener' : undefined"
              class="detail-panel block rounded-xl bg-white p-5 space-y-4"
              :class="starHistoryUrl ? 'transition-shadow hover:shadow-[0_8px_24px_rgba(34,42,53,0.08)]' : ''"
            >
              <div class="flex items-start justify-between gap-3">
                <p class="text-[11px] font-semibold uppercase tracking-wider text-mid-gray/70">STAR</p>
                <div class="flex items-center gap-2 text-2xl font-semibold text-charcoal">
                  <Icon name="lucide:star" class="w-5 h-5 text-mid-gray" />
                  {{ skill.stars != null ? skill.stars.toLocaleString() : $t('skill.quickUnknown') }}
                </div>
              </div>
              <div v-if="!skill.githubStatus && ownerRepo" class="block">
                <img
                  :src="`https://api.star-history.com/svg?repos=${ownerRepo}&type=Date`"
                  :alt="`${skill.name} stars trend`"
                  loading="lazy"
                  class="w-full rounded-md detail-chart-surface"
                  style="min-height: 120px;"
                >
              </div>
              <div class="pt-3 subtle-divider-top">
                <div class="space-y-2">
                  <div class="flex items-center gap-2 text-xs text-mid-gray/80">
                    <Icon name="lucide:refresh-cw" class="w-3.5 h-3.5 text-mid-gray/70" />
                    <span>{{ $t('skill.updatedAtLabel') }}</span>
                    <span class="ml-auto text-charcoal/70">{{ formatDate(skill.updatedAt) }}</span>
                  </div>
                  <div class="flex items-center gap-2 text-xs text-mid-gray/80">
                    <Icon name="lucide:calendar-plus-2" class="w-3.5 h-3.5 text-mid-gray/70" />
                    <span>{{ $t('skill.addedAtLabel') }}</span>
                    <span class="ml-auto text-charcoal/70">{{ formatDate(skill.addedAt) }}</span>
                  </div>
                </div>
              </div>
            </component>

          </div>

        </div>
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import { skills, getCategoryInfo, getSkillBySlug, getSkillSlug, type Skill } from '~/data/skills'

const { locale, t } = useI18n()
const localePath = useLocalePath()
const route = useRoute()
const skillSlug = route.params.id as string
const skill = computed(() => getSkillBySlug(skillSlug))
const categoryInfo = computed(() => skill.value ? getCategoryInfo(skill.value.category) : undefined)

const skillName = computed(() => locale.value === 'en' ? (skill.value?.name ?? '') : (skill.value?.nameZh ?? ''))
const skillDescription = computed(() => locale.value === 'en' ? (skill.value?.summary ?? '') : (skill.value?.summaryZh ?? ''))

const relatedSkills = computed(() => {
  if (!skill.value) return []
  return skills
    .filter(s => getSkillSlug(s) !== skillSlug && s.category === skill.value!.category)
    .slice(0, 4)
})

// Extract "owner/repo" from github URL for star-history embed
const ownerRepo = computed(() => {
  const url = skill.value?.github ?? ''
  const match = url.match(/github\.com\/([^/]+\/[^/]+)/)
  return match ? match[1] : ''
})

const starHistoryUrl = computed(() => {
  if (skill.value?.githubStatus || !ownerRepo.value) return ''
  return `https://star-history.com/#${ownerRepo.value}&Date`
})

// README
const currentSkill = getSkillBySlug(skillSlug)
const { readmeHtml, readmeEnHtml, loading: readmeLoading } = useSkillReadme(
  skillSlug,
  currentSkill?.github ?? '',
  !currentSkill || currentSkill.githubStatus === 404,
)
const readmeTab = ref<'zh' | 'en'>('zh')

function formatDate(value: string) {
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return value
  return new Intl.DateTimeFormat(locale.value === 'zh' ? 'zh-CN' : 'en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }).format(date)
}

useHead({
  title: computed(() => {
    if (!skill.value) return t('skill.notFound')
    return locale.value === 'zh'
      ? `${skill.value.nameZh} (${skill.value.name}) — EverythingSkill`
      : `${skill.value.name} — EverythingSkill`
  }),
  meta: computed(() => skill.value ? [
    { name: 'description', content: locale.value === 'zh' ? skill.value.summaryZh : skill.value.summary },
    { name: 'keywords', content: [skill.value.nameZh, skill.value.name, ...skill.value.tags, 'AI Skill', 'skill文件'].join(', ') },
    { property: 'og:title', content: locale.value === 'zh' ? `${skill.value.nameZh} — EverythingSkill` : `${skill.value.name} — EverythingSkill` },
    { property: 'og:description', content: locale.value === 'zh' ? skill.value.summaryZh : skill.value.summary },
    { property: 'og:url', content: `https://everythingskill.net${localePath(`/skills/${getSkillSlug(skill.value)}`)}` },
    { property: 'og:type', content: 'article' },
    { name: 'twitter:title', content: locale.value === 'zh' ? `${skill.value.nameZh} — EverythingSkill` : `${skill.value.name} — EverythingSkill` },
    { name: 'twitter:description', content: locale.value === 'zh' ? skill.value.summaryZh : skill.value.summary },
  ] : []),
  script: computed(() => skill.value ? [
    {
      type: 'application/ld+json',
      children: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'SoftwareApplication',
        name: locale.value === 'zh' ? skill.value.nameZh : skill.value.name,
        alternateName: skill.value.name,
        description: locale.value === 'zh' ? skill.value.summaryZh : skill.value.summary,
        url: `https://everythingskill.net${localePath(`/skills/${getSkillSlug(skill.value)}`)}`,
        inLanguage: locale.value === 'zh' ? 'zh-CN' : 'en',
        applicationCategory: 'Productivity',
        operatingSystem: 'Web',
        offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
        author: { '@type': 'Person', name: skill.value.author },
        codeRepository: skill.value.github,
        keywords: skill.value.tags.join(', '),
        ...(skill.value.stars ? { aggregateRating: { '@type': 'AggregateRating', ratingValue: '5', reviewCount: skill.value.stars } } : {}),
      }),
    },
  ] : []),
})
</script>

