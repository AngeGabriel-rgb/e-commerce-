"use client"

import { useCart } from "./cart-provider"
import { formatPrice } from "@/lib/utils"
import { Separator } from "@/components/ui/separator"
import Image from "next/image"

export default function CheckoutSummary() {
  const { cartItems, total } = useCart()

  // Calcul des frais supplémentaires
  const shipping = total > 50 ? 0 : 5.99
  const tax = total * 0.2 // TVA à 20%
  const grandTotal = total + shipping + tax

  if (cartItems.length === 0) {
    return (
      <div className="rounded-lg border p-4 text-center">
        <p className="text-muted-foreground">Votre panier est vide</p>
      </div>
    )
  }

  return (
    <div className="rounded-lg border overflow-hidden">
      <div className="bg-muted/50 px-4 py-3 border-b">
        <h2 className="font-medium">Récapitulatif de la commande</h2>
      </div>

      <div className="p-4 space-y-4">
        {/* Liste des articles */}
        <div className="space-y-3">
          {cartItems.map((item) => (
            <div key={item.product.id} className="flex items-start gap-3">
              <div className="h-16 w-16 flex-shrink-0 overflow-hidden rounded-md border">
                <Image
                  src={item.product.image || "/placeholder.svg?height=64&width=64"}
                  alt={item.product.name}
                  width={64}
                  height={64}
                  className="h-full w-full object-cover object-center"
                />
              </div>
              <div className="flex-1">
                <h3 className="text-sm font-medium">{item.product.name}</h3>
                <p className="text-xs text-muted-foreground">Quantité: {item.quantity}</p>
              </div>
              <p className="text-sm font-medium">{formatPrice(item.product.price * item.quantity)}</p>
            </div>
          ))}
        </div>

        <Separator />

        {/* Calculs */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Sous-total</span>
            <span>{formatPrice(total)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Livraison</span>
            <span>{shipping === 0 ? "Gratuite" : formatPrice(shipping)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">TVA (20%)</span>
            <span>{formatPrice(tax)}</span>
          </div>
          <Separator />
          <div className="flex justify-between font-medium">
            <span>Total</span>
            <span>{formatPrice(grandTotal)}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

