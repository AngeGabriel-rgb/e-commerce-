import { Card } from "@/components/ui/card"

export function TestPaymentCards() {
  return (
    <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
      <Card className="bg-muted text-muted-foreground">
        <div className="space-y-1.5 p-4">
          <h3 className="text-sm font-semibold">Carte de test réussie</h3>
          <p className="text-sm">Utilisez cette carte pour simuler un paiement réussi.</p>
        </div>
        <div className="p-4">
          <div className="space-y-2">
            <div className="space-y-1">
              <p className="text-xs font-semibold">Numéro de carte</p>
              <p className="font-mono text-sm">4242 4242 4242 4242</p>
            </div>
          </div>
          <p className="pt-1 border-t text-xs text-muted-foreground">
            {"Date d'expiration : toute date future | CVC : 3 chiffres | Code postal : tout code valide"}
          </p>
        </div>
      </Card>
    </div>
  )
}
