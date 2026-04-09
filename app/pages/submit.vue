<template>
  <div class="bg-white">
    <div class="mx-auto max-w-4xl px-6 py-section">
      <NuxtLink to="/skills" class="inline-flex items-center gap-1.5 text-sm text-mid-gray hover:text-charcoal transition-colors mb-10">
        <Icon name="lucide:arrow-left" class="w-4 h-4" />
        返回目录
      </NuxtLink>

      <h1 class="font-display text-display-section text-charcoal mb-3" style="line-height: 1.10;">提交 Skill</h1>
      <p class="text-mid-gray mb-10" style="line-height: 1.50; font-weight: 300;">将你的开源 Skill 提交到 EverythingSkill 目录中。</p>

      <form class="space-y-8" @submit.prevent="handleSubmit">
        <!-- Skill Name -->
        <div>
          <label class="block text-sm font-semibold text-charcoal mb-2">Skill 名称</label>
          <input
            v-model="form.name"
            type="text"
            required
            placeholder="例如：乔布斯.skill"
            class="form-input"
          >
        </div>

        <!-- Description -->
        <div>
          <label class="block text-sm font-semibold text-charcoal mb-2">描述</label>
          <textarea
            v-model="form.description"
            required
            rows="3"
            placeholder="简述这个 Skill 的能力和用途..."
            class="form-input resize-none"
          />
        </div>

        <!-- GitHub URL -->
        <div>
          <label class="block text-sm font-semibold text-charcoal mb-2">GitHub 仓库地址</label>
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
          <label class="block text-sm font-semibold text-charcoal mb-2">分类</label>
          <select
            v-model="form.category"
            required
            class="form-input"
          >
            <option value="" disabled>选择分类</option>
            <option v-for="cat in categories" :key="cat.key" :value="cat.key">
              {{ cat.labelZh }} ({{ cat.label }})
            </option>
          </select>
        </div>

        <!-- Author -->
        <div>
          <label class="block text-sm font-semibold text-charcoal mb-2">作者 GitHub 用户名</label>
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
            {{ submitted ? '已提交，感谢你的贡献！' : '提交 Skill' }}
          </button>
        </div>
      </form>

      <!-- Info -->
      <div class="mt-12 skill-card p-6">
        <h3 class="text-sm font-semibold text-charcoal mb-4">提交须知</h3>
        <ul class="text-sm text-mid-gray space-y-3" style="line-height: 1.50;">
          <li class="flex items-start gap-2">
            <span class="text-charcoal">·</span>
            Skill 必须是在 GitHub 上公开开源的
          </li>
          <li class="flex items-start gap-2">
            <span class="text-charcoal">·</span>
            提交后我们会人工审核，通过后会出现在目录中
          </li>
          <li class="flex items-start gap-2">
            <span class="text-charcoal">·</span>
            请确保 Skill 内容合法合规，不含敏感信息
          </li>
          <li class="flex items-start gap-2">
            <span class="text-charcoal">·</span>
            欢迎提交任何类型的 Skill，万物皆可 Skill！
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { categories } from '~/data/skills'

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
  title: '提交 Skill — 加入 EverythingSkill 开源目录',
  meta: [
    { name: 'description', content: '将你的开源 .skill 文件提交到 EverythingSkill 目录，让更多人发现和使用你的 AI Skill。' },
    { property: 'og:title', content: '提交 Skill — EverythingSkill' },
    { property: 'og:url', content: 'https://everythingskill.net/submit' },
  ],
  link: [{ rel: 'canonical', href: 'https://everythingskill.net/submit' }],
})
</script>
