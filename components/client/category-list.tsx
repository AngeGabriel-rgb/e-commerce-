// components/client/category-list.tsx
"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Smartphone, Laptop, Tablet, Headphones } from 'lucide-react'
import type { Category } from "../../lib/types"

export default function CategoryList() {
  const [categories, setCategories] = useState<Category[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function fetchCategories() {
      try {
        // Simuler un appel API pour obtenir les catégories
        // Dans une application réelle, vous feriez un appel à votre API
        const mockCategories: Category[] = [
          {
            id: "smartphones",
            name: "Smartphones",
            slug: "smartphones",
            icon: "smartphone"
          },
          {
            id: "ordinateurs",
            name: "Ordinateurs",
            slug: "ordinateurs",
            icon: "laptop"
          },
          {
            id: "tablettes",
            name: "Tablettes",
            slug: "tablettes",
            icon: "tablet"
          },
          {
            id: "accessoires",
            name: "Accessoires",
            slug: "accessoires",
            icon: "headphones"
          }
        ]
        
        setCategories(mockCategories)
      } catch (error) {
        console.error("Error fetching categories:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchCategories()
  }, [])

  const getCategoryIcon = (icon: string) => {
    switch (icon) {
      case "smartphone":
        return <Smartphone className="h-6 w-6" />
      case "laptop":
        return <Laptop className="h-6 w-6" />
      case "tablet":
        return <Tablet className="h-6 w-6" />
      case "headphones":
        return <Headphones className="h-6 w-6" />
      default:
        return <Smartphone className="h-6 w-6" />
    }
  }

  if (isLoading) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[...Array(4)].map((_, index) => (
          <div key={index} className="bg-muted animate-pulse h-32 rounded-lg"></div>
        ))}
      </div>
    )
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {categories.map((category) => (
        <Link
          key={category.id}
          href={`/client/produits?category=${category.id}`}
          className="flex flex-col items-center justify-center p-6 bg-card border rounded-lg hover:border-primary hover:shadow-md transition-all"
        >
          <div className="bg-primary/10 p-3 rounded-full mb-3 text-primary">
            {getCategoryIcon(category.icon || "")}
          </div>
          <span className="font-medium">{category.name}</span>
        </Link>
      ))}
    </div>
  )
}