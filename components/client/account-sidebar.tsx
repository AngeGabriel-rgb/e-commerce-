"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { User, ShoppingBag, Heart, MapPin, CreditCard, Bell, Settings, LogOut } from "lucide-react"

interface AccountSidebarProps {
  activeItem?: string
}

export function AccountSidebar({ activeItem = "overview" }: AccountSidebarProps) {
  const pathname = usePathname()

  const menuItems = [
    {
      id: "overview",
      label: "Vue d'ensemble",
      href: "/client/compte",
      icon: User,
    },
    {
      id: "commandes",
      label: "Mes commandes",
      href: "/client/compte/commandes",
      icon: ShoppingBag,
    },
    {
      id: "favoris",
      label: "Mes favoris",
      href: "/client/compte/favoris",
      icon: Heart,
    },
    {
      id: "adresses",
      label: "Mes adresses",
      href: "/client/compte/adresses",
      icon: MapPin,
    },
    {
      id: "paiements",
      label: "Moyens de paiement",
      href: "/client/compte/paiements",
      icon: CreditCard,
    },
    {
      id: "notifications",
      label: "Notifications",
      href: "/client/compte/notifications",
      icon: Bell,
    },
    {
      id: "parametres",
      label: "Paramètres",
      href: "/client/compte/parametres",
      icon: Settings,
    },
  ]

  return (
    <div className="bg-white rounded-lg border overflow-hidden">
      <div className="bg-muted/50 px-4 py-3 border-b">
        <h2 className="font-medium">Navigation</h2>
      </div>
      <nav className="p-2">
        <ul className="space-y-1">
          {menuItems.map((item) => (
            <li key={item.id}>
              <Link
                href={item.href}
                className={cn(
                  "flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors",
                  activeItem === item.id || pathname === item.href
                    ? "bg-primary text-primary-foreground"
                    : "hover:bg-muted",
                )}
              >
                <item.icon className="h-4 w-4" />
                {item.label}
              </Link>
            </li>
          ))}
          <li className="pt-2 mt-2 border-t">
            <button
              className="flex w-full items-center gap-3 px-3 py-2 rounded-md text-sm text-destructive hover:bg-destructive/10"
              onClick={() => {
                // Ici, vous pourriez appeler une fonction de déconnexion
                console.log("Déconnexion")
              }}
            >
              <LogOut className="h-4 w-4" />
              Déconnexion
            </button>
          </li>
        </ul>
      </nav>
    </div>
  )
}
