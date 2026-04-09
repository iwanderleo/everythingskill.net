<template>
  <footer class="bg-white mt-section" style="box-shadow: rgba(34, 42, 53, 0.06) 0px -1px 0px 0px;">
    <div class="mx-auto max-w-container px-6 py-16">
      <div class="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
        <!-- Brand -->
        <div class="sm:col-span-2 lg:col-span-1">
          <div class="flex items-center gap-2.5 mb-4">
            <div class="flex h-7 w-7 items-center justify-center rounded-md bg-charcoal text-white font-display text-xs font-semibold">
              S
            </div>
            <span class="font-display text-base font-semibold text-charcoal">EverythingSkill</span>
          </div>
          <p class="text-sm text-mid-gray leading-relaxed">
            万物皆可 Skill。<br>发现、分享、使用 AI Skill。
          </p>
        </div>

        <!-- Links -->
        <div>
          <h3 class="text-sm font-semibold text-charcoal mb-4">导航</h3>
          <ul class="space-y-3">
            <li><NuxtLink to="/" class="text-sm text-mid-gray hover:text-charcoal transition-colors">首页</NuxtLink></li>
            <li><NuxtLink to="/skills" class="text-sm text-mid-gray hover:text-charcoal transition-colors">Skill 目录</NuxtLink></li>
            <li><NuxtLink to="/about" class="text-sm text-mid-gray hover:text-charcoal transition-colors">关于</NuxtLink></li>
          </ul>
        </div>

        <!-- Categories -->
        <div>
          <h3 class="text-sm font-semibold text-charcoal mb-4">分类</h3>
          <ul class="space-y-3">
            <li><NuxtLink to="/skills?category=celebrity" class="text-sm text-mid-gray hover:text-charcoal transition-colors">名人思维</NuxtLink></li>
            <li><NuxtLink to="/skills?category=workplace" class="text-sm text-mid-gray hover:text-charcoal transition-colors">职场</NuxtLink></li>
            <li><NuxtLink to="/skills?category=persona" class="text-sm text-mid-gray hover:text-charcoal transition-colors">人格蒸馏</NuxtLink></li>
            <li><NuxtLink to="/skills?category=mystical" class="text-sm text-mid-gray hover:text-charcoal transition-colors">玄学</NuxtLink></li>
          </ul>
        </div>

        <!-- Community -->
        <div>
          <h3 class="text-sm font-semibold text-charcoal mb-4">社区</h3>
          <ul class="space-y-3">
            <li>
              <a href="https://github.com" target="_blank" rel="noopener" class="text-sm text-mid-gray hover:text-charcoal transition-colors flex items-center gap-1.5">
                <Icon name="lucide:github" class="w-3.5 h-3.5" /> GitHub
              </a>
            </li>
            <li>
              <a href="https://x.com" target="_blank" rel="noopener" class="text-sm text-mid-gray hover:text-charcoal transition-colors flex items-center gap-1.5">
                <Icon name="lucide:twitter" class="w-3.5 h-3.5" /> X / Twitter
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div class="mt-12 pt-8 text-center" style="box-shadow: rgba(34, 42, 53, 0.06) 0px -1px 0px 0px;">
        <p class="text-xs text-mid-gray">
          &copy; {{ new Date().getFullYear() }} EverythingSkill.net — 万物皆可 Skill
        </p>
      </div>
    </div>
  </footer>
</template>
