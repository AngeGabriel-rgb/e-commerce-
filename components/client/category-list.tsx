"use client"

import { useState, useEffect } from "react"
import { Card } from "../ui/card"
import { Laptop, Smartphone, Tablet, Headphones, Tv, Gamepad, Home } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

interface Category {
  id: string
  name: string
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>
  image: string
  productCount: number
}

export default function CategoryList() {
  const [categories, setCategories] = useState<Category[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        // Dans une application réelle, vous feriez un appel API ici
        // const response = await fetch('/api/categories')
        // const data = await response.json()
        // setCategories(data)
        
        // Simuler un délai de chargement
        await new Promise((resolve) => setTimeout(resolve, 500))
        
        setIsLoading(false)
      } catch (error) {
        console.error("Erreur lors du chargement des catégories:", error)
        setIsLoading(false)
      }
    }

    fetchCategories()
  }, [])

  if (isLoading) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
          <div key={i} className="animate-pulse">
            <Card className="overflow-hidden">
              <div className="h-40 bg-muted"></div>
            </Card>
          </div>
        ))}
      </div>
    )
  }

  if (categories.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">Aucune catégorie disponible pour le moment.</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {categories.map((category) => (
        <Link key={category.id} href={`/client/categories/${category.id}`}>
          <Card className="overflow-hidden transition-transform hover:scale-105 duration-300">
            <div className="relative h-40">
              <Image
                src={category.image || `/images/categories/${category.id}.jpg`}
                alt={category.name}
                fill
                sizes="(max-width: 768px) 50vw, 25vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-4">
                <div className="flex flex-col text-white">
                  <div className="flex items-center">
                    <category.icon className="h-5 w-5 mr-2" aria-hidden="true" />
                    <h3 className="font-medium">{category.name}</h3>
                  </div>
                  <span className="text-sm text-white/80">{category.productCount} produits</span>
                </div>
              </div>
            </div>
          </Card>
        </Link>
      ))}
    </div>
  )
}