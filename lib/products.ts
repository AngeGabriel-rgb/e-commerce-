// Types pour les produits
export interface Product {
  id: string
  name: string
  description: string
  price: number
  images: string[]
  category: string
  features?: string[]
  specs?: Record<string, string>
  stock: number
  rating?: number
  reviews?: number
  colors?: { name: string; value: string }[]
}

// Base de données de produits (à alimenter avec vos vraies données)
const products: Product[] = []

// Fonction pour récupérer tous les produits
export async function getProducts(): Promise<Product[]> {
  // Simuler un délai de chargement
  await new Promise((resolve) => setTimeout(resolve, 500))
  return products
}

// Fonction pour récupérer un produit par son ID
export async function getProductById(id: string): Promise<Product | undefined> {
  // Simuler un délai de chargement
  await new Promise((resolve) => setTimeout(resolve, 300))
  return products.find((product) => product.id === id)
}

// Fonction pour récupérer des produits recommandés
export async function getRecommendedProducts(currentProductId: string): Promise<Product[]> {
  // Simuler un délai de chargement
  await new Promise((resolve) => setTimeout(resolve, 800))
  // Exclure le produit actuel et retourner jusqu'à 4 produits
  return products.filter((product) => product.id !== currentProductId).slice(0, 4)
}