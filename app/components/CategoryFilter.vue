<template>
  <div class="flex flex-wrap gap-2">
    <button
      :class="[
        'inline-flex items-center rounded-pill px-4 py-1.5 text-sm font-medium transition-all duration-200 cursor-pointer',
        !modelValue
          ? 'bg-charcoal text-white'
          : 'bg-white text-mid-gray hover:text-charcoal'
      ]"
      :style="modelValue ? 'box-shadow: rgba(34, 42, 53, 0.08) 0px 0px 0px 1px;' : ''"
      @click="$emit('update:modelValue', undefined)"
    >
      全部
    </button>
    <button
      v-for="cat in categories"
      :key="cat.key"
      :class="[
        'inline-flex items-center gap-1.5 rounded-pill px-4 py-1.5 text-sm font-medium transition-all duration-200 cursor-pointer',
        modelValue === cat.key
          ? 'bg-charcoal text-white'
          : 'bg-white text-mid-gray hover:text-charcoal'
      ]"
      :style="modelValue !== cat.key ? 'box-shadow: rgba(34, 42, 53, 0.08) 0px 0px 0px 1px;' : ''"
      @click="$emit('update:modelValue', cat.key)"
    >
      <Icon :name="cat.icon" class="w-3.5 h-3.5" />
      {{ cat.labelZh }}
    </button>
  </div>
</template>

<script setup lang="ts">
import { categories, type SkillCategory } from '~/data/skills'

defineProps<{ modelValue?: SkillCategory }>()
defineEmits<{ 'update:modelValue': [value: SkillCategory | undefined] }>()
</script>
