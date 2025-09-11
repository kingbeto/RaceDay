import { ref, readonly } from 'vue'
import type { GroceryCategory } from '@/types'
import { apiService } from '@/services/api'

// Cache for grocery data
const groceryCache = ref<Map<string, GroceryCategory[]>>(new Map())
const allGroceriesCache = ref<Record<string, GroceryCategory[]> | null>(null)
const isLoading = ref(false)
const error = ref<string | null>(null)

// Sample grocery data for fallback
const sampleGroceryData: GroceryCategory[] = [
  {
    name: 'Frutas y Verduras',
    items: 'Plátanos, Manzanas, Brócoli, Espinacas, Tomates'
  },
  {
    name: 'Proteínas',
    items: 'Pollo, Salmón, Huevos, Yogur griego, Leche'
  },
  {
    name: 'Granos y Cereales',
    items: 'Avena, Quinoa, Pan integral, Pasta integral, Arroz integral'
  },
  {
    name: 'Frutos Secos',
    items: 'Almendras, Nueces, Semillas de chía, Semillas de lino'
  }
]

const getGroceriesForWeek = async (weekId: string): Promise<GroceryCategory[]> => {
  // Check cache first
  if (groceryCache.value.has(weekId)) {
    return groceryCache.value.get(weekId)!
  }

  try {
    isLoading.value = true
    error.value = null

    // Try to get from API
    const apiData = await apiService.getGroceriesByWeek(weekId)

    let groceryData: GroceryCategory[]
    if (apiData && Array.isArray(apiData)) {
      groceryData = apiData
    } else {
      // Fall back to sample data
      groceryData = sampleGroceryData
    }

    // Cache the result
    groceryCache.value.set(weekId, groceryData)
    return groceryData
  } catch (err) {
    console.warn(`Failed to load groceries from API for week ${weekId}:`, err)
    error.value = err instanceof Error ? err.message : 'Failed to load grocery data'

    // Fall back to sample data
    groceryCache.value.set(weekId, sampleGroceryData)
    return sampleGroceryData
  } finally {
    isLoading.value = false
  }
}

const loadAllGroceries = async (): Promise<Record<string, GroceryCategory[]>> => {
  try {
    isLoading.value = true
    error.value = null

    const allData = await apiService.getAllGroceries()

    // Update cache with all data
    if (allData && typeof allData === 'object') {
      Object.entries(allData).forEach(([weekId, groceries]) => {
        groceryCache.value.set(weekId, groceries as GroceryCategory[])
      })
      allGroceriesCache.value = allData as Record<string, GroceryCategory[]>
    }

    return allData as Record<string, GroceryCategory[]>
  } catch (err) {
    console.error('Failed to load all grocery data:', err)
    error.value = err instanceof Error ? err.message : 'Failed to load grocery data'
    return {}
  } finally {
    isLoading.value = false
  }
}

const getAllWeekIds = (): string[] => {
  if (allGroceriesCache.value) {
    return Object.keys(allGroceriesCache.value)
  }
  // Return sample week IDs as fallback
  return ['W0', 'W1', 'W2', 'W3', 'W4']
}

const hasGroceriesForWeek = (weekId: string): boolean => {
  return (
    groceryCache.value.has(weekId) || (allGroceriesCache.value && weekId in allGroceriesCache.value)
  )
}

export const useGroceryStore = () => {
  return {
    // State
    isLoading: readonly(isLoading),
    error: readonly(error),
    groceryCache: readonly(groceryCache),
    allGroceriesCache: readonly(allGroceriesCache),

    // Actions
    getGroceriesForWeek,
    loadAllGroceries,
    getAllWeekIds,
    hasGroceriesForWeek,

    // Utilities
    sampleGroceryData
  }
}
