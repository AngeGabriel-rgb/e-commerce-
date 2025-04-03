"use client"

import { useCart } from "./cart-provider"
import { CartItem } from "@/components/cart-item"
import { useEffect, useState } from "react"
import Link from "next/link"
import { Button } from "../ui/button"
import { ShoppingCart } from "lucide-react"

export default function CartItems() {
  const { items = [], removeItem } = useCart() // Fournir un tableau vide par défaut
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) {
    return null
  }

  // Vérifier si items existe avant d'accéder à sa propriété length
  if (!items || items.length === 0) {
    return (
      <div className="text-center py-12 border rounded-lg">
        <ShoppingCart className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
        <h2 className="text-xl font-semibold mb-2">Votre panier est vide</h2>
        <p className="text-muted-foreground mb-6">Vous n'avez pas encore ajouté d'articles à votre panier.</p>
        <Button asChild>
          <Link href="/client/produits">Découvrir nos produits</Link>
        </Button>
      </div>
    )
  }

  return (
    <div className="border rounded-lg overflow-hidden">
      <div className="bg-muted/50 px-4 py-3 border-b">
        <h2 className="font-medium">Articles ({items.length})</h2>
      </div>
      <ul className="divide-y">
        {items.map((item) => (
          <CartItem key={item.id} data={item} onRemove={() => removeItem(item.id)} />
        ))}
      </ul>
    </div>
  )
}

