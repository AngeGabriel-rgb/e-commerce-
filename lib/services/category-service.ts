import type { Category } from "../types"

// Simulated database of categories
const categories: Category[] = [
  {
    id: "smartphones",
    name: "Smartphones",
    slug: "smartphones",
    icon: "smartphone",
  },
  {
    id: "ordinateurs",
    name: "Ordinateurs",
    slug: "ordinateurs",
    icon: "laptop",
  },
  {
    id: "tablettes",
    name: "Tablettes",
    slug: "tablettes",
    icon: "tablet",
  },
  {
    id: "accessoires",
    name: "Accessoires",
    slug: "accessoires",
    icon: "headphones",
  },
]

export async function getCategories(): Promise<Category[]> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 300))

  return categories
}

export async function getCategoryById(id: string): Promise<Category | null> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 200))

  const category = categories.find((c) => c.id === id)
  return category || null
}

export async function createCategory(categoryData: Omit<Category, "id">): Promise<Category> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500))

  const newCategory: Category = {
    id: categoryData.slug,
    ...categoryData,
  }

  categories.push(newCategory)
  return newCategory
}

export async function updateCategory(id: string, categoryData: Partial<Category>): Promise<Category | null> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500))

  const index = categories.findIndex((c) => c.id === id)
  if (index === -1) return null

  const updatedCategory = {
    ...categories[index],
    ...categoryData,
  }

  categories[index] = updatedCategory
  return updatedCategory
}

export async function deleteCategory(id: string): Promise<boolean> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500))

  const index = categories.findIndex((c) => c.id === id)
  if (index === -1) return false

  categories.splice(index, 1)
  return true
}

