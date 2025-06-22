import Link from "next/link"
import { notFound } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { formatPrice } from "@/lib/utils"
import { ChevronLeft, Download, Truck, Package, CheckCircle, Clock, XCircle } from "lucide-react"

// Types pour les commandes
interface OrderItem {
  id: string
  name: string
  price: number
  quantity: number
}

interface Order {
  id: string
  date: string
  status: "pending" | "processing" | "shipped" | "delivered" | "cancelled"
  total: number
  items: OrderItem[]
  trackingNumber?: string
  shippingAddress: {
    name: string
    address: string
    city: string
    postalCode: string
    country: string
  }
  paymentMethod: string
}

// Fonction pour obtenir les détails d'une commande (simulée)
async function getOrderDetails(id: string): Promise<Order | null> {
  // Simuler un délai de chargement
  await new Promise((resolve) => setTimeout(resolve, 500))

  // Commande simulée
  if (id === "ORD-123456") {
    return {
      id: "ORD-123456",
      date: "2023-05-15",
      status: "delivered",
      total: 899.99,
      items: [
        {
          id: "1",
          name: "Smartphone XYZ Pro",
          price: 899.99,
          quantity: 1,
        },
      ],
      trackingNumber: "TRK-987654321",
      shippingAddress: {
        name: "Jean Dupont",
        address: "123 Rue du Commerce",
        city: "Paris",
        postalCode: "75001",
        country: "France",
      },
      paymentMethod: "Carte bancaire",
    }
  }

  // Simuler une commande non trouvée
  return null
}

// Fonction pour traduire le statut en français
function translateStatus(status: Order["status"]) {
  switch (status) {
    case "delivered":
      return "Livré"
    case "shipped":
      return "Expédié"
    case "processing":
      return "En préparation"
    case "pending":
      return "En attente"
    case "cancelled":
      return "Annulé"
    default:
      return status
  }
}

// Fonction pour obtenir la couleur du badge en fonction du statut
function getStatusBadgeVariant(status: Order["status"]) {
  switch (status) {
    case "delivered":
      return "default" // vert
    case "shipped":
      return "secondary" // bleu
    case "processing":
      return "outline" // gris
    case "pending":
      return "secondary" // bleu
    case "cancelled":
      return "destructive" // rouge
    default:
      return "outline"
  }
}

// Fonction pour obtenir l'icône du statut
function StatusIcon({ status }: { status: Order["status"] }) {
  switch (status) {
    case "delivered":
      return <CheckCircle className="h-5 w-5 text-green-500" />
    case "shipped":
      return <Truck className="h-5 w-5 text-blue-500" />
    case "processing":
      return <Package className="h-5 w-5 text-yellow-500" />
    case "pending":
      return <Clock className="h-5 w-5 text-gray-500" />
    case "cancelled":
      return <XCircle className="h-5 w-5 text-red-500" />
    default:
      return null
  }
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params
  return {
    title: `Commande ${resolvedParams.id} - ElectroShop`,
    description: "Détails de votre commande",
  }
}

