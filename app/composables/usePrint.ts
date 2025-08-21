import type { DailyNutrition, GroceryCategory, Week } from '@/types'

export const usePrint = () => {
  const printWeeklyMeals = (weekData: Week, nutritionData: Record<string, DailyNutrition>) => {
    const printWindow = window.open('', '_blank')
    if (!printWindow) return

    const html = generateMealTableHTML(weekData, nutritionData)
    printWindow.document.write(html)
    printWindow.document.close()
    printWindow.print()
  }
  
  const printGroceries = (groceryData: GroceryCategory[], weekLabel: string) => {
    const printWindow = window.open('', '_blank')
    if (!printWindow) return

    const html = generateGroceryHTML(groceryData, weekLabel)
    printWindow.document.write(html)
    printWindow.document.close()
    printWindow.print()
  }

  const generateMealTableHTML = (weekData: Week, nutritionData: Record<string, DailyNutrition>): string => {
    const styles = `
      <style>
        @media print {
          body { margin: 0; padding: 20px; font-family: Arial, sans-serif; }
          .no-print { display: none !important; }
        }
        body { font-family: Arial, sans-serif; max-width: 1200px; margin: 0 auto; padding: 20px; }
        h1 { color: #047857; text-align: center; margin-bottom: 30px; }
        h2 { color: #065f46; border-bottom: 2px solid #10b981; padding-bottom: 5px; }
        table { width: 100%; border-collapse: collapse; margin-bottom: 30px; }
        th, td { border: 1px solid #d1d5db; padding: 12px; text-align: left; vertical-align: top; }
        th { background-color: #ecfdf5; font-weight: bold; color: #047857; }
        .day-header { background-color: #f0fdf4; font-weight: bold; }
        .meal-name { font-weight: bold; color: #059669; }
        .dish-name { font-weight: 600; margin-bottom: 5px; }
        .ingredients { color: #374151; font-size: 0.9em; margin-bottom: 3px; }
        .preparation { color: #6b7280; font-size: 0.85em; font-style: italic; }
        .calories { font-weight: bold; color: #dc2626; }
        .macros { background-color: #f9fafb; font-size: 0.9em; }
      </style>
    `

    let tableHTML = `
      ${styles}
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
            <td class="day-header">${day.day}<br><small>${formatDate(day.date)}</small></td>
            <td>
              ${nutrition.meals.map(meal => `
                <div style="margin-bottom: 20px;">
                  <div class="meal-name">${meal.name} (${meal.calories} kcal)</div>
                  ${meal.dishes.map(dish => `
                    <div style="margin-left: 15px; margin-bottom: 10px;">
                      <div class="dish-name">${dish.name}</div>
                      <div class="ingredients"><strong>Ingredientes:</strong> ${dish.ingredients}</div>
                      <div class="preparation"><strong>Preparación:</strong> ${dish.preparation}</div>
                    </div>
                  `).join('')}
                </div>
              `).join('')}
            </td>
            <td class="macros">
              <div><strong>${nutrition.totalCalories} kcal</strong></div>
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

    return `<!DOCTYPE html><html><head><title>Plan de Comidas - ${weekData.label}</title></head><body>${tableHTML}</body></html>`
  }

  const generateGroceryHTML = (groceryData: GroceryCategory[], weekLabel: string): string => {
    const styles = `
      <style>
        @media print {
          body { margin: 0; padding: 20px; font-family: Arial, sans-serif; }
          .no-print { display: none !important; }
        }
        body { font-family: Arial, sans-serif; max-width: 800px; margin: 0 auto; padding: 20px; }
        h1 { color: #047857; text-align: center; margin-bottom: 30px; }
        .category { margin-bottom: 25px; break-inside: avoid; }
        .category-title { 
          background-color: #ecfdf5; 
          color: #047857; 
          padding: 10px; 
          font-weight: bold; 
          font-size: 1.1em;
          border-left: 4px solid #10b981;
          margin-bottom: 10px;
        }
        .items { 
          padding: 15px; 
          background-color: #f9fafb; 
          border: 1px solid #e5e7eb; 
          line-height: 1.6;
        }
        .checkbox { margin-right: 10px; }
        @media print {
          .category { page-break-inside: avoid; }
        }
      </style>
    `

    let groceryHTML = `
      ${styles}
      <h1>Lista de Compras - ${weekLabel}</h1>
      <p><strong>Fecha de impresión:</strong> ${new Date().toLocaleDateString('es-ES')}</p>
    `

    groceryData.forEach(category => {
      groceryHTML += `
        <div class="category">
          <div class="category-title">${category.name}</div>
          <div class="items">
            ${category.items.split(',').map(item => 
              `<div><input type="checkbox" class="checkbox">${item.trim()}</div>`
            ).join('')}
          </div>
        </div>
      `
    })

    return `<!DOCTYPE html><html><head><title>Lista de Compras - ${weekLabel}</title></head><body>${groceryHTML}</body></html>`
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
    printWeeklyMeals,
    printGroceries
  }
}
