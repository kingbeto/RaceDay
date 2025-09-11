<template>
  <!-- Static grocery list display - no interactions -->
  <BaseCard title="Lista de Compras">
    <div class="space-y-4">
      <!-- Static week display -->
      <div class="space-y-2">
        <div class="text-sm font-medium text-gray-700">Semana actual:</div>
        <div class="w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md text-gray-900">
          Semana 1 - Preparación Base
        </div>
      </div>

      <!-- Grocery categories -->
      <div class="space-y-3">
        <div class="flex items-center justify-between">
          <h4 class="font-medium text-gray-900">Lista para Semana 1 - Preparación Base</h4>
          <div class="text-xs text-slate-600 font-medium">📋 Lista de compras</div>
        </div>

        <div class="space-y-3">
          <GroceryCategory
            v-for="category in sampleGroceryData"
            :key="category.name"
            :category="category"
          />
        </div>
      </div>
    </div>
  </BaseCard>
</template>

<script setup lang="ts">
import BaseCard from '@/components/ui/BaseCard.vue'
import GroceryCategory from './GroceryCategory.vue'

// Sample grocery data for demonstration
const sampleGroceryData = [
  {
    name: 'Frutas y Verduras',
    items: [
      { name: 'Plátanos', quantity: '6 unidades', checked: false },
      { name: 'Manzanas', quantity: '4 unidades', checked: false },
      { name: 'Brócoli', quantity: '2 cabezas', checked: false },
      { name: 'Espinacas', quantity: '1 bolsa', checked: false },
      { name: 'Tomates', quantity: '3 unidades', checked: false }
    ]
  },
  {
    name: 'Proteínas',
    items: [
      { name: 'Pechuga de pollo', quantity: '1.5 kg', checked: false },
      { name: 'Salmón', quantity: '500g', checked: false },
      { name: 'Huevos', quantity: '12 unidades', checked: false },
      { name: 'Yogur griego', quantity: '6 unidades', checked: false },
      { name: 'Leche', quantity: '2 litros', checked: false }
    ]
  },
  {
    name: 'Granos y Cereales',
    items: [
      { name: 'Avena', quantity: '500g', checked: false },
      { name: 'Quinoa', quantity: '300g', checked: false },
      { name: 'Pan integral', quantity: '1 barra', checked: false },
      { name: 'Pasta integral', quantity: '500g', checked: false },
      { name: 'Arroz integral', quantity: '500g', checked: false }
    ]
  },
  {
    name: 'Frutos Secos y Semillas',
    items: [
      { name: 'Almendras', quantity: '200g', checked: false },
      { name: 'Nueces', quantity: '150g', checked: false },
      { name: 'Semillas de chía', quantity: '100g', checked: false },
      { name: 'Semillas de lino', quantity: '100g', checked: false }
    ]
  }
]
</script>
