"use client"

import { useState } from "react"
import Link from "next/link"
import { formatPrice } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Eye, Download } from "lucide-react"

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
}

// Données de commandes simulées
const mockOrders: Order[] = [
  {
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
  },
  {
    id: "ORD-123457",
    date: "2023-06-20",
    status: "shipped",
    total: 1499.98,
    items: [
      {
        id: "2",
        name: "Ordinateur Portable UltraBook",
        price: 1299.99,
        quantity: 1,
      },
      {
        id: "3",
        name: "Écouteurs Sans Fil Pro",
        price: 199.99,
        quantity: 1,
      },
    ],
  },
  {
    id: "ORD-123458",
    date: "2023-07-05",
    status: "processing",
    total: 199.99,
    items: [
      {
        id: "3",
        name: "Écouteurs Sans Fil Pro",
        price: 199.99,
        quantity: 1,
      },
    ],
  },
  {
    id: "ORD-123459",
    date: "2023-07-10",
    status: "pending",
    total: 899.99,
    items: [
      {
        id: "1",
        name: "Smartphone XYZ Pro",
        price: 899.99,
        quantity: 1,
      },
    ],
  },
  {
    id: "ORD-123460",
    date: "2023-04-01",
    status: "cancelled",
    total: 1299.99,
    items: [
      {
        id: "2",
        name: "Ordinateur Portable UltraBook",
        price: 1299.99,
        quantity: 1,
      },
    ],
  },
]

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

export function OrderHistory() {
  const [orders] = useState<Order[]>(mockOrders)

  // Filtrer les commandes par statut
  const allOrders = orders
  const activeOrders = orders.filter((order) => ["pending", "processing", "shipped"].includes(order.status))
  const completedOrders = orders.filter((order) => order.status === "delivered")
  const cancelledOrders = orders.filter((order) => order.status === "cancelled")

  return (
    <div>
      <Tabs defaultValue="all">
        <TabsList className="mb-4">
          <TabsTrigger value="all">Toutes ({allOrders.length})</TabsTrigger>
          <TabsTrigger value="active">En cours ({activeOrders.length})</TabsTrigger>
          <TabsTrigger value="completed">Livrées ({completedOrders.length})</TabsTrigger>
          <TabsTrigger value="cancelled">Annulées ({cancelledOrders.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          {renderOrderList(allOrders)}
        </TabsContent>

        <TabsContent value="active" className="space-y-4">
          {renderOrderList(activeOrders)}
        </TabsContent>

        <TabsContent value="completed" className="space-y-4">
          {renderOrderList(completedOrders)}
        </TabsContent>

        <TabsContent value="cancelled" className="space-y-4">
          {renderOrderList(cancelledOrders)}
        </TabsContent>
      </Tabs>
    </div>
  )

  function renderOrderList(orderList: Order[]) {
    if (orderList.length === 0) {
      return (
        <div className="text-center py-8">
          <p className="text-muted-foreground">Aucune commande trouvée dans cette catégorie.</p>
        </div>
      )
    }

    return (
      <div className="space-y-4">
        {orderList.map((order) => (
          <div key={order.id} className="border rounded-lg overflow-hidden">
            <div className="bg-muted/30 px-4 py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-medium">{order.id}</span>
                  <Badge variant={getStatusBadgeVariant(order.status)}>{translateStatus(order.status)}</Badge>
                </div>
                <p className="text-sm text-muted-foreground">
                  Commandé le {new Date(order.date).toLocaleDateString("fr-FR")}
                </p>
              </div>
              <div className="flex items-center gap-2 self-end sm:self-auto">
                <Button variant="outline" size="sm" asChild>
                  <Link href={`/client/compte/commandes/${order.id}`}>
                    <Eye className="h-4 w-4 mr-1" />
                    Détails
                  </Link>
                </Button>
                <Button variant="outline" size="sm">
                  <Download className="h-4 w-4 mr-1" />
                  Facture
                </Button>
              </div>
            </div>
            <div className="p-4">
              <div className="space-y-3">
                {order.items.map((item) => (
                  <div key={item.id} className="flex justify-between items-center">
                    <div>
                      <p className="font-medium">
                        {item.name} {item.quantity > 1 && `(x${item.quantity})`}
                      </p>
                      <p className="text-sm text-muted-foreground">{formatPrice(item.price)} par unité</p>
                    </div>
                    <p className="font-medium">{formatPrice(item.price * item.quantity)}</p>
                  </div>
                ))}
              </div>
              <div className="mt-4 pt-4 border-t flex justify-between items-center">
                <p className="font-medium">Total</p>
                <p className="text-lg font-bold">{formatPrice(order.total)}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    )
  }
}
