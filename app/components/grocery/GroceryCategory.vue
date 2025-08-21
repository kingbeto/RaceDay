<template>
  <div class="space-y-2">
    <!-- Category header -->
    <h5 class="font-medium text-gray-900 text-sm border-b border-gray-200 pb-1">
      {{ category.name }}
    </h5>
    
    <!-- Items list -->
    <div class="space-y-1 text-sm text-gray-600 pl-2">
      <div
        v-for="(item, index) in itemsList"
        :key="index"
        class="flex items-start gap-2"
      >
        <input
          type="checkbox"
          :id="`${category.name}-${index}`"
          class="mt-1 h-3 w-3 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
        >
        <label
          :for="`${category.name}-${index}`"
          class="flex-1 cursor-pointer hover:text-gray-900 transition-colors"
        >
          {{ item.trim() }}
        </label>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { GroceryCategory } from '@/types'

interface Props {
  category: GroceryCategory
}

const props = defineProps<Props>()

const itemsList = computed(() => {
  return props.category.items.split(',').filter(item => item.trim())
})
</script>
