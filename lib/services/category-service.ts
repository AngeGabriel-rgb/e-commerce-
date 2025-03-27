import type { Category } from "../types"

// Données simulées pour les catégories
const categories: Category[] = [
  {
    id: "smartphones",
    name: "Smartphones",
    description: "Téléphones intelligents de dernière génération",
    image: "/placeholder.svg?height=300&width=300&text=Smartphones",
    productCount: 12,
    createdAt: new Date("2023-01-01"),
    updatedAt: new Date("2023-01-01"),
  },
  {
    id: "laptops",
    name: "Ordinateurs Portables",
    description: "Ordinateurs portables pour tous les besoins",
    image: "/placeholder.svg?height=300&width=300&text=Laptops",
    productCount: 8,
    createdAt: new Date("2023-01-01"),
    updatedAt: new Date("2023-01-01"),
  },
  {
    id: "tablets",
    name: "Tablettes",
    description: "Tablettes tactiles pour le travail et les loisirs",
    image: "/placeholder.svg?height=300&width=300&text=Tablettes",
    productCount: 6,
    createdAt: new Date("2023-01-01"),
    updatedAt: new Date("2023-01-01"),
  },
  {
    id: "accessories",
    name: "Accessoires",
    description: "Accessoires pour vos appareils électroniques",
    image: "/placeholder.svg?height=300&width=300&text=Accessoires",
    productCount: 24,
    createdAt: new Date("2023-01-01"),
    updatedAt: new Date("2023-01-01"),
  },
  {
    id: "audio",
    name: "Audio",
    description: "Écouteurs, casques et enceintes",
    image: "/placeholder.svg?height=300&width=300&text=Audio",
    productCount: 15,
    createdAt: new Date("2023-01-01"),
    updatedAt: new Date("2023-01-01"),
  },
  {
    id: "tvs",
    name: "Téléviseurs",
    description: "Téléviseurs LED, OLED et Smart TV",
    image: "/placeholder.svg?height=300&width=300&text=TVs",
    productCount: 10,
    createdAt: new Date("2023-01-01"),
    updatedAt: new Date("2023-01-01"),
  },
  {
    id: "gaming",
    name: "Gaming",
    description: "Consoles et accessoires de jeu",
    image: "/placeholder.svg?height=300&width=300&text=Gaming",
    productCount: 18,
    createdAt: new Date("2023-01-01"),
    updatedAt: new Date("2023-01-01"),
  },
  {
    id: "smart-home",
    name: "Maison Connectée",
    description: "Appareils pour la maison intelligente",
    image: "/placeholder.svg?height=300&width=300&text=Smart+Home",
    productCount: 14,
    createdAt: new Date("2023-01-01"),
    updatedAt: new Date("2023-01-01"),
  },
]

export async function getCategories(): Promise<Category[]> {
  // Simuler un délai d'API
  await new Promise((resolve) => setTimeout(resolve, 500))
  return categories
}

export async function getCategoryById(id: string): Promise<Category | null> {
  // Simuler un délai d'API
  await new Promise((resolve) => setTimeout(resolve, 300))
  const category = categories.find((c) => c.id === id)
  return category || null
}

export async function getProductCountByCategory(categoryId: string): Promise<number> {
  // Simuler un délai d'API
  await new Promise((resolve) => setTimeout(resolve, 200))
  const category = await getCategoryById(categoryId)
  return category ? category.productCount : 0
}

