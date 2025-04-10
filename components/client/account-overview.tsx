"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ShoppingBag, Heart, MapPin, Bell, ArrowRight } from "lucide-react"

// Simuler un utilisateur connecté
const mockUser = {
  name: "ange test",
  email: "test@example.com",
  orders: 5,
  wishlist: 12,
  addresses: 2,
  notifications: 3,
}

export function AccountOverview() {
  const [user] = useState(mockUser)

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Bienvenue, {user.name}</CardTitle>
          <CardDescription>{user.email}</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            Depuis votre espace personnel, vous pouvez consulter et gérer vos commandes, vos favoris, vos adresses et
            vos paramètres de compte.
          </p>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base flex items-center">
              <ShoppingBag className="h-4 w-4 mr-2" />
              Commandes
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{user.orders}</p>
            <p className="text-sm text-muted-foreground">commandes passées</p>
          </CardContent>
          <CardFooter>
            <Button variant="ghost" size="sm" className="w-full justify-between" asChild>
              <Link href="/client/compte/commandes">
                Voir mes commandes
                <ArrowRight className="h-4 w-4 ml-2" />
              </Link>
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base flex items-center">
              <Heart className="h-4 w-4 mr-2" />
              Favoris
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{user.wishlist}</p>
            <p className="text-sm text-muted-foreground">produits favoris</p>
          </CardContent>
          <CardFooter>
            <Button variant="ghost" size="sm" className="w-full justify-between" asChild>
              <Link href="/client/compte/favoris">
                Voir mes favoris
                <ArrowRight className="h-4 w-4 ml-2" />
              </Link>
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base flex items-center">
              <MapPin className="h-4 w-4 mr-2" />
              Adresses
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{user.addresses}</p>
            <p className="text-sm text-muted-foreground">adresses enregistrées</p>
          </CardContent>
          <CardFooter>
            <Button variant="ghost" size="sm" className="w-full justify-between" asChild>
              <Link href="/client/compte/adresses">
                Gérer mes adresses
                <ArrowRight className="h-4 w-4 ml-2" />
              </Link>
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base flex items-center">
              <Bell className="h-4 w-4 mr-2" />
              Notifications
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{user.notifications}</p>
            <p className="text-sm text-muted-foreground">notifications non lues</p>
          </CardContent>
          <CardFooter>
            <Button variant="ghost" size="sm" className="w-full justify-between" asChild>
              <Link href="/client/compte/notifications">
                Voir mes notifications
                <ArrowRight className="h-4 w-4 ml-2" />
              </Link>
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
