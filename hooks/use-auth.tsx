"use client"

import type React from "react"

import { createContext, useContext, useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { authService } from "@/lib/services/auth-service"
import type { AuthState, LoginCredentials, RegisterData } from "@/lib/types/auth"
import { toast } from "@/components/ui/use-toast"

interface AuthContextType extends AuthState {
  login: (credentials: LoginCredentials) => Promise<void>
  register: (data: RegisterData) => Promise<void>
  logout: () => Promise<void>
  isAuthenticated: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<AuthState>({
    user: null,
    isLoading: true,
    error: null,
  })
  const router = useRouter()

  useEffect(() => {
    // Vérifier si l'utilisateur est déjà connecté au chargement
    const checkAuth = async () => {
      try {
        const user = await authService.getCurrentUser()
        setState({ user, isLoading: false, error: null })
      } catch (error) {
        setState({ user: null, isLoading: false, error: "Erreur d'authentification" })
      }
    }

    checkAuth()
  }, [])

  const login = async (credentials: LoginCredentials) => {
    setState({ ...state, isLoading: true, error: null })
    try {
      const user = await authService.login(credentials)
      setState({ user, isLoading: false, error: null })
      toast({
        title: "Connexion réussie",
        description: `Bienvenue, ${user.name} !`,
      })
      router.push("/client")
    } catch (error) {
      setState({ ...state, isLoading: false, error: error instanceof Error ? error.message : "Erreur de connexion" })
      toast({
        title: "Erreur de connexion",
        description: error instanceof Error ? error.message : "Identifiants invalides",
        variant: "destructive",
      })
    }
  }

  const register = async (data: RegisterData) => {
    setState({ ...state, isLoading: true, error: null })
    try {
      const user = await authService.register(data)
      setState({ user, isLoading: false, error: null })
      toast({
        title: "Inscription réussie",
        description: `Bienvenue, ${user.name} !`,
      })
      router.push("/client")
    } catch (error) {
      setState({ ...state, isLoading: false, error: error instanceof Error ? error.message : "Erreur d'inscription" })
      toast({
        title: "Erreur d'inscription",
        description: error instanceof Error ? error.message : "Une erreur est survenue",
        variant: "destructive",
      })
    }
  }

  const logout = async () => {
    setState({ ...state, isLoading: true, error: null })
    try {
      await authService.logout()
      setState({ user: null, isLoading: false, error: null })
      toast({
        title: "Déconnexion réussie",
        description: "Vous avez été déconnecté avec succès",
      })
      router.push("/client")
    } catch (error) {
      setState({ ...state, isLoading: false, error: error instanceof Error ? error.message : "Erreur de déconnexion" })
    }
  }

  return (
    <AuthContext.Provider
      value={{
        ...state,
        login,
        register,
        logout,
        isAuthenticated: !!state.user,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth doit être utilisé à l'intérieur d'un AuthProvider")
  }
  return context
}
