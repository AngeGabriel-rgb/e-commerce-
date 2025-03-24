import { NextResponse } from "next/server"
import { getProducts, createProduct } from "@/lib/services/product-service"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth-options"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const category = searchParams.get("category") || undefined
  const search = searchParams.get("search") || undefined
  const sort = searchParams.get("sort") || undefined
  const limit = searchParams.get("limit") ? Number.parseInt(searchParams.get("limit")!) : undefined

  try {
    const products = await getProducts({ category, search, sort, limit })
    return NextResponse.json(products)
  } catch (error) {
    console.error("Error fetching products:", error)
    return NextResponse.json({ error: "Failed to fetch products" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  const session = await getServerSession(authOptions)

  // Vérifier si l'utilisateur est connecté et a le rôle d'administrateur
  if (!session || session.user.role !== "admin") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    const productData = await request.json()
    const newProduct = await createProduct(productData)
    return NextResponse.json(newProduct, { status: 201 })
  } catch (error) {
    console.error("Error creating product:", error)
    return NextResponse.json({ error: "Failed to create product" }, { status: 500 })
  }
}

