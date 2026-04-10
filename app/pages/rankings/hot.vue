<template>
  <div class="bg-white">
    <div class="mx-auto max-w-container px-6 py-section">
      <!-- Header with tab switcher -->
      <div class="mb-10">
        <div class="flex items-end gap-6 mb-3">
          <h1 class="font-display text-display-section text-charcoal" style="line-height: 1.10;">
            {{ $t('nav.hot') }}
          </h1>
          <NuxtLink
            :to="localePath('/rankings/new')"
            class="font-display text-display-section text-mid-gray/30 hover:text-mid-gray/60 transition-colors pb-0.5"
            style="line-height: 1.10;"
          >
            {{ $t('nav.newSkills') }}
          </NuxtLink>
        </div>
        <p class="text-mid-gray" style="line-height: 1.50; font-weight: 300;">
          {{ $t('rankings.hotSubtitle') }}
        </p>
        <p class="mt-3 flex items-center gap-1.5 text-xs text-mid-gray/60">
          <Icon name="lucide:refresh-cw" class="w-3 h-3" />
          {{ $t('skills.syncedAt', { date: lastSyncedAt }) }}
        </p>
      </div>

      <!-- Ranked list -->
      <div class="flex flex-col divide-y" style="border: 1px solid rgba(34,42,53,0.07); border-radius: 12px; overflow: hidden;">
        <NuxtLink
          v-for="(skill, index) in hotSkills"
          :key="skill.id"
          :to="localePath(`/skills/${getSkillSlug(skill)}`)"
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
              <span v-if="skill.featured" class="hidden sm:inline shrink-0 status-chip">
                {{ $t('skill.featured') }}
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
import { skills, lastSyncedAt, getSkillSlug, getCategoryInfo } from '~/data/skills'

const { locale } = useI18n()
const localePath = useLocalePath()
const pageUrl = computed(() => `https://everythingskill.net${localePath('/rankings/hot')}`)

const hotSkills = computed(() =>
  [...skills].sort((a, b) => (b.stars ?? 0) - (a.stars ?? 0))
)

function formatStars(n: number): string {
  if (n >= 1000) return `${(n / 1000).toFixed(1)}k`
  return n.toString()
}

useHead({
  title: computed(() => locale.value === 'zh' ? '热榜 — Stars 最多的 AI Skill | EverythingSkill' : 'Hot Rankings — Most Starred AI Skills | EverythingSkill'),
  meta: computed(() => {
    const description = locale.value === 'zh'
      ? '按 GitHub Stars 排行的 AI Skill 榜单，实时反映社区最受欢迎的开源 Skill。'
      : 'AI Skill rankings sorted by GitHub stars, showing the most popular open-source Skills in the community.'

    return [
      { name: 'description', content: description },
      { property: 'og:title', content: locale.value === 'zh' ? '热榜 — EverythingSkill' : 'Hot Rankings — EverythingSkill' },
      { property: 'og:url', content: pageUrl.value },
    ]
  }),
})
</script>
