import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ShoppingBag, Settings, Users, Package, BarChart3, Shield, Smartphone, Laptop, Headphones } from "lucide-react"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-center">
            <div className="flex items-center space-x-3">
              <div className="bg-gradient-to-r from-blue-600 to-healer-green p-2 rounded-lg">
                <Smartphone className="h-8 w-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-healer-green bg-clip-text text-transparent">
                 OloStore
                </h1>
                <p className="text-sm text-gray-600">Votre boutique d'électronique de confiance</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Bienvenue sur OloStore</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Découvrez notre large gamme de produits électroniques ou gérez votre boutique avec nos outils
            d'administration avancés.
          </p>
        </div>

        {/* Access Cards */}
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-16">
          {/* Client Access Card */}
          <Card className="group hover:shadow-xl transition-all duration-300 border-2 hover:border-blue-200">
            <CardHeader className="text-center pb-4">
              <div className="mx-auto mb-4 p-4 bg-blue-100 rounded-full group-hover:bg-blue-200 transition-colors">
                <ShoppingBag className="h-12 w-12 text-blue-600" />
              </div>
              <CardTitle className="text-2xl text-blue-600">Espace Client</CardTitle>
              <CardDescription className="text-base">Explorez nos produits et passez vos commandes</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-center space-x-3 text-gray-600">
                  <Package className="h-5 w-5 text-blue-500" />
                  <span>Catalogue de produits complet</span>
                </div>
                <div className="flex items-center space-x-3 text-gray-600">
                  <ShoppingBag className="h-5 w-5 text-blue-500" />
                  <span>Panier et commandes en ligne</span>
                </div>
                <div className="flex items-center space-x-3 text-gray-600">
                  <Users className="h-5 w-5 text-blue-500" />
                  <span>Compte personnel et historique</span>
                </div>
              </div>
              <Link href="/client" className="block">
                <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 text-lg">
                  Accéder à la boutique
                </Button>
              </Link>
            </CardContent>
          </Card>

          {/* Admin Access Card */}
          <Card className="group hover:shadow-xl transition-all duration-300 border-2 hover:border-healer-green/30">
            <CardHeader className="text-center pb-4">
              <div className="mx-auto mb-4 p-4 bg-healer-green/10 rounded-full group-hover:bg-healer-green/20 transition-colors">
                <Settings className="h-12 w-12 text-healer-green" />
              </div>
              <CardTitle className="text-2xl text-healer-green">Espace Admin</CardTitle>
              <CardDescription className="text-base">Gérez votre boutique et vos commandes</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-center space-x-3 text-gray-600">
                  <Package className="h-5 w-5 text-healer-green" />
                  <span>Gestion des produits</span>
                </div>
                <div className="flex items-center space-x-3 text-gray-600">
                  <BarChart3 className="h-5 w-5 text-healer-green" />
                  <span>Statistiques et rapports</span>
                </div>
                <div className="flex items-center space-x-3 text-gray-600">
                  <Shield className="h-5 w-5 text-healer-green" />
                  <span>Administration complète</span>
                </div>
              </div>
              <Link href="/admin" className="block">
                <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 text-lg">
                  Accéder à l'administration
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>

        {/* Features Section */}
        <div className="text-center mb-12">
          <h3 className="text-2xl font-bold text-gray-900 mb-8">Pourquoi choisir OloStore ?</h3>
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="mx-auto mb-4 p-3 bg-blue-100 rounded-full w-fit">
                <Smartphone className="h-8 w-8 text-blue-600" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Produits de qualité</h4>
              <p className="text-gray-600 text-sm">
                Une sélection rigoureuse des meilleurs produits électroniques du marché
              </p>
            </div>
            <div className="text-center">
              <div className="mx-auto mb-4 p-3 bg-green-100 rounded-full w-fit">
                <Laptop className="h-8 w-8 text-healer-green" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Large gamme</h4>
              <p className="text-gray-600 text-sm">
                Smartphones, ordinateurs, tablettes, accessoires et bien plus encore
              </p>
            </div>
            <div className="text-center">
              <div className="mx-auto mb-4 p-3 bg-purple-100 rounded-full w-fit">
                <Headphones className="h-8 w-8 text-purple-600" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Support client</h4>
              <p className="text-gray-600 text-sm">Une équipe dédiée pour vous accompagner dans vos achats</p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8 mt-16">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <div className="bg-gradient-to-r from-blue-600 to-healer-green p-2 rounded-lg">
              <Smartphone className="h-6 w-6 text-white" />
            </div>
            <span className="text-xl font-bold">OloStore</span>
          </div>
          <p className="text-gray-400 mb-4">Votre partenaire de confiance pour tous vos besoins en électronique</p>
          <div className="flex justify-center space-x-6 text-sm text-gray-400">
            <Link href="/client/contact" className="hover:text-white transition-colors">
              Contact
            </Link>
            <Link href="/client/a-propos" className="hover:text-white transition-colors">
              À propos
            </Link>
            <span>© 2024 OloStore. Tous droits réservés.</span>
          </div>
        </div>
      </footer>
    </div>
  )
}
