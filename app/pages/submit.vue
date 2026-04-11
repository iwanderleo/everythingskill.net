<template>
  <div class="bg-white">
    <div class="mx-auto max-w-5xl px-6 py-section">
      <NuxtLink :to="localePath('/skills')" class="inline-flex items-center gap-1.5 text-sm text-mid-gray hover:text-charcoal transition-colors mb-10">
        <Icon name="lucide:arrow-left" class="w-4 h-4" />
        {{ $t('submitPage.back') }}
      </NuxtLink>

      <h1 class="font-display text-display-section text-charcoal mb-3" style="line-height: 1.10;">{{ $t('submitPage.title') }}</h1>
      <p class="text-mid-gray mb-10" style="line-height: 1.50; font-weight: 300;">{{ $t('submitPage.subtitle') }}</p>

      <div class="grid lg:grid-cols-[1fr_288px] gap-10 xl:gap-14 items-start">

        <!-- Left: Form -->
        <form class="space-y-6" @submit.prevent="handleSubmit">
          <!-- GitHub URL — most important, first -->
          <div>
            <label class="block text-sm font-semibold text-charcoal mb-2">{{ $t('submitPage.githubLabel') }}</label>
            <input
              v-model="form.github"
              type="url"
              required
              placeholder="https://github.com/username/repo"
              class="form-input"
            >
          </div>

          <!-- Skill Name -->
          <div>
            <label class="block text-sm font-semibold text-charcoal mb-2">{{ $t('submitPage.nameLabel') }}</label>
            <input
              v-model="form.name"
              type="text"
              required
              :placeholder="$t('submitPage.namePlaceholder')"
              class="form-input"
            >
          </div>

          <!-- Description -->
          <div>
            <label class="block text-sm font-semibold text-charcoal mb-2">{{ $t('submitPage.descriptionLabel') }}</label>
            <textarea
              v-model="form.description"
              required
              rows="3"
              :placeholder="$t('submitPage.descriptionPlaceholder')"
              class="form-input resize-none"
            />
          </div>

          <!-- Category -->
          <div>
            <label class="block text-sm font-semibold text-charcoal mb-2">{{ $t('submitPage.categoryLabel') }}</label>
            <select
              v-model="form.category"
              required
              class="form-input"
            >
              <option value="" disabled>{{ $t('submitPage.categoryPlaceholder') }}</option>
              <option v-for="cat in categories" :key="cat.key" :value="cat.key">
                {{ locale === 'zh' ? cat.labelZh : cat.label }}
              </option>
            </select>
          </div>

          <!-- Author -->
          <div>
            <label class="block text-sm font-semibold text-charcoal mb-2">{{ $t('submitPage.authorLabel') }}</label>
            <input
              v-model="form.author"
              type="text"
              :placeholder="$t('submitPage.authorPlaceholder')"
              class="form-input"
            >
          </div>

          <!-- Submit -->
          <div class="pt-2">
            <button
              type="submit"
              class="btn-primary w-full text-base px-6 py-3.5 flex items-center justify-center gap-2"
            >
              <Icon name="lucide:github" class="w-4 h-4" />
              {{ $t('submitPage.submit') }}
            </button>
            <p class="text-xs text-mid-gray/60 text-center mt-3">{{ $t('submitPage.submitHint') }}</p>
          </div>
        </form>

        <!-- Right: Sticky sidebar -->
        <div class="lg:sticky lg:top-8 space-y-4">
          <!-- How it works -->
          <div class="skill-card p-5">
            <h3 class="text-sm font-semibold text-charcoal mb-4">{{ $t('submitPage.howTitle') }}</h3>
            <ol class="space-y-3">
              <li class="flex gap-3 text-sm text-mid-gray" style="line-height: 1.55;">
                <span class="flex-shrink-0 w-5 h-5 rounded-full bg-mid-gray/10 flex items-center justify-center text-[11px] font-semibold text-charcoal">1</span>
                {{ $t('submitPage.how1') }}
              </li>
              <li class="flex gap-3 text-sm text-mid-gray" style="line-height: 1.55;">
                <span class="flex-shrink-0 w-5 h-5 rounded-full bg-mid-gray/10 flex items-center justify-center text-[11px] font-semibold text-charcoal">2</span>
                {{ $t('submitPage.how2') }}
              </li>
              <li class="flex gap-3 text-sm text-mid-gray" style="line-height: 1.55;">
                <span class="flex-shrink-0 w-5 h-5 rounded-full bg-mid-gray/10 flex items-center justify-center text-[11px] font-semibold text-charcoal">3</span>
                {{ $t('submitPage.how3') }}
              </li>
            </ol>
          </div>

          <!-- Notes -->
          <div class="skill-card p-5">
            <h3 class="text-sm font-semibold text-charcoal mb-4">{{ $t('submitPage.notesTitle') }}</h3>
            <ul class="text-sm text-mid-gray space-y-2.5" style="line-height: 1.55;">
              <li class="flex items-start gap-2">
                <span class="text-charcoal mt-0.5">·</span>{{ $t('submitPage.note1') }}
              </li>
              <li class="flex items-start gap-2">
                <span class="text-charcoal mt-0.5">·</span>{{ $t('submitPage.note2') }}
              </li>
              <li class="flex items-start gap-2">
                <span class="text-charcoal mt-0.5">·</span>{{ $t('submitPage.note3') }}
              </li>
              <li class="flex items-start gap-2">
                <span class="text-charcoal mt-0.5">·</span>{{ $t('submitPage.note4') }}
              </li>
            </ul>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { categories } from '~/data/skills'

const { locale } = useI18n()
const localePath = useLocalePath()
const pageUrl = computed(() => `https://everythingskill.net${localePath('/submit')}`)

const form = reactive({
  name: '',
  description: '',
  github: '',
  category: '',
  author: '',
})

function handleSubmit() {
  const title = encodeURIComponent(`[Skill] ${form.name || form.github}`)
  const bodyLines = [
    `**GitHub Repository URL**\n${form.github}`,
    form.name ? `**Skill Name**\n${form.name}` : '',
    form.description ? `**Description**\n${form.description}` : '',
    form.category ? `**Category**\n${form.category}` : '',
    form.author ? `**Author**\n${form.author}` : '',
  ].filter(Boolean)
  const body = encodeURIComponent(bodyLines.join('\n\n'))
  window.open(
    `https://github.com/iwanderleo/everythingskill.net/issues/new?title=${title}&labels=new-skill&body=${body}`,
    '_blank',
    'noopener',
  )
}

useHead({
  title: computed(() => locale.value === 'zh' ? '提交 Skill — 加入 EverythingSkill 开源目录' : 'Submit a Skill — EverythingSkill'),
  meta: computed(() => {
    const description = locale.value === 'zh'
      ? '将你的开源 .skill 文件提交到 EverythingSkill 目录，让更多人发现和使用你的 AI Skill。'
      : 'Submit your open-source .skill file to the EverythingSkill directory.'

    return [
      { name: 'description', content: description },
      { property: 'og:title', content: locale.value === 'zh' ? '提交 Skill — EverythingSkill' : 'Submit a Skill — EverythingSkill' },
      { property: 'og:url', content: pageUrl.value },
    ]
  }),
})
</script>