export default async function OrderDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const resolvedParams = await params
  const order = await getOrderDetails(resolvedParams.id)

  if (!order) {
    notFound()
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <Button variant="ghost" size="sm" asChild className="mb-4">
          <Link href="/client/compte/commandes">
            <ChevronLeft className="h-4 w-4 mr-1" />
            Retour aux commandes
          </Link>
        </Button>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold flex items-center gap-2">
              Commande {order.id}
              <Badge variant={getStatusBadgeVariant(order.status)}>{translateStatus(order.status)}</Badge>
            </h1>
            <p className="text-muted-foreground">Commandé le {new Date(order.date).toLocaleDateString("fr-FR")}</p>
          </div>
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-1" />
            Télécharger la facture
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-6">
          {/* Statut de la commande */}
          <div className="bg-white rounded-lg border overflow-hidden">
            <div className="bg-muted/50 px-4 py-3 border-b">
              <h2 className="font-medium">Statut de la commande</h2>
            </div>
            <div className="p-4">
              <div className="flex items-center gap-3">
                <StatusIcon status={order.status} />
                <div>
                  <p className="font-medium">
                    {order.status === "delivered"
                      ? "Votre commande a été livrée"
                      : order.status === "shipped"
                        ? "Votre commande est en cours de livraison"
                        : order.status === "processing"
                          ? "Votre commande est en cours de préparation"
                          : order.status === "pending"
                            ? "Votre commande est en attente de traitement"
                            : "Votre commande a été annulée"}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {order.status === "delivered"
                      ? "Votre colis a été livré le " + new Date().toLocaleDateString("fr-FR")
                      : order.status === "shipped"
                        ? "Votre colis est en cours d'acheminement"
                        : order.status === "processing"
                          ? "Nous préparons actuellement votre commande"
                          : order.status === "pending"
                            ? "Votre commande est en attente de traitement"
                            : "Votre commande a été annulée"}
                  </p>
                </div>
              </div>

              {order.trackingNumber && (
                <div className="mt-4 pt-4 border-t">
                  <p className="text-sm font-medium">Numéro de suivi</p>
                  <p className="text-sm">{order.trackingNumber}</p>
                </div>
              )}
            </div>
          </div>

          {/* Articles commandés */}
          <div className="bg-white rounded-lg border overflow-hidden">
            <div className="bg-muted/50 px-4 py-3 border-b">
              <h2 className="font-medium">Articles commandés</h2>
            </div>
            <div className="p-4">
              <div className="space-y-4">
                {order.items.map((item) => (
                  <div key={item.id} className="flex justify-between">
                    <div>
                      <p className="font-medium">{item.name}</p>
                      <p className="text-sm text-muted-foreground">
                        Quantité: {item.quantity} × {formatPrice(item.price)}
                      </p>
                    </div>
                    <p className="font-medium">{formatPrice(item.price * item.quantity)}</p>
                  </div>
                ))}
              </div>

              <Separator className="my-4" />

              <div className="space-y-2">
                <div className="flex justify-between">
                  <p className="text-muted-foreground">Sous-total</p>
                  <p>{formatPrice(order.total)}</p>
                </div>
                <div className="flex justify-between">
                  <p className="text-muted-foreground">Livraison</p>
                  <p>Gratuite</p>
                </div>
                <div className="flex justify-between">
                  <p className="text-muted-foreground">TVA (20%)</p>
                  <p>{formatPrice(order.total * 0.2)}</p>
                </div>
                <div className="flex justify-between font-medium text-lg">
                  <p>Total</p>
                  <p>{formatPrice(order.total)}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          {/* Adresse de livraison */}
          <div className="bg-white rounded-lg border overflow-hidden">
            <div className="bg-muted/50 px-4 py-3 border-b">
              <h2 className="font-medium">Adresse de livraison</h2>
            </div>
            <div className="p-4">
              <p className="font-medium">{order.shippingAddress.name}</p>
              <p>{order.shippingAddress.address}</p>
              <p>
                {order.shippingAddress.postalCode} {order.shippingAddress.city}
              </p>
              <p>{order.shippingAddress.country}</p>
            </div>
          </div>

          {/* Méthode de paiement */}
          <div className="bg-white rounded-lg border overflow-hidden">
            <div className="bg-muted/50 px-4 py-3 border-b">
              <h2 className="font-medium">Méthode de paiement</h2>
            </div>
            <div className="p-4">
              <p>{order.paymentMethod}</p>
            </div>
          </div>

          {/* Besoin d'aide */}
          <div className="bg-white rounded-lg border overflow-hidden">
            <div className="bg-muted/50 px-4 py-3 border-b">
              <h2 className="font-medium">{"Besoin d'aide ?"}</h2>
            </div>
            <div className="p-4">
              <p className="text-sm mb-4">
                {"Si vous avez des questions concernant votre commande, n'hésitez pas à nous contacter."}
              </p>
              <Button className="w-full">Contacter le service client</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
