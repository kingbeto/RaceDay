<template>
  <!-- Static meal card - no interactions -->
  <BaseCard>
    <div class="space-y-3">
      <!-- Meal header -->
      <div class="flex items-center justify-between">
        <h4 class="text-lg font-semibold text-gray-900">{{ meal.name }}</h4>
        <span class="text-sm font-medium text-orange-600">{{ meal.calories }} kcal</span>
      </div>

      <!-- Dishes -->
      <div class="space-y-3">
        <div v-for="dish in meal.dishes" :key="dish.name" class="p-3 bg-gray-50 rounded-lg">
          <h5 class="font-medium text-gray-900 mb-2">{{ dish.name }}</h5>

          <div class="space-y-2 text-sm">
            <div>
              <span class="font-medium text-gray-700">Ingredientes:</span>
              <p class="text-gray-600 mt-1">{{ dish.ingredients }}</p>
            </div>

            <div>
              <span class="font-medium text-gray-700">Preparación:</span>
              <p class="text-gray-600 mt-1 italic">{{ dish.preparation }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </BaseCard>
</template>

<script setup lang="ts">
import type { Meal } from '@/types'
import BaseCard from '@/components/ui/BaseCard.vue'

interface Props {
  meal: Meal
}

defineProps<Props>()
</script>
