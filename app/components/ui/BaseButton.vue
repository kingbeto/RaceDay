<template>
  <button
    :type="type"
    :disabled="disabled"
    :class="[
      'inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none',
      variantClasses,
      sizeClasses
    ]"
    @click="$emit('click', $event)"
  >
    <slot />
  </button>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger'
  size?: 'sm' | 'md' | 'lg'
  type?: 'button' | 'submit' | 'reset'
  disabled?: boolean
}

defineEmits<{
  click: [event: MouseEvent]
}>()

const props = withDefaults(defineProps<Props>(), {
  variant: 'primary',
  size: 'md',
  type: 'button',
  disabled: false
})

const variantClasses = computed(() => {
  switch (props.variant) {
    case 'primary':
      return 'bg-primary-600 text-white hover:bg-primary-700 active:bg-primary-800'
    case 'secondary':
      return 'bg-secondary-600 text-white hover:bg-secondary-700 active:bg-secondary-800'
    case 'outline':
      return 'border border-gray-300 bg-white text-gray-900 hover:bg-gray-50 active:bg-gray-100'
    case 'ghost':
      return 'text-gray-900 hover:bg-gray-100 active:bg-gray-200'
    case 'danger':
      return 'bg-red-600 text-white hover:bg-red-700 active:bg-red-800'
    default:
      return 'bg-primary-600 text-white hover:bg-primary-700 active:bg-primary-800'
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
