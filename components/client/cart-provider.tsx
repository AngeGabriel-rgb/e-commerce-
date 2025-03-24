// components/client/cart-provider.tsx
"use client"

import React, { createContext, useContext, useState, useEffect } from "react"
import { toast } from "../ui/use-toast"
import type { CartItem, Product } from "../../lib/types"

interface CartContextType {
  cartItems: CartItem[]
  addToCart: (product: Product, quantity: number) => void
  removeFromCart: (productId: string) => void
  updateQuantity: (productId: string, quantity: number) => void
  clearCart: () => void
  getCartTotal: () => number
  getCartCount: () => number
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[]>([])
  const [isInitialized, setIsInitialized] = useState(false)

  // Charger le panier depuis le localStorage au chargement
  useEffect(() => {
    const storedCart = localStorage.getItem("cart")
    if (storedCart) {
      try {
        setCartItems(JSON.parse(storedCart))
      } catch (error) {
        console.error("Error parsing cart from localStorage:", error)
      }
    }
    setIsInitialized(true)
  }, [])

  // Sauvegarder le panier dans le localStorage à chaque modification
  useEffect(() => {
    if (isInitialized) {
      localStorage.setItem("cart", JSON.stringify(cartItems))
    }
  }, [cartItems, isInitialized])

  const addToCart = (product: Product, quantity: number) => {
    setCartItems((prevItems) => {
      // Vérifier si le produit est déjà dans le panier
      const existingItemIndex = prevItems.findIndex(
        (item) => item.product.id === product.id
      )

      if (existingItemIndex !== -1) {
        // Mettre à jour la quantité si le produit existe déjà
        const updatedItems = [...prevItems]
        updatedItems[existingItemIndex].quantity += quantity
        
        toast({
          title: "Produit mis à jour",
          description: `Quantité mise à jour dans votre panier`,
        })
        
        return updatedItems
      } else {
        // Ajouter le nouveau produit au panier
        toast({
          title: "Produit ajouté",
          description: `${product.name} a été ajouté à votre panier`,
        })
        
        return [...prevItems, { product, quantity }]
      }
    })
  }

  const removeFromCart = (productId: string) => {
    setCartItems((prevItems) => {
      const updatedItems = prevItems.filter(
        (item) => item.product.id !== productId
      )
      
      toast({
        title: "Produit retiré",
        description: "Le produit a été retiré de votre panier",
      })
      
      return updatedItems
    })
  }

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId)
      return
    }

    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    )
  }

  const clearCart = () => {
    setCartItems([])
    toast({
      title: "Panier vidé",
      description: "Tous les produits ont été retirés de votre panier",
    })
  }

  const getCartTotal = () => {
    return cartItems.reduce(
      (total, item) => total + item.product.price * item.quantity,
      0
    )
  }

  const getCartCount = () => {
    return cartItems.reduce((count, item) => count + item.quantity, 0)
  }

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getCartTotal,
        getCartCount,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider")
  }
  return context
}