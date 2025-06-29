
// === CATEGORIES SERVICE ===
import type { Category } from "../types"

export async function getCategories(): Promise<Category[]> {
  // Simuler un délai d'API
  await new Promise((resolve) => setTimeout(resolve, 500))
  
  // TODO: Remplacer par un vrai appel API
  // const response = await fetch('/api/categories')
  // return await response.json()
  
  return []
}

export async function getCategoryById(id: string): Promise<Category | null> {
  // Simuler un délai d'API
  await new Promise((resolve) => setTimeout(resolve, 300))
  
  // TODO: Remplacer par un vrai appel API
  // const response = await fetch(`/api/categories/${id}`)
  // if (!response.ok) return null
  // return await response.json()
  
  return null
}

export async function getProductCountByCategory(categoryId: string): Promise<number> {
  // Simuler un délai d'API
  await new Promise((resolve) => setTimeout(resolve, 200))
  
  // TODO: Remplacer par un vrai appel API
  // const response = await fetch(`/api/categories/${categoryId}/product-count`)
  // const data = await response.json()
  // return data.count
  
  return 0
}