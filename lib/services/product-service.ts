
// === PRODUCTS SERVICE (nettoyé) ===
import type { Product } from "../types"

interface ProductFilters {
  category?: string
  sort?: string
  search?: string
  featured?: boolean
  limit?: number
}

export async function getProducts(filters: ProductFilters = {}): Promise<Product[]> {
  await new Promise((resolve) => setTimeout(resolve, 500))

  // TODO: Remplacer par un vrai appel API
  // const params = new URLSearchParams()
  // if (filters.category) params.append('category', filters.category)
  // if (filters.sort) params.append('sort', filters.sort)
  // if (filters.search) params.append('search', filters.search)
  // if (filters.featured) params.append('featured', 'true')
  // if (filters.limit) params.append('limit', filters.limit.toString())
  // 
  // const response = await fetch(`/api/products?${params}`)
  // return await response.json()

  return []
}

export async function getProductById(id: string): Promise<Product | null> {
  await new Promise((resolve) => setTimeout(resolve, 300))

  // TODO: Remplacer par un vrai appel API
  // const response = await fetch(`/api/products/${id}`)
  // if (!response.ok) return null
  // return await response.json()

  return null
}

export async function getRelatedProducts(productId: string, category: string): Promise<Product[]> {
  await new Promise((resolve) => setTimeout(resolve, 300))

  // TODO: Remplacer par un vrai appel API
  // const response = await fetch(`/api/products/${productId}/related?category=${category}`)
  // return await response.json()

  return []
}

export async function createProduct(productData: Omit<Product, "id" | "rating" | "reviewCount">): Promise<Product> {
  await new Promise((resolve) => setTimeout(resolve, 500))

  // TODO: Remplacer par un vrai appel API
  // const response = await fetch('/api/products', {
  //   method: 'POST',
  //   headers: { 'Content-Type': 'application/json' },
  //   body: JSON.stringify(productData)
  // })
  // return await response.json()

  throw new Error("Service de création de produit non implémenté")
}

export async function updateProduct(id: string, productData: Partial<Product>): Promise<Product | null> {
  await new Promise((resolve) => setTimeout(resolve, 500))

  // TODO: Remplacer par un vrai appel API
  // const response = await fetch(`/api/products/${id}`, {
  //   method: 'PUT',
  //   headers: { 'Content-Type': 'application/json' },
  //   body: JSON.stringify(productData)
  // })
  // if (!response.ok) return null
  // return await response.json()

  return null
}

export async function deleteProduct(id: string): Promise<boolean> {
  await new Promise((resolve) => setTimeout(resolve, 500))

  // TODO: Remplacer par un vrai appel API
  // const response = await fetch(`/api/products/${id}`, { method: 'DELETE' })
  // return response.ok

  return false
}

export async function getProductStats(): Promise<{
  totalProducts: number
  outOfStock: number
  lowStock: number
  totalValue: number
}> {
  await new Promise((resolve) => setTimeout(resolve, 300))

  // TODO: Remplacer par un vrai appel API
  // const response = await fetch('/api/products/stats')
  // return await response.json()

  return {
    totalProducts: 0,
    outOfStock: 0,
    lowStock: 0,
    totalValue: 0,
  }
}