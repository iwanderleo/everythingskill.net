<template>
  <div class="bg-white">
    <div class="mx-auto max-w-container px-6 py-section">
      <!-- Header -->
      <div class="mb-10">
        <h1 class="font-display text-display-section text-charcoal" style="line-height: 1.10;">{{ $t('skills.title') }}</h1>
        <p class="text-mid-gray mt-3" style="line-height: 1.50; font-weight: 300;">{{ $t('skills.subtitle') }}</p>
        <p class="mt-3 flex items-center gap-1.5 text-xs text-mid-gray/60">
          <Icon name="lucide:refresh-cw" class="w-3 h-3" />
          {{ $t('skills.syncedAt', { date: lastSyncedAt }) }}
        </p>
      </div>

      <!-- Search -->
      <div class="relative mb-6">
        <Icon name="lucide:search" class="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-mid-gray" />
        <input
          v-model="searchQuery"
          type="text"
          :placeholder="$t('skills.searchPlaceholder')"
          class="w-full rounded-md bg-white pl-12 pr-4 py-3 text-sm text-charcoal placeholder:text-mid-gray/60 focus:outline-none transition-shadow"
          style="box-shadow: rgba(34, 42, 53, 0.08) 0px 0px 0px 1px; font-family: Inter, system-ui, sans-serif;"
          @focus="($event.target as HTMLInputElement).style.boxShadow = 'rgba(34, 42, 53, 0.08) 0px 0px 0px 1px, 0 0 0 2px rgba(59, 130, 246, 0.5)'"
          @blur="($event.target as HTMLInputElement).style.boxShadow = 'rgba(34, 42, 53, 0.08) 0px 0px 0px 1px'"
        >
      </div>

      <!-- Category Filter -->
      <div class="mb-10">
        <CategoryFilter v-model="selectedCategory" />
      </div>

      <!-- Results count -->
      <div class="mb-6 text-sm text-mid-gray">
        {{ $t('skills.resultsCount', { count: filteredSkills.length }) }}
      </div>

      <!-- Grid -->
      <div v-if="filteredSkills.length" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <SkillCard v-for="skill in filteredSkills" :key="skill.id" :skill="skill" />
      </div>

      <!-- Empty state -->
      <div v-else class="text-center py-section">
        <Icon name="lucide:search-x" class="w-12 h-12 text-mid-gray/40 mx-auto mb-4" />
        <p class="text-mid-gray">{{ $t('skills.noResults') }}</p>
        <button class="text-sm text-charcoal font-medium hover:opacity-70 mt-3 cursor-pointer" @click="searchQuery = ''; selectedCategory = undefined">
          {{ $t('skills.clearFilters') }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { skills, searchSkills, lastSyncedAt, getSkillSlug, type SkillCategory } from '~/data/skills'

const route = useRoute()
const { locale } = useI18n()
const localePath = useLocalePath()
const pageUrl = computed(() => `https://everythingskill.net${localePath('/skills')}`)

const searchQuery = ref('')
const selectedCategory = ref<SkillCategory | undefined>(
  route.query.category as SkillCategory | undefined
)

watch(() => route.query.category, (val) => {
  selectedCategory.value = val as SkillCategory | undefined
})

const filteredSkills = computed(() => {
  let result = searchQuery.value ? searchSkills(searchQuery.value) : [...skills]

  if (selectedCategory.value) {
    result = result.filter(s => s.category === selectedCategory.value)
  }

  // featured first, then by stars descending
  result.sort((a, b) => {
    if (a.featured !== b.featured) return a.featured ? -1 : 1
    return (b.stars ?? 0) - (a.stars ?? 0)
  })

  return result
})

useHead({
  title: computed(() => locale.value === 'zh'
    ? `Skills — 全部 ${skills.length} 个开源 AI Skill | EverythingSkill`
    : `Skills — ${skills.length} Open-source AI Skills | EverythingSkill`),
  meta: computed(() => {
    const description = locale.value === 'zh'
      ? `浏览 EverythingSkill 收录的全部开源 AI Skill，覆盖多个分类，共 ${skills.length} 个精选 Skill。`
      : `Browse all ${skills.length} open-source AI Skills on EverythingSkill across workplace, celebrity, persona, relationship, and more.`

    return [
      { name: 'description', content: description },
      { property: 'og:title', content: locale.value === 'zh' ? 'Skills — EverythingSkill' : 'Skills — EverythingSkill' },
      { property: 'og:description', content: description },
      { property: 'og:url', content: pageUrl.value },
    ]
  }),
  script: computed(() => [{
    type: 'application/ld+json',
    children: JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'ItemList',
      name: locale.value === 'zh' ? 'EverythingSkill Skills' : 'EverythingSkill Skills',
      url: pageUrl.value,
      numberOfItems: skills.length,
      itemListElement: skills.slice(0, 20).map((skill, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: locale.value === 'zh' ? skill.nameZh : skill.name,
        url: `https://everythingskill.net${localePath(`/skills/${getSkillSlug(skill)}`)}`,
        description: locale.value === 'zh' ? skill.summaryZh : skill.summary,
      })),
    }),
  }]),
})
</script>
