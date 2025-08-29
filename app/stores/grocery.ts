// Simplified grocery store - no state management behaviors
import type { GroceryCategory } from '@/types'

// Sample grocery data for demonstration
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

const getGroceriesForWeek = (weekId: string): GroceryCategory[] => {
  // Return sample data for any week
  return sampleGroceryData
}

const getAllWeekIds = (): string[] => {
  // Return sample week IDs
  return ['week-1', 'week-2', 'week-3', 'week-4']
}

const hasGroceriesForWeek = (weekId: string): boolean => {
  // Always return true for demonstration
  return true
}

export const useGroceryStore = () => {
  return {
    // Static functions
    getGroceriesForWeek,
    getAllWeekIds,
    hasGroceriesForWeek
  }
}
