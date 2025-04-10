import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { CreditCard } from "lucide-react"

export function TestPaymentCards() {
  // Vérifier si nous sommes en environnement de développement ou de test
  const isTestMode =
    process.env.NODE_ENV !== "production" || process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY?.startsWith("pk_test_")

  if (!isTestMode) return null

  return (
    <Card className="mt-6 border-dashed border-yellow-300 bg-yellow-50">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium flex items-center">
          <CreditCard className="h-4 w-4 mr-2" />
          Cartes de test Stripe
        </CardTitle>
        <CardDescription className="text-xs">
          Utilisez ces cartes pour tester différents scénarios de paiement
        </CardDescription>
      </CardHeader>
      <CardContent className="text-xs space-y-2">
        <div className="grid grid-cols-2 gap-2">
          <div>
            <p className="font-medium">Paiement réussi :</p>
            <p className="font-mono">4242 4242 4242 4242</p>
          </div>
          <div>
            <p className="font-medium">Paiement refusé :</p>
            <p className="font-mono">4000 0000 0000 0002</p>
          </div>
          <div>
            <p className="font-medium">Authentification 3D Secure :</p>
            <p className="font-mono">4000 0000 0000 3220</p>
          </div>
          <div>
            <p className="font-medium">Carte expirée :</p>
            <p className="font-mono">4000 0000 0000 9995</p>
          </div>
        </div>
        <p className="pt-1 border-t text-xs text-muted-foreground">
          Date d'expiration : toute date future | CVC : 3 chiffres | Code postal : tout code valide
        </p>
      </CardContent>
    </Card>
  )
}
