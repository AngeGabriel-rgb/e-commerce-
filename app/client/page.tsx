import { Button } from "../../components/ui/button"
import SearchBar from "../../components/client/search-bar"
import FeaturedProducts from "../../components/client/featured-products"
import CategoryList from "../../components/client/category-list"
import { getProducts } from "../../lib/services/product-service"
import Image from "next/image"

export default async function HomePage() {
  const products = await getProducts({ featured: true, limit: 4 })

  return (
    <div className="container mx-auto px-4 py-8">
      <section className="mb-12">
        <div className="relative h-[500px] rounded-xl overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/30 z-10 flex flex-col justify-center px-10">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
              Découvrez les dernières technologies
            </h1>
            <p className="text-xl text-white/90 mb-8 max-w-xl">
              Smartphones, ordinateurs, accessoires et bien plus encore à des prix compétitifs
            </p>
            <div>
  <Button size="lg" className="mr-4 bg-blue text-white hover:bg-blue-900 active: bg-blue-950">
    Voir les produits
  </Button>
  <Button
    size="lg"
    className="mr-4 bg-blue text-white hover:bg-blue-900 active: bg-blue-950"
  >
    Promotions
  </Button>
</div>
          </div>
          <Image
  src="/images/b.png" // Chemin de votre image
  alt="Bannière produits électroniques"
  fill
  priority
  sizes="100vw"
  className="object-cover"
/>
        </div>
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
          <Button variant="outline">Voir tout</Button>
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
                src="/images/newsletter.png"
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

