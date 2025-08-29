<template>
  <!-- Static grocery category display - no interactions -->
  <div class="bg-white border border-gray-200 rounded-lg overflow-hidden">
    <!-- Category header with icon -->
    <div :class="categoryHeaderClasses">
      <h5 class="font-semibold text-gray-900 flex items-center gap-2">
        <span class="text-lg">{{ categoryIcon }}</span>
        {{ category.name }}
      </h5>
      <span class="text-xs text-gray-600 font-medium">
        {{ category.items.length }} items
      </span>
    </div>

    <!-- Items list - static -->
    <div class="p-4">
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-2">
        <div
          v-for="(item, index) in category.items"
          :key="index"
          class="flex items-start gap-3 p-2 rounded-md"
        >
          <div class="mt-1 h-4 w-4 border border-gray-300 rounded bg-white flex items-center justify-center">
            <span class="text-xs text-gray-400">□</span>
          </div>
          <span class="flex-1 text-sm text-gray-700 leading-relaxed">
            {{ item.name }} <span class="text-xs text-gray-500">({{ item.quantity }})</span>
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  category: {
    name: string
    items: Array<{
      name: string
      quantity: string
      checked: boolean
    }>
  }
}

const props = defineProps<Props>()

// Category icons based on category name
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
  if (categoryName.includes('frutos') || categoryName.includes('semillas')) {
    return '🌰'
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
  } else if (categoryName.includes('frutos') || categoryName.includes('semillas')) {
    bgClass = 'bg-amber-50 border-b border-amber-200'
  }

  return `px-4 py-3 ${bgClass} flex items-center justify-between`
})
</script>
