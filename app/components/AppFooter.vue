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
            {{ $t('footer.tagline1') }}<br>{{ $t('footer.tagline2') }}
          </p>
        </div>

        <!-- Links -->
        <div>
          <h3 class="text-sm font-semibold text-charcoal mb-4">{{ $t('footer.linksTitle') }}</h3>
          <ul class="space-y-3">
            <li><NuxtLink :to="localePath('/')" class="text-sm text-mid-gray hover:text-charcoal transition-colors">{{ $t('nav.home') }}</NuxtLink></li>
            <li><NuxtLink :to="localePath('/skills')" class="text-sm text-mid-gray hover:text-charcoal transition-colors">{{ $t('nav.skills') }}</NuxtLink></li>
            <li><NuxtLink :to="localePath('/about')" class="text-sm text-mid-gray hover:text-charcoal transition-colors">{{ $t('nav.about') }}</NuxtLink></li>
          </ul>
        </div>

        <!-- Categories -->
        <div>
          <h3 class="text-sm font-semibold text-charcoal mb-4">{{ $t('footer.categoriesTitle') }}</h3>
          <ul class="space-y-3">
            <li><NuxtLink :to="localePath({ path: '/skills', query: { category: 'celebrity' } })" class="text-sm text-mid-gray hover:text-charcoal transition-colors">{{ $t('footer.celebrity') }}</NuxtLink></li>
            <li><NuxtLink :to="localePath({ path: '/skills', query: { category: 'workplace' } })" class="text-sm text-mid-gray hover:text-charcoal transition-colors">{{ $t('footer.workplace') }}</NuxtLink></li>
            <li><NuxtLink :to="localePath({ path: '/skills', query: { category: 'persona' } })" class="text-sm text-mid-gray hover:text-charcoal transition-colors">{{ $t('footer.persona') }}</NuxtLink></li>
            <li><NuxtLink :to="localePath({ path: '/skills', query: { category: 'mystical' } })" class="text-sm text-mid-gray hover:text-charcoal transition-colors">{{ $t('footer.mystical') }}</NuxtLink></li>
          </ul>
        </div>

        <!-- Community -->
        <div>
          <h3 class="text-sm font-semibold text-charcoal mb-4">{{ $t('footer.communityTitle') }}</h3>
          <ul class="space-y-3">
            <li>
              <a href="https://github.com/iwanderleo/everythingskill.net" target="_blank" rel="noopener" class="text-sm text-mid-gray hover:text-charcoal transition-colors flex items-center gap-1.5">
                <Icon name="lucide:github" class="w-3.5 h-3.5" /> GitHub
              </a>
            </li>
            <li>
              <a href="https://x.com/iwanderleo" target="_blank" rel="noopener" class="text-sm text-mid-gray hover:text-charcoal transition-colors flex items-center gap-1.5">
                <Icon name="lucide:twitter" class="w-3.5 h-3.5" /> X / Twitter
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div class="mt-12 pt-8 flex items-center justify-between" style="box-shadow: rgba(34, 42, 53, 0.06) 0px -1px 0px 0px;">
        <span class="text-xs text-mid-gray opacity-0 pointer-events-none select-none" aria-hidden="true">
          {{ $t('footer.dataUpdated') }} {{ formattedSyncedAt }}
        </span>
        <p class="text-xs text-mid-gray text-center">
          &copy; {{ new Date().getFullYear() }} EverythingSkill.net — {{ $t('footer.copyright') }}
        </p>
        <p class="text-xs text-mid-gray opacity-50 text-right">
          {{ $t('footer.dataUpdated') }} {{ formattedSyncedAt }}
        </p>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { lastSyncedAt } from '~/data/skills'
const localePath = useLocalePath()
const formattedSyncedAt = lastSyncedAt.replace(/-/g, '/')
</script>
