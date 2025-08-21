<template>
  <div
    :class="[
      'bg-white rounded-lg border border-gray-200 overflow-hidden',
      shadowClasses,
      paddingClasses
    ]"
  >
    <!-- Header -->
    <div v-if="$slots.header || title" :class="['border-b border-gray-200', headerPaddingClasses]">
      <slot name="header">
        <h3 class="text-lg font-semibold text-gray-900">{{ title }}</h3>
      </slot>
    </div>

    <!-- Content -->
    <div :class="contentPaddingClasses">
      <slot />
    </div>

    <!-- Footer -->
    <div v-if="$slots.footer" :class="['border-t border-gray-200', footerPaddingClasses]">
      <slot name="footer" />
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  title?: string
  shadow?: 'none' | 'sm' | 'md' | 'lg'
  padding?: 'none' | 'sm' | 'md' | 'lg'
}

const props = withDefaults(defineProps<Props>(), {
  shadow: 'sm',
  padding: 'md'
})

const shadowClasses = computed(() => {
  switch (props.shadow) {
    case 'none':
      return ''
    case 'sm':
      return 'shadow-sm'
    case 'md':
      return 'shadow-md'
    case 'lg':
      return 'shadow-lg'
    default:
      return 'shadow-sm'
  }
})

const paddingClasses = computed(() => {
  return props.padding === 'none' ? '' : ''
})

const headerPaddingClasses = computed(() => {
  switch (props.padding) {
    case 'none':
      return 'p-0'
    case 'sm':
      return 'p-3'
    case 'md':
      return 'p-4'
    case 'lg':
      return 'p-6'
    default:
      return 'p-4'
  }
})

const contentPaddingClasses = computed(() => {
  switch (props.padding) {
    case 'none':
      return 'p-0'
    case 'sm':
      return 'p-3'
    case 'md':
      return 'p-4'
    case 'lg':
      return 'p-6'
    default:
      return 'p-4'
  }
})

const footerPaddingClasses = computed(() => {
  switch (props.padding) {
    case 'none':
      return 'p-0'
    case 'sm':
      return 'p-3'
    case 'md':
      return 'p-4'
    case 'lg':
      return 'p-6'
    default:
      return 'p-4'
  }
})
</script>
