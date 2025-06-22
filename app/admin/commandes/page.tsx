import { getOrders } from "../../../lib/services/order-service"
import OrdersTable from "../../../components/admin/orders-table"
import { Input } from "../../../components/ui/input"
import { Button } from "../../../components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../../components/ui/select"
import type { JSX } from "react"

export const metadata = {
  title: "Gestion des commandes - Admin ElectroShop",
  description: "Gérez les commandes de votre boutique",
}

export default async function AdminOrdersPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}): Promise<JSX.Element> {
  // Await the searchParams Promise
  const resolvedSearchParams = await searchParams

  const search = typeof resolvedSearchParams.search === "string" ? resolvedSearchParams.search : undefined
  const status = typeof resolvedSearchParams.status === "string" ? resolvedSearchParams.status : undefined

  const orders = await getOrders({ search, status })

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Gestion des commandes</h1>

      <div className="flex gap-4 items-center">
        <Input placeholder="Rechercher une commande..." defaultValue={search} className="max-w-sm" />
        <Select defaultValue={status}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Statut" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="pending">En attente</SelectItem>
            <SelectItem value="processing">En cours</SelectItem>
            <SelectItem value="shipped">Expédiée</SelectItem>
            <SelectItem value="delivered">Livrée</SelectItem>
            <SelectItem value="cancelled">Annulée</SelectItem>
          </SelectContent>
        </Select>
        <Button type="submit">Filtrer</Button>
      </div>

      <OrdersTable orders={orders} />
    </div>
  )
}
