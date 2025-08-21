export interface GroceryLists {
  [weekId: string]: GroceryCategory[]
}

export interface GroceryCategory {
  name: string
  items: string
}

export interface GroceryItem {
  name: string
  quantity: string
  category: string
  checked?: boolean
}
