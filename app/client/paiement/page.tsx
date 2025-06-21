import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from "next/link"

export default function PaiementPage() {
  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <Card className="w-[500px] bg-white shadow-md rounded-lg">
        <CardHeader>
          <CardTitle className="text-2xl font-semibold text-gray-800">Informations de paiement</CardTitle>
          <CardDescription className="text-gray-600">
            {"Entrez vos informations de paiement ci-dessous"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="card-number">Numéro de carte</Label>
              <Input id="card-number" placeholder="0000 0000 0000 0000" type="number" />
            </div>
            <div className="flex space-x-4">
              <div className="space-y-2 w-1/2">
                <Label htmlFor="expiry">Date d'expiration</Label>
                <Input id="expiry" placeholder="MM/AA" type="text" />
              </div>
              <div className="space-y-2 w-1/2">
                <Label htmlFor="cvc">CVC</Label>
                <Input id="cvc" placeholder="123" type="number" />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="name">Nom sur la carte</Label>
              <Input id="name" placeholder="Votre nom" type="text" />
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
          <Button className="w-full">Payer</Button>
          <Button asChild>
            <Link href="/client/produits">Parcourir les produits</Link>
          </Button>
          <Button variant="outline" size="lg" className="w-full" asChild>
            <Link href="/client/panier">Retour au panier</Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
