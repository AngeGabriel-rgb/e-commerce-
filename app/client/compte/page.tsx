import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../../components/ui/tabs"
import UserProfile from "../../../components/client/user-profile"
import UserOrders from "../../../components/client/user-orders"
import UserAddresses from "../../../components/client/user-addresses"
import UserWishlist from "../../../components/client/user-wishlist"
import { redirect } from "next/navigation"
import { getServerSession } from "next-auth"
import { authOptions } from "../../../lib/auth"

export const metadata = {
  title: "Mon Compte - ElectroShop",
  description: "Gérez votre compte, vos commandes et vos informations personnelles",
}

export default async function AccountPage() {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect("/api/auth/signin")
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Mon Compte</h1>

      <Tabs defaultValue="profile" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="profile">Profil</TabsTrigger>
          <TabsTrigger value="orders">Commandes</TabsTrigger>
          <TabsTrigger value="addresses">Adresses</TabsTrigger>
          <TabsTrigger value="wishlist">Favoris</TabsTrigger>
        </TabsList>
        <TabsContent value="profile" className="p-4">
          <UserProfile user={session.user} />
        </TabsContent>
        <TabsContent value="orders" className="p-4">
          <UserOrders userId={session.user.id} />
        </TabsContent>
        <TabsContent value="addresses" className="p-4">
          <UserAddresses userId={session.user.id} />
        </TabsContent>
        <TabsContent value="wishlist" className="p-4">
          <UserWishlist userId={session.user.id} />
        </TabsContent>
      </Tabs>
    </div>
  )
}

