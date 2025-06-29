"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ShoppingBag, Heart, MapPin, Bell, ArrowRight } from "lucide-react"

interface User {
  name: string
  email: string
  orders: number
  wishlist: number
  addresses: number
  notifications: number
}

export function AccountOverview() {
  const [user, setUser] = useState<User | null>(null)

  // À remplacer par un appel API réel pour récupérer les données utilisateur
  // useEffect(() => {
  //   const fetchUserData = async () => {
  //     try {
  //       const response = await fetch('/api/user/profile')
  //       const userData = await response.json()
  //       setUser(userData)
  //     } catch (error) {
  //       console.error('Erreur lors de la récupération des données utilisateur:', error)
  //     }
  //   }
  //   fetchUserData()
  // }, [])

  if (!user) {
    return (
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <div className="animate-pulse">
              <div className="h-6 bg-muted rounded w-1/3 mb-2"></div>
              <div className="h-4 bg-muted rounded w-1/2"></div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="animate-pulse">
              <div className="h-4 bg-muted rounded w-full mb-2"></div>
              <div className="h-4 bg-muted rounded w-3/4"></div>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <Card key={i}>
              <CardHeader className="pb-2">
                <div className="animate-pulse">
                  <div className="h-5 bg-muted rounded w-1/2"></div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="animate-pulse">
                  <div className="h-8 bg-muted rounded w-1/4 mb-2"></div>
                  <div className="h-4 bg-muted rounded w-1/3"></div>
                </div>
              </CardContent>
              <CardFooter>
                <div className="animate-pulse w-full">
                  <div className="h-9 bg-muted rounded"></div>
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    )
  }

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