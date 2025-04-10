import { Suspense } from "react"
import { OrderHistory } from "@/components/client/order-history"
import { OrdersSkeleton } from "@/components/client/orders-skeleton"
import { AccountSidebar } from "@/components/client/account-sidebar"

export const metadata = {
  title: "Mes commandes - ElectroShop",
  description: "Historique et suivi de vos commandes",
}

export default function OrdersPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Mon compte</h1>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Sidebar de navigation du compte */}
        <div className="md:col-span-1">
          <AccountSidebar activeItem="commandes" />
        </div>

        {/* Contenu principal */}
        <div className="md:col-span-3">
          <div className="bg-white rounded-lg border overflow-hidden">
            <div className="bg-muted/50 px-4 py-3 border-b">
              <h2 className="font-medium">Mes commandes</h2>
            </div>
            <div className="p-4">
              <Suspense fallback={<OrdersSkeleton />}>
                <OrderHistory />
              </Suspense>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
