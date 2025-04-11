"use client"

import { useState } from "react"
import { LogOut, Loader2 } from "lucide-react"
import { Button, type ButtonProps } from "@/components/ui/button"
import { useAuth } from "@/hooks/use-auth"

interface LogoutButtonProps extends ButtonProps {}

export function LogoutButton({ className, variant = "ghost", ...props }: LogoutButtonProps) {
  const { logout } = useAuth()
  const [isLoading, setIsLoading] = useState(false)

  const handleLogout = async () => {
    setIsLoading(true)
    try {
      await logout()
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Button variant={variant} onClick={handleLogout} disabled={isLoading} className={className} {...props}>
      {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <LogOut className="mr-2 h-4 w-4" />}
      Déconnexion
    </Button>
  )
}
