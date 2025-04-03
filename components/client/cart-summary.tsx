"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { formatPrice } from "@/lib/utils"
import { useCart } from "./cart-provider"
import { Separator } from "../ui/separator"

export default function CartSummary() {
  const { cartTotal } = useCart()
  const [promoCode, setPromoCode] = useState("")
  const [isApplying, setIsApplying] = useState(false)

  // Calculer les frais de livraison (gratuit au-dessus de 50€)
  const shippingCost = cartTotal > 50 ? 0 : 5.99
  const tax = cartTotal * 0.2 // TVA à 20%
  const total = cartTotal + shippingCost + tax

  const handleApplyPromo = () => {
    if (!promoCode) return

    setIsApplying(true)
    // Simuler un délai de traitement
    setTimeout(() => {
      // Ici, vous pourriez implémenter une vérification réelle du code promo
      setIsApplying(false)
      alert("Code promo non valide ou expiré")
    }, 1000)
  }

  return (
    <div className="border rounded-lg overflow-hidden">
      <div className="bg-muted/50 px-4 py-3 border-b">
        <h2 className="font-medium">Récapitulatif</h2>
      </div>

      <div className="p-4">
        <div className="space-y-2">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Sous-total</span>
            <span>{formatPrice(cartTotal)}</span>
          </div>

          <div className="flex justify-between">
            <span className="text-muted-foreground">Livraison</span>
            <span>{shippingCost === 0 ? "Gratuite" : formatPrice(shippingCost)}</span>
          </div>

          <div className="flex justify-between">
            <span className="text-muted-foreground">TVA (20%)</span>
            <span>{formatPrice(tax)}</span>
          </div>

          <Separator className="my-2" />

          <div className="flex justify-between font-semibold text-lg">
            <span>Total</span>
            <span>{formatPrice(total)}</span>
          </div>
        </div>

        <div className="mt-4">
          <p className="text-sm text-muted-foreground mb-2">Vous avez un code promo ?</p>
          <div className="flex gap-2">
            <Input
              placeholder="Code promo"
              value={promoCode}
              onChange={(e) => setPromoCode(e.target.value)}
              className="flex-1"
            />
            <Button variant="outline" onClick={handleApplyPromo} disabled={isApplying || !promoCode}>
              {isApplying ? "..." : "Appliquer"}
            </Button>
          </div>
        </div>

        <p className="text-xs text-muted-foreground mt-4">
          Les taxes sont calculées à la caisse. Les frais de livraison peuvent varier selon la destination.
        </p>
      </div>
    </div>
  )
}

