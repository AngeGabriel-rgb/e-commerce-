import type { LoginCredentials, RegisterData, User } from "../types/auth"

// Simuler une base de données d'utilisateurs
const USERS_DB: User[] = [
  {
    id: "1",
    name: "John Doe",
    email: "john@example.com",
    role: "user",
    createdAt: new Date("2023-01-01"),
  },
  {
    id: "2",
    name: "Admin User",
    email: "admin@example.com",
    role: "admin",
    createdAt: new Date("2023-01-01"),
  },
]

// Simuler un délai réseau
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

export const authService = {
  async login(credentials: LoginCredentials): Promise<User> {
    // Simuler un appel API
    await delay(1000)

    // Dans une application réelle, vous feriez une requête à votre API
    const user = USERS_DB.find((u) => u.email === credentials.email)

    if (!user) {
      throw new Error("Identifiants invalides")
    }

    // Dans une vraie application, vous vérifieriez le mot de passe ici
    // Pour cette démo, nous acceptons n'importe quel mot de passe

    // Stocker l'utilisateur dans le localStorage
    localStorage.setItem("user", JSON.stringify(user))

    return user
  },

  async register(data: RegisterData): Promise<User> {
    // Simuler un appel API
    await delay(1500)

    // Vérifier si l'email existe déjà
    if (USERS_DB.some((u) => u.email === data.email)) {
      throw new Error("Cet email est déjà utilisé")
    }

    // Créer un nouvel utilisateur
    const newUser: User = {
      id: Math.random().toString(36).substring(2, 9),
      name: data.name,
      email: data.email,
      role: "user",
      createdAt: new Date(),
    }

    // Dans une vraie application, vous ajouteriez l'utilisateur à la base de données
    // Pour cette démo, nous le retournons simplement

    // Stocker l'utilisateur dans le localStorage
    localStorage.setItem("user", JSON.stringify(newUser))

    return newUser
  },

  async logout(): Promise<void> {
    // Simuler un appel API
    await delay(500)

    // Supprimer l'utilisateur du localStorage
    localStorage.removeItem("user")
  },

  async getCurrentUser(): Promise<User | null> {
    // Simuler un appel API
    await delay(500)

    // Récupérer l'utilisateur du localStorage
    const userJson = localStorage.getItem("user")
    if (!userJson) return null

    try {
      const user = JSON.parse(userJson) as User
      // Convertir la chaîne de date en objet Date
      user.createdAt = new Date(user.createdAt)
      return user
    } catch (error) {
      console.error("Erreur lors de la récupération de l'utilisateur:", error)
      return null
    }
  },
}
