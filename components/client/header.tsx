"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ShoppingCart, Heart, User, Search, Menu, X } from "lucide-react"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { useCart } from "./cart-provider"
import MainNav from "./main-nav"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

export default function Header() {
  const pathname = usePathname()
  const router = useRouter()
  const { cartItems } = useCart()
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [user, setUser] = useState<any>(null)

  const cartItemsCount = cartItems.reduce((total, item) => total + item.quantity, 0)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    const checkAuth = () => {
      const userJson = localStorage.getItem("user")
      setIsAuthenticated(!!userJson)

      if (userJson) {
        try {
          const userData = JSON.parse(userJson)
          setUser(userData)
        } catch (error) {
          console.error("Erreur lors de la récupération des données utilisateur:", error)
        }
      } else {
        setUser(null)
      }
    }

    checkAuth()
    const handleStorageChange = () => {
      checkAuth()
    }

    window.addEventListener("storage", handleStorageChange)
    return () => window.removeEventListener("storage", handleStorageChange)
  }, [])

  const handleAccountClick = (e: React.MouseEvent) => {
    if (!isAuthenticated) {
      e.preventDefault()
      router.push("/client/auth/login")
    }
  }

  const handleLogout = () => {
    localStorage.removeItem("user")
    setIsAuthenticated(false)
    setUser(null)
    window.dispatchEvent(new Event("storage"))
    router.push("/client")
  }

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        isScrolled ? "bg-white shadow-md py-2" : "bg-white/80 backdrop-blur-sm py-4"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          {/* Logo avec fonction de rafraîchissement */}
          <button
            onClick={() => {
              window.location.href = "/client"
            }}
            className="flex items-center cursor-pointer"
          >
            <span className="text-xl font-bold">OloStore</span>
          </button>

          {/* Desktop Navigation */}
          <div className="hidden md:flex justify-center flex-1">
            <MainNav />
          </div>

          {/* Search Bar - Desktop */}
          <div className="hidden md:flex items-center relative max-w-sm mx-6">
            <Input type="search" placeholder="Rechercher un produit..." className="pl-10" />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          </div>

          {/* Actions */}
          <div className="flex items-center justify-center space-x-4">
            {/* Search - Mobile */}
            <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setIsSearchOpen(!isSearchOpen)}>
              {isSearchOpen ? <X className="h-5 w-5" /> : <Search className="h-5 w-5" />}
            </Button>

            {/* Wishlist */}
            <Button variant="ghost" size="icon" asChild>
              <Link href={isAuthenticated ? "/client/compte/liste-souhaits" : "/client/auth/login"}>
                <Heart className="h-5 w-5" />
                <span className="sr-only">Liste de souhaits</span>
              </Link>
            </Button>

            {/* Cart */}
            <Button variant="ghost" size="icon" asChild className="relative">
              <Link href="/client/panier">
                <ShoppingCart className="h-5 w-5" />
                {cartItemsCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {cartItemsCount}
                  </span>
                )}
                <span className="sr-only">Panier</span>
              </Link>
            </Button>

            {/* Account */}
            {isAuthenticated ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <User className="h-5 w-5" />
                    <span className="sr-only">Compte</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem asChild>
                    <Link href="/client/compte">Mon compte</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/client/compte/commandes">Mes commandes</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/client/compte/liste-souhaits">Ma liste de souhaits</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/client/compte/parametres">Paramètres</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={handleLogout}>Déconnexion</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button variant="ghost" size="icon" asChild onClick={handleAccountClick}>
                <Link href="/client/auth/login">
                  <User className="h-5 w-5" />
                  <span className="sr-only">Compte</span>
                </Link>
              </Button>
            )}

            {/* Auth Button - Desktop */}
            {!isAuthenticated && (
              <Button variant="default" size="sm" asChild className="hidden md:flex">
                <Link href="/client/auth/login">Se connecter</Link>
              </Button>
            )}

            {/* Mobile Menu */}
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                <nav className="flex flex-col gap-4 mt-8">
                  <Link
                    href="/client"
                    className={`nav-link text-lg font-medium ${pathname === "/client" ? "text-primary" : ""}`}
                  >
                    Accueil
                  </Link>
                  <Link
                    href="/client/produits"
                    className={`nav-link text-lg font-medium ${pathname.startsWith("/client/produits") ? "text-primary" : ""}`}
                  >
                    Produits
                  </Link>
                  <Link
                    href="/client/categories"
                    className={`nav-link text-lg font-medium ${pathname.startsWith("/client/categories") ? "text-primary" : ""}`}
                  >
                    Catégories
                  </Link>
                  <Link
                    href="/client/promotions"
                    className={`nav-link text-lg font-medium ${pathname.startsWith("/client/promotions") ? "text-primary" : ""}`}
                  >
                    Promotions
                  </Link>
                  <Link
                    href="/client/contact"
                    className={`nav-link text-lg font-medium ${pathname.startsWith("/client/contact") ? "text-primary" : ""}`}
                  >
                    Contact
                  </Link>

                  {/* User Account Section - Mobile */}
                  <div className="border-t my-4 pt-4">
                    {isAuthenticated ? (
                      <>
                        <Link href="/client/compte" className="block py-2 text-lg font-medium">
                          Mon compte
                        </Link>
                        <Link href="/client/compte/commandes" className="block py-2 text-lg font-medium">
                          Mes commandes
                        </Link>
                        <Link href="/client/compte/liste-souhaits" className="block py-2 text-lg font-medium">
                          Ma liste de souhaits
                        </Link>
                        <button onClick={handleLogout} className="block py-2 text-lg font-medium text-left w-full">
                          Déconnexion
                        </button>
                      </>
                    ) : (
                      <Button asChild className="w-full">
                        <Link href="/client/auth/login">Se connecter</Link>
                      </Button>
                    )}
                  </div>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>

        {/* Mobile Search - Expanded */}
        {isSearchOpen && (
          <div className="md:hidden mt-4 relative">
            <Input type="search" placeholder="Rechercher un produit..." className="pl-10 w-full" autoFocus />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          </div>
        )}
      </div>

      {/* Add CSS for hover effect */}
      <style jsx>{`
        .nav-link {
          position: relative;
          overflow: hidden;
          display: inline-block;
        }

        .nav-link::after {
          content: '';
          position: absolute;
          left: 0;
          bottom: 0;
          height: 2px;
          width: 100%;
          background-color: black;
          transform: translateY(10px); /* Adjust the position */
          transition: transform 0.3s ease;
        }

        .nav-link:hover::after {
          transform: translateY(0); /* Move the underline into position */
        }
      `}</style>
    </header>
  )
}
