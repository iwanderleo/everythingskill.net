<template>
  <NuxtLink :to="localePath(`/skills/${getSkillSlug(skill)}`)" class="skill-card group flex flex-col">
    <!-- Header: Name + Featured badge -->
    <div class="flex items-start justify-between gap-3 mb-1">
      <h3 class="font-display text-lg font-medium text-charcoal" style="line-height: 1.20;">
        {{ skillName }}
      </h3>
      <span v-if="skill.featured" class="status-chip shrink-0 mt-0.5">
        {{ $t('skill.featured') }}
      </span>
    </div>

    <!-- Filename -->
    <p class="text-xs text-mid-gray/70 font-mono mb-3">{{ skill.name }}</p>

    <!-- Description -->
    <p class="text-[13px] text-mid-gray leading-relaxed line-clamp-2 mb-auto" style="line-height: 1.60;">
      {{ skillDescription }}
    </p>

    <!-- Footer -->
    <div class="flex items-center justify-between mt-5 pt-4 text-xs text-mid-gray subtle-divider-top">
      <div class="flex items-center gap-3">
        <span class="badge text-[11px] py-0.5 px-2">
          <Icon :name="categoryInfo?.icon || 'lucide:box'" class="w-3 h-3 mr-1" />
          {{ locale === 'en' ? categoryInfo?.label : categoryInfo?.labelZh }}
        </span>
      </div>
      <div class="flex items-center gap-3">
        <span v-if="skill.stars != null" class="flex items-center gap-1 text-mid-gray/70">
          <Icon name="lucide:star" class="w-3 h-3" />
          {{ formatStars(skill.stars) }}
        </span>
        <span v-if="skill.githubStatus === 404" class="flex items-center gap-1 text-amber-500/80">
          <Icon name="lucide:alert-triangle" class="w-3 h-3" />
          {{ $t('skill.sourceUnavailable') }}
        </span>
      </div>
    </div>
  </NuxtLink>
</template>

<script setup lang="ts">
import { getCategoryInfo, getSkillSlug, type Skill } from '~/data/skills'

const props = defineProps<{ skill: Skill }>()
const { locale } = useI18n()
const localePath = useLocalePath()
const categoryInfo = computed(() => getCategoryInfo(props.skill.category))

const skillName = computed(() => locale.value === 'en' ? props.skill.name : props.skill.nameZh)
const skillDescription = computed(() => locale.value === 'en' ? props.skill.summary : props.skill.summaryZh)

function formatStars(n: number): string {
  if (n >= 1000) return `${(n / 1000).toFixed(1)}k`
  return n.toString()
}
</script>
