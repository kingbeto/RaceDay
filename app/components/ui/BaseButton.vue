<template>
  <!-- Static button display - no interactions -->
  <span
    :class="[
      'inline-flex items-center justify-center rounded-md text-sm font-medium',
      variantClasses,
      sizeClasses
    ]"
  >
    <slot />
  </span>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger'
  size?: 'sm' | 'md' | 'lg'
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'primary',
  size: 'md'
})

const variantClasses = computed(() => {
  switch (props.variant) {
    case 'primary':
      return 'bg-primary-600 text-white'
    case 'secondary':
      return 'bg-secondary-600 text-white'
    case 'outline':
      return 'border border-gray-300 bg-white text-gray-900'
    case 'ghost':
      return 'text-gray-900'
    case 'danger':
      return 'bg-red-600 text-white'
    default:
      return 'bg-primary-600 text-white'
  }
})

const sizeClasses = computed(() => {
  switch (props.size) {
    case 'sm':
      return 'h-8 px-3 text-xs'
    case 'md':
      return 'h-10 px-4 py-2'
    case 'lg':
      return 'h-12 px-6 text-lg'
    default:
      return 'h-10 px-4 py-2'
  }
})
</script>
