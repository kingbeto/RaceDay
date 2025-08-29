// Simplified print composable - no interactive printing
import type { DailyNutrition, GroceryCategory, Week } from '@/types'

export const usePrint = () => {
  // Static data formatting functions - no actual printing
  const generateMealTableHTML = (weekData: Week, nutritionData: Record<string, DailyNutrition>): string => {
    let tableHTML = `
      <h1>Plan de Comidas - ${weekData.label}</h1>
      <p><strong>Período:</strong> ${formatDate(weekData.start)} - ${formatDate(weekData.end)}</p>
      <table>
        <thead>
          <tr>
            <th>Día</th>
            <th>Comidas</th>
            <th>Macros</th>
          </tr>
        </thead>
        <tbody>
    `

    weekData.rows.forEach(day => {
      const nutrition = nutritionData[day.date]
      if (nutrition) {
        tableHTML += `
          <tr>
            <td>${day.day}<br><small>${formatDate(day.date)}</small></td>
            <td>
              ${nutrition.meals.map(meal => `
                <div>
                  <div>${meal.name} (${meal.calories} kcal)</div>
                  ${meal.dishes.map(dish => `
                    <div>
                      <div>${dish.name}</div>
                      <div>Ingredientes: ${dish.ingredients}</div>
                      <div>Preparación: ${dish.preparation}</div>
                    </div>
                  `).join('')}
                </div>
              `).join('')}
            </td>
            <td>
              <div>${nutrition.totalCalories} kcal</div>
              <div>Proteínas: ${nutrition.totalProtein}g</div>
              <div>Carbohidratos: ${nutrition.totalCarbs}g</div>
              <div>Grasas: ${nutrition.totalFats}g</div>
            </td>
          </tr>
        `
      }
    })

    tableHTML += `
        </tbody>
      </table>
    `

    return tableHTML
  }

  const generateGroceryHTML = (groceryData: GroceryCategory[], weekLabel: string): string => {
    let groceryHTML = `
      <h1>Lista de Compras - ${weekLabel}</h1>
    `

    groceryData.forEach(category => {
      groceryHTML += `
        <div>
          <div>${category.name}</div>
          <div>
            ${category.items.split(',').map(item =>
              `<div>${item.trim()}</div>`
            ).join('')}
          </div>
        </div>
      `
    })

    return groceryHTML
  }

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString)
    return date.toLocaleDateString('es-ES', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  return {
    generateMealTableHTML,
    generateGroceryHTML
  }
}
