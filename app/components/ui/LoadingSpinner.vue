<template>
  <!-- Static loading indicator - no animation -->
  <div :class="containerClasses">
    <div
      :class="[
        'rounded-full border-4 border-gray-300',
        sizeClasses,
        colorClasses
      ]"
    ></div>
    <p v-if="message" :class="textClasses">{{ message }}</p>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  size?: 'sm' | 'md' | 'lg'
  color?: 'primary' | 'secondary' | 'gray'
  message?: string
  centered?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  size: 'md',
  color: 'primary',
  centered: true
})

const containerClasses = computed(() => {
  const base = 'flex flex-col items-center gap-2'
  return props.centered ? `${base} justify-center min-h-[200px]` : base
})

const sizeClasses = computed(() => {
  switch (props.size) {
    case 'sm':
      return 'w-6 h-6 border-2'
    case 'md':
      return 'w-8 h-8'
    case 'lg':
      return 'w-12 h-12 border-[6px]'
    default:
      return 'w-8 h-8'
  }
})

const colorClasses = computed(() => {
  switch (props.color) {
    case 'primary':
      return 'border-t-primary-600'
    case 'secondary':
      return 'border-t-secondary-600'
    case 'gray':
      return 'border-t-gray-600'
    default:
      return 'border-t-primary-600'
  }
})

const textClasses = computed(() => {
  const base = 'text-gray-600'
  switch (props.size) {
    case 'sm':
      return `${base} text-sm`
    case 'md':
      return base
    case 'lg':
      return `${base} text-lg`
    default:
      return base
  }
})
</script>
