<template>
  <div class="bg-white">
    <div class="mx-auto max-w-4xl px-6 py-section">
      <NuxtLink :to="localePath('/skills')" class="inline-flex items-center gap-1.5 text-sm text-mid-gray hover:text-charcoal transition-colors mb-10">
        <Icon name="lucide:arrow-left" class="w-4 h-4" />
        {{ $t('submitPage.back') }}
      </NuxtLink>

      <h1 class="font-display text-display-section text-charcoal mb-3" style="line-height: 1.10;">{{ $t('submitPage.title') }}</h1>
      <p class="text-mid-gray mb-10" style="line-height: 1.50; font-weight: 300;">{{ $t('submitPage.subtitle') }}</p>

      <form class="space-y-8" @submit.prevent="handleSubmit">
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

        <!-- GitHub URL -->
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
            required
            placeholder="your-github-username"
            class="form-input"
          >
        </div>

        <!-- Submit -->
        <div class="pt-2">
          <button
            type="submit"
            :disabled="submitted"
            :class="[
              'w-full text-base px-6 py-3.5',
              submitted ? 'btn-secondary cursor-not-allowed opacity-60' : 'btn-primary'
            ]"
          >
            {{ submitted ? $t('submitPage.submitted') : $t('submitPage.submit') }}
          </button>
        </div>
      </form>

      <!-- GitHub Issue alternative -->
      <div class="mt-8 flex items-center gap-4">
        <div class="flex-1 h-px bg-mid-gray/10" />
        <span class="text-xs text-mid-gray/50 flex-shrink-0">{{ $t('submitPage.orLabel') }}</span>
        <div class="flex-1 h-px bg-mid-gray/10" />
      </div>
      <a
        href="https://github.com/iwanderleo/everythingskill.net/issues/new?template=submit-skill.yml"
        target="_blank"
        rel="noopener"
        class="mt-6 flex items-center justify-center gap-2 w-full py-3 rounded-lg border border-mid-gray/20 text-sm font-medium text-mid-gray hover:text-charcoal hover:border-mid-gray/40 transition-colors"
      >
        <Icon name="lucide:github" class="w-4 h-4" />
        {{ $t('submitPage.githubIssueBtn') }}
      </a>

      <!-- Info -->
      <div class="mt-12 skill-card p-6">
        <h3 class="text-sm font-semibold text-charcoal mb-4">{{ $t('submitPage.notesTitle') }}</h3>
        <ul class="text-sm text-mid-gray space-y-3" style="line-height: 1.50;">
          <li class="flex items-start gap-2">
            <span class="text-charcoal">·</span>
            {{ $t('submitPage.note1') }}
          </li>
          <li class="flex items-start gap-2">
            <span class="text-charcoal">·</span>
            {{ $t('submitPage.note2') }}
          </li>
          <li class="flex items-start gap-2">
            <span class="text-charcoal">·</span>
            {{ $t('submitPage.note3') }}
          </li>
          <li class="flex items-start gap-2">
            <span class="text-charcoal">·</span>
            {{ $t('submitPage.note4') }}
          </li>
        </ul>
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

const submitted = ref(false)

function handleSubmit() {
  submitted.value = true
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
