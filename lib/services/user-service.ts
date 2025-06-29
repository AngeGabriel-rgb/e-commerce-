// === USERS SERVICE ===
import type { User } from "../types"

interface UserFilters {
  role?: string
  search?: string
}

export async function getUsers(filters: UserFilters = {}): Promise<User[]> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500))

  // TODO: Remplacer par un vrai appel API
  // const params = new URLSearchParams()
  // if (filters.role && filters.role !== 'all') params.append('role', filters.role)
  // if (filters.search) params.append('search', filters.search)
  // 
  // const response = await fetch(`/api/users?${params}`)
  // return await response.json()

  return []
}

export async function getUserById(id: string): Promise<User | null> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 300))

  // TODO: Remplacer par un vrai appel API
  // const response = await fetch(`/api/users/${id}`)
  // if (!response.ok) return null
  // return await response.json()

  return null
}

export async function getUserByEmail(email: string): Promise<User | null> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 300))

  // TODO: Remplacer par un vrai appel API
  // const response = await fetch(`/api/users/by-email/${encodeURIComponent(email)}`)
  // if (!response.ok) return null
  // return await response.json()

  return null
}

export async function createUser(userData: Omit<User, "id" | "createdAt">): Promise<User> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500))

  // TODO: Remplacer par un vrai appel API
  // const response = await fetch('/api/users', {
  //   method: 'POST',
  //   headers: { 'Content-Type': 'application/json' },
  //   body: JSON.stringify(userData)
  // })
  // return await response.json()

  throw new Error("Service de création d'utilisateur non implémenté")
}

export async function updateUser(id: string, userData: Partial<User>): Promise<User | null> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500))

  // TODO: Remplacer par un vrai appel API
  // const response = await fetch(`/api/users/${id}`, {
  //   method: 'PUT',
  //   headers: { 'Content-Type': 'application/json' },
  //   body: JSON.stringify(userData)
  // })
  // if (!response.ok) return null
  // return await response.json()

  return null
}

export async function deleteUser(id: string): Promise<boolean> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500))

  // TODO: Remplacer par un vrai appel API
  // const response = await fetch(`/api/users/${id}`, { method: 'DELETE' })
  // return response.ok

  return false
}

export async function getUserStats(): Promise<{
  totalUsers: number
  newUsers: number
  activeUsers: number
}> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 300))

  // TODO: Remplacer par un vrai appel API
  // const response = await fetch('/api/users/stats')
  // return await response.json()

  return {
    totalUsers: 0,
    newUsers: 0,
    activeUsers: 0,
  }
}
