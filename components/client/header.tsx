"use client"

import Link from "next/link"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { ShoppingCart, User, Search, Menu, X } from "lucide-react"
import { useState } from "react"
import { useCart } from "./cart-provider"
import { Badge } from "../ui/badge"
import { ThemeToggle } from "../theme-toggle"
import { useSession, signIn, signOut } from "next-auth/react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu"

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { cartItems } = useCart()
  const cartItemCount = cartItems.length
  const { data: session } = useSession()

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <header className="border-b sticky top-0 bg-background z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Link href="/client" className="text-2xl font-bold mr-8">
              ElectroShop
            </Link>

            <nav className="hidden md:flex space-x-6">
              <Link href="/client" className="hover:text-primary transition-colors">Accueil</Link>
              <Link href="/client/produits" className="hover:text-primary transition-colors">Produits</Link>
              <Link href="/client/promotions" className="hover:text-primary transition-colors">Promotions</Link>
              <Link href="/client/contact" className="hover:text-primary transition-colors">Contact</Link>
            </nav>
          </div>

          <div className="hidden md:flex items-center space-x-4">
            <div className="relative">
              <Input type="search" placeholder="Rechercher..." className="w-64 pl-10" aria-label="Rechercher des produits"/>
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            </div>

            <ThemeToggle />

            {session ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="relative" aria-label="Menu utilisateur">
                    <User className="h-5 w-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>Mon compte</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href="/client/compte">Profil</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/client/compte?tab=orders">Commandes</Link>
                  </DropdownMenuItem>
                  {session.user.role === "admin" && (
                    <DropdownMenuItem asChild>
                      <Link href="/admin">Administration</Link>
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => signOut()}>Déconnexion</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button variant="ghost" size="icon" onClick={() => signIn()} aria-label="Connexion">
                <User className="h-5 w-5" />
              </Button>
            )}

            <Button variant="ghost" size="icon" asChild className="relative">
              <Link href="/client/panier">
                <ShoppingCart className="h-5 w-5" />
                {cartItemCount > 0 && (
                  <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0">
                    {cartItemCount}
                  </Badge>
                )}
              </Link>
            </Button>
          </div>

          <div className="md:hidden flex items-center">
            <Button variant="ghost" size="icon" asChild className="relative mr-2">
              <Link href="/client/panier">
                <ShoppingCart className="h-5 w-5" />
                {cartItemCount > 0 && (
                  <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0">
                    {cartItemCount}
                  </Badge>
                )}
              </Link>
            </Button>

            <Button variant="ghost" size="icon" onClick={toggleMenu} aria-label="Menu">
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden py-4 px-4 border-t">
          <div className="flex items-center mb-4">
            <Input type="search" placeholder="Rechercher..." className="w-full pl-10" aria-label="Rechercher des produits"/>
            <Search className="absolute left-7 h-4 w-4 text-muted-foreground" />
          </div>

          <nav className="flex flex-col space-y-4">
            <Link href="/client" className="hover:text-primary transition-colors" onClick={toggleMenu}>Accueil</Link>
            <Link href="/client/produits" className="hover:text-primary transition-colors" onClick={toggleMenu}>Produits</Link>
            <Link href="/client/promotions" className="hover:text-primary transition-colors" onClick={toggleMenu}>Promotions</Link>
            <Link href="/client/contact" className="hover:text-primary transition-colors" onClick={toggleMenu}>Contact</Link>
            {session ? (
              <>
                <Link href="/client/compte" className="hover:text-primary transition-colors" onClick={toggleMenu}>Mon Compte</Link>
                <Button variant="ghost" className="justify-start px-0" onClick={() => signOut()}>Déconnexion</Button>
              </>
            ) : (
              <Button variant="ghost" className="justify-start px-0" onClick={() => signIn()}>Connexion</Button>
            )}
          </nav>

          <div className="mt-4 flex justify-between">
            <ThemeToggle />
          </div>
        </div>
      )}
    </header>
  )
}