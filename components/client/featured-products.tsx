"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import ProductCard from "./product-card"
import { Button } from "@/components/ui/button"
import type { Product } from "@/lib/types"

export default function FeaturedProducts() {
  const [products, setProducts] = useState<Product[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        // Simuler un délai de chargement
        await new Promise((resolve) => setTimeout(resolve, 800))

        // Dans une application réelle, vous feriez un appel API ici
        // const response = await fetch('/api/products/featured')
        // const data = await response.json()
        // setProducts(data)

        setIsLoading(false)
      } catch (error) {
        console.error("Erreur lors du chargement des produits:", error)
        setIsLoading(false)
      }
    }

    fetchProducts()
  }, [])

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold">Produits populaires</h2>
          <Button asChild variant="outline">
            <Link href="/client/produits">Voir tous les produits</Link>
          </Button>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="animate-pulse">
                <div className="bg-muted h-48 rounded-t-md"></div>
                <div className="p-4 space-y-3">
                  <div className="h-6 bg-muted rounded-md w-3/4"></div>
                  <div className="h-4 bg-muted rounded-md w-full"></div>
                  <div className="h-4 bg-muted rounded-md w-1/2"></div>
                </div>
              </div>
            ))}
          </div>
        ) : products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-muted-foreground">Aucun produit populaire disponible pour le moment.</p>
          </div>
        )}
      </div>
    </section>
  )
}