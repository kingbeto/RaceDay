import { defineStore } from 'pinia'
import { ref, computed, readonly } from 'vue'
import type { GroceryLists, GroceryCategory } from '@/types'

export const useGroceryStore = defineStore('grocery', () => {
  const groceryLists = ref<GroceryLists>({})
  const isLoading = ref(false)
  const error = ref<string | null>(null)

  const loadGroceryData = async () => {
    isLoading.value = true
    error.value = null
    
    try {
      // Import the JSON file directly
      const groceryModule = await import('@/data/grocery-lists.json')
      groceryLists.value = groceryModule.default
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to load grocery data'
      console.error('Error loading grocery data:', err)
    } finally {
      isLoading.value = false
    }
  }

  const getGroceriesForWeek = computed(() => (weekId: string): GroceryCategory[] => {
    return groceryLists.value[weekId] || []
  })

  const getAllWeekIds = computed(() => {
    return Object.keys(groceryLists.value)
  })

  const hasGroceriesForWeek = computed(() => (weekId: string): boolean => {
    return weekId in groceryLists.value && groceryLists.value[weekId].length > 0
  })

  const clearError = () => {
    error.value = null
  }

  return {
    // State
    groceryLists: readonly(groceryLists),
    isLoading: readonly(isLoading),
    error: readonly(error),
    
    // Getters
    getGroceriesForWeek,
    getAllWeekIds,
    hasGroceriesForWeek,
    
    // Actions
    loadGroceryData,
    clearError
  }
})
