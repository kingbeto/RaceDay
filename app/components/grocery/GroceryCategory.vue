<template>
  <div class="bg-white border border-gray-200 rounded-lg overflow-hidden">
    <!-- Category header with icon (specs requirement) -->
    <div :class="categoryHeaderClasses">
      <h5 class="font-semibold text-gray-900 flex items-center gap-2">
        <span class="text-lg">{{ categoryIcon }}</span>
        {{ category.name }}
      </h5>
      <span class="text-xs text-gray-600 font-medium">
        {{ itemsList.length }} items
      </span>
    </div>
    
    <!-- Items list -->
    <div class="p-4">
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-2">
        <div
          v-for="(item, index) in itemsList"
          :key="index"
          class="flex items-start gap-3 p-2 rounded-md hover:bg-gray-50 transition-colors"
        >
          <input
            type="checkbox"
            :id="`${category.name}-${index}`"
            class="mt-1 h-4 w-4 text-emerald-600 focus:ring-emerald-500 border-gray-300 rounded"
          >
          <label
            :for="`${category.name}-${index}`"
            class="flex-1 cursor-pointer text-sm text-gray-700 hover:text-gray-900 transition-colors leading-relaxed"
          >
            {{ item.trim() }}
          </label>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { GroceryCategory } from '@/types'

interface Props {
  category: GroceryCategory
}

const props = defineProps<Props>()

const itemsList = computed(() => {
  return props.category.items.split(',').filter(item => item.trim())
})

// Category icons based on specifications
const categoryIcon = computed(() => {
  const categoryName = props.category.name.toLowerCase()
  
  if (categoryName.includes('proteína') || categoryName.includes('carne') || categoryName.includes('pollo') || categoryName.includes('pescado')) {
    return '🥩'
  }
  if (categoryName.includes('verdura') || categoryName.includes('fruta') || categoryName.includes('vegetal')) {
    return '🥬'
  }
  if (categoryName.includes('carbohidrato') || categoryName.includes('pan') || categoryName.includes('pasta') || categoryName.includes('arroz')) {
    return '🍞'
  }
  if (categoryName.includes('lácteo') || categoryName.includes('leche') || categoryName.includes('yogur') || categoryName.includes('queso')) {
    return '🥛'
  }
  if (categoryName.includes('aceite') || categoryName.includes('condimento') || categoryName.includes('especias')) {
    return '🧴'
  }
  if (categoryName.includes('otros') || categoryName.includes('dulce') || categoryName.includes('snack')) {
    return '🍯'
  }
  
  // Default icon
  return '🛒'
})

// Category header styling
const categoryHeaderClasses = computed(() => {
  const categoryName = props.category.name.toLowerCase()
  let bgClass = 'bg-gray-50 border-b border-gray-200'
  
  if (categoryName.includes('proteína') || categoryName.includes('carne')) {
    bgClass = 'bg-red-50 border-b border-red-200'
  } else if (categoryName.includes('verdura') || categoryName.includes('fruta')) {
    bgClass = 'bg-green-50 border-b border-green-200'
  } else if (categoryName.includes('carbohidrato') || categoryName.includes('pan')) {
    bgClass = 'bg-yellow-50 border-b border-yellow-200'
  } else if (categoryName.includes('lácteo')) {
    bgClass = 'bg-blue-50 border-b border-blue-200'
  } else if (categoryName.includes('aceite') || categoryName.includes('condimento')) {
    bgClass = 'bg-orange-50 border-b border-orange-200'
  } else if (categoryName.includes('otros')) {
    bgClass = 'bg-purple-50 border-b border-purple-200'
  }
  
  return `px-4 py-3 ${bgClass} flex items-center justify-between`
})
</script>
