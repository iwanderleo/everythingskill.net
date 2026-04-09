<template>
  <div class="bg-white">
    <div class="mx-auto max-w-3xl px-6 py-section">
      <h1 class="font-display text-display-hero text-charcoal mb-10" style="line-height: 1.10;">关于</h1>

      <div class="space-y-8 text-mid-gray" style="line-height: 1.50; font-weight: 300;">
        <p class="text-lg">
          <strong class="text-charcoal font-semibold">EverythingSkill.net</strong> 是一个开源的 AI Skill 发现与分享平台。
        </p>

        <div>
          <h2 class="font-display text-display-feature text-charcoal mb-4" style="line-height: 1.30;">起源</h2>
          <p>
            2025 年，<code class="text-charcoal font-mono font-semibold">.skill</code> 文件格式在 AI 社区爆火。一切始于
            <span class="text-charcoal font-semibold">"同事.skill"</span> —— 有人把自己的真实同事蒸馏成了 AI。
            随后，这场运动迅速扩展：老板、前任、名人、甚至自己，都被蒸馏成了 Skill。
          </p>
          <p class="mt-4">
            我们相信：<strong class="text-charcoal font-semibold">万物皆可 Skill</strong>。每一段经验、每一个人格、每一种知识体系，
            都可以被提炼成一个可复用的 .skill 文件。
          </p>
        </div>

        <div>
          <h2 class="font-display text-display-feature text-charcoal mb-4" style="line-height: 1.30;">我们做什么</h2>
          <ul class="space-y-4">
            <li class="flex items-start gap-3">
              <Icon name="lucide:compass" class="w-5 h-5 text-charcoal mt-0.5 flex-shrink-0" />
              <span><strong class="text-charcoal font-semibold">发现</strong> — 按分类浏览社区最好的开源 Skill</span>
            </li>
            <li class="flex items-start gap-3">
              <Icon name="lucide:share-2" class="w-5 h-5 text-charcoal mt-0.5 flex-shrink-0" />
              <span><strong class="text-charcoal font-semibold">分享</strong> — 提交你的 Skill，让更多人受益</span>
            </li>
            <li class="flex items-start gap-3">
              <Icon name="lucide:book-open" class="w-5 h-5 text-charcoal mt-0.5 flex-shrink-0" />
              <span><strong class="text-charcoal font-semibold">学习</strong> — 了解如何创建自己的 .skill 文件</span>
            </li>
          </ul>
        </div>

        <div>
          <h2 class="font-display text-display-feature text-charcoal mb-4" style="line-height: 1.30;">致谢</h2>
          <p>
            感谢所有开源 Skill 的创作者们，是你们让这个社区充满活力。
            特别感谢
            <a href="https://x.com/jinchenma_ai" target="_blank" rel="noopener" class="text-link-blue underline">@jinchenma_ai</a>
            对社区 Skill 的整理与推广。
          </p>
        </div>

        <div class="flex gap-3 pt-4">
          <a href="https://github.com" target="_blank" rel="noopener" class="btn-secondary">
            <Icon name="lucide:github" class="w-4 h-4" />
            GitHub
          </a>
          <NuxtLink to="/skills" class="btn-primary">
            浏览 Skills
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
useHead({
  title: '关于 EverythingSkill — 万物皆可 Skill',
  meta: [
    { name: 'description', content: 'EverythingSkill 是一个开源的 AI Skill 发现与分享平台，致力于将世间万物蒸馏为可复用的 .skill 文件。' },
    { property: 'og:title', content: '关于 — EverythingSkill' },
    { property: 'og:url', content: 'https://everythingskill.net/about' },
  ],
  link: [{ rel: 'canonical', href: 'https://everythingskill.net/about' }],
})
</script>
