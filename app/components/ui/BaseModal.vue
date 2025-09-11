<template>
  <!-- Static card display - no modal functionality -->
  <div class="w-full bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden">
    <!-- Header -->
    <div v-if="$slots.header || title" class="p-6 border-b border-gray-200">
      <slot name="header">
        <h3 class="text-lg font-semibold text-gray-900">{{ title }}</h3>
      </slot>
    </div>

    <!-- Content -->
    <div class="p-6">
      <slot />
    </div>

    <!-- Footer -->
    <div
      v-if="$slots.footer"
      class="flex items-center justify-end gap-3 p-6 border-t border-gray-200"
    >
      <slot name="footer" />
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  title?: string
  size?: 'sm' | 'md' | 'lg' | 'xl'
}

const props = withDefaults(defineProps<Props>(), {
  size: 'md'
})
</script>
