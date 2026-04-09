<template>
  <div class="bg-white">
    <div class="mx-auto max-w-container px-6 py-section">
      <!-- Header with tab switcher -->
      <div class="mb-10">
        <div class="flex items-end gap-6 mb-3">
          <NuxtLink
            to="/rankings/hot"
            class="font-display text-display-section text-mid-gray/30 hover:text-mid-gray/60 transition-colors pb-0.5"
            style="line-height: 1.10;"
          >
            {{ $t('nav.hot') }}
          </NuxtLink>
          <h1 class="font-display text-display-section text-charcoal" style="line-height: 1.10;">
            {{ $t('nav.newSkills') }}
          </h1>
        </div>
        <p class="text-mid-gray" style="line-height: 1.50; font-weight: 300;">
          {{ $t('rankings.newSubtitle') }}
        </p>
      </div>

      <!-- Ranked list -->
      <div class="flex flex-col divide-y" style="border: 1px solid rgba(34,42,53,0.07); border-radius: 12px; overflow: hidden;">
        <NuxtLink
          v-for="(skill, index) in newSkills"
          :key="skill.id"
          :to="`/skills/${getSkillSlug(skill)}`"
          class="group flex items-center gap-5 px-6 py-4 bg-white hover:bg-light-gray transition-colors"
        >
          <!-- Rank number -->
          <div class="shrink-0 w-7 text-center">
            <span
              class="font-display font-semibold tabular-nums"
              :class="{
                'text-charcoal text-xl': index < 3,
                'text-mid-gray/40 text-base': index >= 3,
              }"
            >{{ index + 1 }}</span>
          </div>

          <!-- Skill info -->
          <div class="flex-1 min-w-0">
            <div class="flex items-center gap-2 mb-0.5">
              <span class="font-display text-[15px] font-semibold text-charcoal truncate">
                {{ locale === 'en' ? skill.name : skill.nameZh }}
              </span>
              <!-- New badge for first 5 -->
              <span v-if="index < 5" class="shrink-0 status-chip">
                New
              </span>
            </div>
            <p class="text-[13px] text-mid-gray truncate">
              {{ locale === 'en' ? skill.summary : skill.summaryZh }}
            </p>
          </div>

          <!-- Category badge -->
          <span class="hidden sm:flex badge text-[11px] py-0.5 px-2 shrink-0">
            <Icon :name="getCategoryInfo(skill.category)?.icon || 'lucide:box'" class="w-3 h-3 mr-1" />
            {{ locale === 'en' ? getCategoryInfo(skill.category)?.label : getCategoryInfo(skill.category)?.labelZh }}
          </span>

          <!-- Stars -->
          <div class="shrink-0 flex items-center gap-1 text-sm font-semibold text-charcoal min-w-[3rem] justify-end">
            <Icon name="lucide:star" class="w-3.5 h-3.5 text-mid-gray/60" />
            <span>{{ skill.stars != null ? formatStars(skill.stars) : '—' }}</span>
          </div>

          <!-- Arrow -->
          <Icon name="lucide:chevron-right" class="w-4 h-4 text-mid-gray/30 group-hover:text-charcoal transition-colors shrink-0" />
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { skills, getSkillSlug, getCategoryInfo } from '~/data/skills'

const { locale } = useI18n()

const newSkills = computed(() =>
  [...skills].sort((left, right) => {
    const dateDelta = Date.parse(right.addedAt) - Date.parse(left.addedAt)
    if (dateDelta !== 0) return dateDelta
    return right.slug.localeCompare(left.slug)
  })
)

function formatStars(n: number): string {
  if (n >= 1000) return `${(n / 1000).toFixed(1)}k`
  return n.toString()
}

useHead({
  title: '新榜 — 最新收录的 AI Skill | EverythingSkill',
  meta: [
    { name: 'description', content: '按收录时间排行的 AI Skill 新榜，发现最新加入的开源 Skill。' },
    { property: 'og:title', content: '新榜 — EverythingSkill' },
    { property: 'og:url', content: 'https://everythingskill.net/rankings/new' },
  ],
  link: [{ rel: 'canonical', href: 'https://everythingskill.net/rankings/new' }],
})
</script>
