"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useCart } from "@/components/client/cart-provider"
import CheckoutForm from "@/components/client/checkout-form"
import CheckoutSummary from "@/components/client/checkout-summary"
import { Button } from "@/components/ui/button"
import { ShoppingCart } from "lucide-react"

export default function CheckoutPage() {
  const { cartItems } = useCart()
  const router = useRouter()
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  // Rediriger vers la page du panier si le panier est vide
  useEffect(() => {
    if (isMounted && cartItems.length === 0) {
      router.push("/client/panier")
    }
  }, [isMounted, cartItems, router])

  if (!isMounted) {
    return null
  }

  if (cartItems.length === 0) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <div className="mb-4 rounded-full bg-muted p-6 inline-flex">
          <ShoppingCart className="h-10 w-10 text-muted-foreground" />
        </div>
        <h1 className="text-2xl font-bold mb-4">Votre panier est vide</h1>
        <p className="text-muted-foreground mb-6">
          {"Vous devez ajouter des produits à votre panier avant de procéder au paiement."}
        </p>
        <Button asChild>
          <Link href="/client/produits">Parcourir les produits</Link>
        </Button>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Finaliser votre commande</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="rounded-lg border overflow-hidden">
            <div className="bg-muted/50 px-4 py-3 border-b">
              <h2 className="font-medium">Informations de paiement</h2>
            </div>
            <div className="p-4">
              <CheckoutForm />
            </div>
          </div>
        </div>

        <div className="lg:col-span-1">
          <CheckoutSummary />

          <div className="mt-6">
            <Button variant="outline" size="lg" className="w-full" asChild>
              <Link href="/client/panier">Retour au panier</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
