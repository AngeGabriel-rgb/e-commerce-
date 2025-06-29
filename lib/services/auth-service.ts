
import type { LoginCredentials, RegisterData, User } from "../types/auth"

// Simuler un délai réseau
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

export const authService = {
  async login(credentials: LoginCredentials): Promise<User> {
    // Simuler un appel API
    await delay(1000)

    // TODO: Remplacer par un vrai appel API
    // const response = await fetch('/api/auth/login', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(credentials)
    // })
    // const user = await response.json()

    throw new Error("Service d'authentification non implémenté")
  },

  async register(data: RegisterData): Promise<User> {
    // Simuler un appel API
    await delay(1500)

    // TODO: Remplacer par un vrai appel API
    // const response = await fetch('/api/auth/register', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(data)
    // })
    // const user = await response.json()

    throw new Error("Service d'inscription non implémenté")
  },

  async logout(): Promise<void> {
    // Simuler un appel API
    await delay(500)

    // TODO: Remplacer par un vrai appel API
    // await fetch('/api/auth/logout', { method: 'POST' })

    // Supprimer l'utilisateur du localStorage
    localStorage.removeItem("user")
  },

  async getCurrentUser(): Promise<User | null> {
    // Simuler un appel API
    await delay(500)

    // TODO: Remplacer par un vrai appel API
    // const response = await fetch('/api/auth/me')
    // if (!response.ok) return null
    // return await response.json()

    // Récupérer l'utilisateur du localStorage (temporaire)
    const userJson = localStorage.getItem("user")
    if (!userJson) return null

    try {
      const user = JSON.parse(userJson) as User
      user.createdAt = new Date(user.createdAt)
      return user
    } catch (error) {
      console.error("Erreur lors de la récupération de l'utilisateur:", error)
      return null
    }
  },
}