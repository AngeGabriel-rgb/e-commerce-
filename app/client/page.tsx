import { Button } from "../../components/ui/button"
import SearchBar from "../../components/client/search-bar"
import FeaturedProducts from "../../components/client/featured-products"
import CategoryList from "../../components/client/category-list"
import HeroCarousel from "../../components/client/hero-carousel"
import { getProducts } from "../../lib/services/product-service"
import Image from "next/image"
import Link from "next/link"

export default async function HomePage() {
  const products = await getProducts({ featured: true, limit: 4 })

  return (
    <div className="container mx-auto px-4 py-8">
      <section className="mb-12">
        <HeroCarousel />
      </section>

      <section className="mb-12">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          <h2 className="text-3xl font-bold">Catégories populaires</h2>
          <SearchBar />
        </div>
        <CategoryList />
      </section>

      <section className="mb-12">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold">Produits en vedette</h2>
          <Button variant="outline" asChild>
            <Link href="/client/produits">Voir tout</Link>
          </Button>
        </div>
        <FeaturedProducts products={products} />
      </section>

      <section className="mb-12">
        <div className="bg-primary/5 rounded-xl p-8">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="mb-6 md:mb-0 md:mr-8">
              <h2 className="text-3xl font-bold mb-4">Inscrivez-vous à notre newsletter</h2>
              <p className="text-muted-foreground mb-4">Recevez nos offres exclusives et les dernières nouveautés</p>
              <div className="flex">
                <input
                  type="email"
                  placeholder="Votre email"
                  className="px-4 py-2 border rounded-l-md w-full focus:outline-none focus:ring-2 focus:ring-primary"
                />
                <Button className="rounded-l-none">S'inscrire</Button>
              </div>
            </div>
            <div className="relative w-full max-w-[300px] h-[200px]">
              <Image
                src="/images/new.png?height=200&width=300"
                alt="Newsletter"
                fill
                className="rounded-lg object-cover"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

