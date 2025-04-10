import { AccountSidebar } from "@/components/client/account-sidebar"
import { AccountOverview } from "@/components/client/account-overview"

export const metadata = {
  title: "Mon compte - ElectroShop",
  description: "Gérez votre compte et vos préférences",
}

export default function AccountPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Mon compte</h1>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Sidebar de navigation du compte */}
        <div className="md:col-span-1">
          <AccountSidebar activeItem="overview" />
        </div>

        {/* Contenu principal */}
        <div className="md:col-span-3">
          <AccountOverview />
        </div>
      </div>
    </div>
  )
}

