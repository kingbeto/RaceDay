<template>
  <Teleport to="body">
    <Transition
      enter-active-class="transition-opacity duration-300"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition-opacity duration-300"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div
        v-if="show"
        class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50"
        @click="handleBackdropClick"
      >
        <Transition
          enter-active-class="transition-transform duration-300"
          enter-from-class="scale-95 translate-y-4"
          enter-to-class="scale-100 translate-y-0"
          leave-active-class="transition-transform duration-300"
          leave-from-class="scale-100 translate-y-0"
          leave-to-class="scale-95 translate-y-4"
        >
          <div
            v-if="show"
            :class="[
              'relative w-full max-w-lg max-h-[90vh] bg-white rounded-lg shadow-xl overflow-hidden',
              sizeClasses
            ]"
            @click.stop
          >
            <!-- Header -->
            <div v-if="$slots.header || title" class="flex items-center justify-between p-6 border-b border-gray-200">
              <slot name="header">
                <h3 class="text-lg font-semibold text-gray-900">{{ title }}</h3>
              </slot>
              <button
                type="button"
                class="text-gray-400 hover:text-gray-600 transition-colors"
                @click="emit('update:show', false)"
              >
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <!-- Content -->
            <div class="p-6 overflow-y-auto">
              <slot />
            </div>

            <!-- Footer -->
            <div v-if="$slots.footer" class="flex items-center justify-end gap-3 p-6 border-t border-gray-200">
              <slot name="footer" />
            </div>
          </div>
        </Transition>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  show: boolean
  title?: string
  size?: 'sm' | 'md' | 'lg' | 'xl'
  closeOnBackdrop?: boolean
}

const emit = defineEmits<{
  'update:show': [value: boolean]
}>()

const props = withDefaults(defineProps<Props>(), {
  size: 'md',
  closeOnBackdrop: true
})

const sizeClasses = computed(() => {
  switch (props.size) {
    case 'sm':
      return 'max-w-md'
    case 'md':
      return 'max-w-lg'
    case 'lg':
      return 'max-w-2xl'
    case 'xl':
      return 'max-w-4xl'
    default:
      return 'max-w-lg'
  }
})

const handleBackdropClick = () => {
  if (props.closeOnBackdrop) {
    emit('update:show', false)
  }
}
</script>
