
// === PROMOTIONS SERVICE (nettoyé) ===
import type { Promotion } from "../types"

interface PromotionFilters {
  status?: string
  search?: string
}

export async function getPromotions(filters: PromotionFilters = {}): Promise<Promotion[]> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500))

  // TODO: Remplacer par un vrai appel API
  // const params = new URLSearchParams()
  // if (filters.status) params.append('status', filters.status)
  // if (filters.search) params.append('search', filters.search)
  // 
  // const response = await fetch(`/api/promotions?${params}`)
  // return await response.json()

  return []
}

export async function getPromotionById(id: string): Promise<Promotion | null> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 300))

  // TODO: Remplacer par un vrai appel API
  // const response = await fetch(`/api/promotions/${id}`)
  // if (!response.ok) return null
  // return await response.json()

  return null
}

export async function getPromotionByCode(code: string): Promise<Promotion | null> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 300))

  // TODO: Remplacer par un vrai appel API
  // const response = await fetch(`/api/promotions/code/${code}`)
  // if (!response.ok) return null
  // return await response.json()

  return null
}

export async function createPromotion(
  promotionData: Omit<Promotion, "id" | "usageCount" | "createdAt" | "updatedAt">,
): Promise<Promotion> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500))

  // TODO: Remplacer par un vrai appel API
  // const response = await fetch('/api/promotions', {
  //   method: 'POST',
  //   headers: { 'Content-Type': 'application/json' },
  //   body: JSON.stringify(promotionData)
  // })
  // return await response.json()

  throw new Error("Service de création de promotion non implémenté")
}

export async function updatePromotion(id: string, promotionData: Partial<Promotion>): Promise<Promotion | null> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500))

  // TODO: Remplacer par un vrai appel API
  // const response = await fetch(`/api/promotions/${id}`, {
  //   method: 'PUT',
  //   headers: { 'Content-Type': 'application/json' },
  //   body: JSON.stringify(promotionData)
  // })
  // if (!response.ok) return null
  // return await response.json()

  return null
}

export async function deletePromotion(id: string): Promise<boolean> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500))

  // TODO: Remplacer par un vrai appel API
  // const response = await fetch(`/api/promotions/${id}`, { method: 'DELETE' })
  // return response.ok

  return false
}

export async function validatePromotion(
  code: string,
  cartTotal: number,
  productIds: string[],
  categoryIds: string[],
): Promise<{ valid: boolean; discount: number; message?: string }> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 300))

  // TODO: Remplacer par un vrai appel API
  // const response = await fetch('/api/promotions/validate', {
  //   method: 'POST',
  //   headers: { 'Content-Type': 'application/json' },
  //   body: JSON.stringify({ code, cartTotal, productIds, categoryIds })
  // })
  // return await response.json()

  return { valid: false, discount: 0, message: "Service de validation non implémenté" }
}
