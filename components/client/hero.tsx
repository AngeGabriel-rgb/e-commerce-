import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function Hero() {
  return (
    <div className="relative bg-muted py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            Découvrez les dernières innovations technologiques
          </h1>
          <p className="text-xl text-muted-foreground mb-8">
            Smartphones, ordinateurs, accessoires et bien plus encore. Trouvez les meilleurs produits électroniques aux
            meilleurs prix.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button asChild size="lg">
              <Link href="/client/produits">Voir nos produits</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/client/promotions">Nos promotions</Link>
            </Button>
          </div>
        </div>
      </div>
      <div className="absolute right-0 top-0 h-full w-1/3 bg-gradient-to-l from-background to-transparent" />
    </div>
  )
}

