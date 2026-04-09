<template>
  <header class="sticky top-0 z-50 bg-white/80 backdrop-blur-xl" style="box-shadow: rgba(34, 42, 53, 0.06) 0px 0px 0px 1px;">
    <div class="mx-auto flex h-16 max-w-container items-center justify-between px-6">
      <!-- Logo -->
      <NuxtLink to="/" class="flex items-center gap-2.5 group">
        <div class="flex h-8 w-8 items-center justify-center rounded-md bg-charcoal text-white font-display text-sm font-semibold">
          S
        </div>
        <span class="font-display text-lg font-semibold text-charcoal">
          EverythingSkill
        </span>
      </NuxtLink>

      <!-- Desktop Nav -->
      <nav class="hidden md:flex items-center gap-6">
        <!-- 榜单 dropdown -->
        <div
          class="relative"
          @mouseenter="rankingsOpen = true"
          @mouseleave="rankingsOpen = false"
        >
          <button class="flex items-center gap-1.5 text-sm font-medium text-midnight hover:opacity-70 transition-opacity">
            <Icon name="lucide:bar-chart-2" class="w-4 h-4" />
            {{ $t('nav.rankings') }}
            <Icon name="lucide:chevron-down" class="w-3.5 h-3.5 transition-transform duration-150" :class="rankingsOpen ? 'rotate-180' : ''" />
          </button>
          <Transition
            enter-active-class="transition duration-150 ease-out"
            enter-from-class="opacity-0 -translate-y-1"
            enter-to-class="opacity-100 translate-y-0"
            leave-active-class="transition duration-100 ease-in"
            leave-from-class="opacity-100 translate-y-0"
            leave-to-class="opacity-0 -translate-y-1"
          >
            <div v-if="rankingsOpen" class="absolute top-full left-0 pt-2 z-50">
              <div class="bg-white rounded-lg py-1 min-w-[120px]" style="box-shadow: rgba(19,19,22,0.7) 0 2px 8px -4px, rgba(34,42,53,0.12) 0 0 0 1px;">
                <NuxtLink
                  to="/rankings/hot"
                  class="flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-midnight hover:bg-light-gray transition-colors"
                  @click="rankingsOpen = false"
                >
                  <Icon name="lucide:flame" class="w-3.5 h-3.5" />
                  {{ $t('nav.hot') }}
                </NuxtLink>
                <NuxtLink
                  to="/rankings/new"
                  class="flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-midnight hover:bg-light-gray transition-colors"
                  @click="rankingsOpen = false"
                >
                  <Icon name="lucide:sparkles" class="w-3.5 h-3.5" />
                  {{ $t('nav.newSkills') }}
                </NuxtLink>
              </div>
            </div>
          </Transition>
        </div>
        <NuxtLink to="/skills" class="text-sm font-medium text-midnight hover:opacity-70 transition-opacity">
          {{ $t('nav.skills') }}
        </NuxtLink>
        <a
          href="https://github.com/tmstack/awesome-persona-skills"
          target="_blank"
          rel="noopener"
          class="text-sm font-medium text-midnight hover:opacity-70 transition-opacity flex items-center gap-1.5"
        >
          <Icon name="lucide:github" class="w-4 h-4" />
          GitHub
        </a>
        <button
          class="flex h-9 w-9 items-center justify-center rounded-pill text-mid-gray transition-colors hover:text-charcoal"
          style="box-shadow: rgba(34, 42, 53, 0.08) 0px 0px 0px 1px;"
          :aria-label="theme === 'dark' ? $t('nav.lightMode') : $t('nav.darkMode')"
          :title="theme === 'dark' ? $t('nav.lightMode') : $t('nav.darkMode')"
          @click="toggleTheme"
        >
          <Icon :name="theme === 'dark' ? 'lucide:sun-medium' : 'lucide:moon-star'" class="w-4 h-4" />
        </button>
        <button
          class="flex items-center gap-1 rounded-pill px-2.5 py-1 text-xs font-semibold text-mid-gray transition-colors hover:text-charcoal"
          style="box-shadow: rgba(34, 42, 53, 0.08) 0px 0px 0px 1px;"
          @click="toggleLocale"
        >
          <Icon name="lucide:languages" class="w-3.5 h-3.5" />
          {{ locale === 'zh' ? 'EN' : '中文' }}
        </button>
      </nav>

      <!-- Mobile menu button -->
      <button
        class="md:hidden p-2 text-charcoal"
        @click="mobileMenuOpen = !mobileMenuOpen"
      >
        <Icon :name="mobileMenuOpen ? 'lucide:x' : 'lucide:menu'" class="w-5 h-5" />
      </button>
    </div>

    <!-- Mobile Nav -->
    <Transition
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="opacity-0 -translate-y-2"
      enter-to-class="opacity-100 translate-y-0"
      leave-active-class="transition duration-150 ease-in"
      leave-from-class="opacity-100 translate-y-0"
      leave-to-class="opacity-0 -translate-y-2"
    >
      <div v-if="mobileMenuOpen" class="md:hidden bg-white" style="box-shadow: rgba(34, 42, 53, 0.06) 0px 0px 0px 1px;">
        <nav class="flex flex-col gap-1 p-4">
          <!-- 榜单 expandable -->
          <div>
            <button
              class="w-full px-4 py-3 text-sm font-medium text-midnight rounded-md hover:bg-light-gray transition-colors flex items-center gap-2"
              @click="mobileRankingsOpen = !mobileRankingsOpen"
            >
              <Icon name="lucide:bar-chart-2" class="w-4 h-4" />
              {{ $t('nav.rankings') }}
              <Icon name="lucide:chevron-down" class="w-3.5 h-3.5 ml-auto transition-transform duration-150" :class="mobileRankingsOpen ? 'rotate-180' : ''" />
            </button>
            <div v-if="mobileRankingsOpen" class="pl-4">
              <NuxtLink
                to="/rankings/hot"
                class="px-4 py-2.5 text-sm font-medium text-midnight rounded-md hover:bg-light-gray transition-colors flex items-center gap-2"
                @click="mobileMenuOpen = false; mobileRankingsOpen = false"
              >
                <Icon name="lucide:flame" class="w-4 h-4" />
                {{ $t('nav.hot') }}
              </NuxtLink>
              <NuxtLink
                to="/rankings/new"
                class="px-4 py-2.5 text-sm font-medium text-midnight rounded-md hover:bg-light-gray transition-colors flex items-center gap-2"
                @click="mobileMenuOpen = false; mobileRankingsOpen = false"
              >
                <Icon name="lucide:sparkles" class="w-4 h-4" />
                {{ $t('nav.newSkills') }}
              </NuxtLink>
            </div>
          </div>
          <NuxtLink to="/skills" class="px-4 py-3 text-sm font-medium text-midnight rounded-md hover:bg-light-gray transition-colors" @click="mobileMenuOpen = false">
            {{ $t('nav.skills') }}
          </NuxtLink>
          <a
            href="https://github.com/tmstack/awesome-persona-skills"
            target="_blank"
            rel="noopener"
            class="px-4 py-3 text-sm font-medium text-midnight rounded-md hover:bg-light-gray transition-colors flex items-center gap-2"
            @click="mobileMenuOpen = false"
          >
            <Icon name="lucide:github" class="w-4 h-4" />
            GitHub
          </a>
          <button
            class="px-4 py-3 text-sm font-medium text-midnight rounded-md hover:bg-light-gray transition-colors text-left flex items-center gap-2"
            @click="toggleTheme"
          >
            <Icon :name="theme === 'dark' ? 'lucide:sun-medium' : 'lucide:moon-star'" class="w-4 h-4" />
            {{ theme === 'dark' ? $t('nav.lightMode') : $t('nav.darkMode') }}
          </button>
          <button
            class="px-4 py-3 text-sm font-medium text-midnight rounded-md hover:bg-light-gray transition-colors text-left flex items-center gap-2"
            @click="toggleLocale"
          >
            <Icon name="lucide:languages" class="w-4 h-4" />
            {{ locale === 'zh' ? 'Switch to English' : '切换为中文' }}
          </button>
        </nav>
      </div>
    </Transition>
  </header>
</template>

<script setup lang="ts">
const { locale, setLocale } = useI18n()
const { theme, toggleTheme } = useTheme()
const mobileMenuOpen = ref(false)
const rankingsOpen = ref(false)
const mobileRankingsOpen = ref(false)

function toggleLocale() {
  setLocale(locale.value === 'zh' ? 'en' : 'zh')
}
</script>
