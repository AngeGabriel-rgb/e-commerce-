"use client"

import Link from "next/link"
import { useState } from "react"
import { usePathname } from "next/navigation"
import { ShoppingCart, Menu, X, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useCart } from "@/hooks/use-cart"
import { useMobile } from "@/hooks/use-mobile"

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const pathname = usePathname()
  const { itemCount } = useCart()
  const isMobile = useMobile()

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const closeMenu = () => {
    setIsMenuOpen(false)
  }

  const navItems = [
    { name: "Accueil", href: "/client" },
    { name: "Produits", href: "/client/produits" },
    { name: "Promotions", href: "/client/promotions" },
    { name: "Contact", href: "/client/contact" },
  ]

  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/client" className="text-2xl font-bold text-gray-900">
            ElectroShop
          </Link>

          {/* Navigation desktop */}
          {!isMobile && (
            <nav className="hidden md:flex space-x-8">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`text-sm font-medium ${
                    pathname === item.href
                      ? "text-gray-900 border-b-2 border-gray-900"
                      : "text-gray-500 hover:text-gray-900"
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </nav>
          )}

          {/* Actions */}
          <div className="flex items-center space-x-4">
            <Link href="/client/compte">
              <Button variant="ghost" size="icon" aria-label="Mon compte">
                <User className="h-5 w-5" />
              </Button>
            </Link>
            <Link href="/client/panier">
              <Button variant="ghost" size="icon" aria-label="Panier" className="relative">
                <ShoppingCart className="h-5 w-5" />
                {itemCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {itemCount}
                  </span>
                )}
              </Button>
            </Link>
            {isMobile && (
              <Button variant="ghost" size="icon" onClick={toggleMenu} aria-label="Menu">
                {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </Button>
            )}
          </div>
        </div>

        {/* Menu mobile */}
        {isMobile && isMenuOpen && (
          <nav className="mt-4 py-2 border-t">
            <ul className="space-y-2">
              {navItems.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className={`block py-2 px-4 rounded-md ${
                      pathname === item.href
                        ? "bg-gray-100 text-gray-900 font-medium"
                        : "text-gray-500 hover:bg-gray-50 hover:text-gray-900"
                    }`}
                    onClick={closeMenu}
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        )}
      </div>
    </header>
  )
}

