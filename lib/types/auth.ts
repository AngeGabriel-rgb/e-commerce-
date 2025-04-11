export interface User {
    id: string
    name: string
    email: string
    role: "user" | "admin"
    createdAt: Date
  }
  
  export interface LoginCredentials {
    email: string
    password: string
  }
  
  export interface RegisterData {
    name: string
    email: string
    password: string
    confirmPassword: string
  }
  
  export interface AuthState {
    user: User | null
    isLoading: boolean
    error: string | null
  }
  