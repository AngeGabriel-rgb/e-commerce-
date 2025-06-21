const PromoBanner = () => {
  return (
    <div className="bg-secondary rounded-md p-6">
      <h2 className="text-2xl font-semibold text-primary-foreground mb-4">Offre Spéciale</h2>
      <p className="text-primary-foreground/90 text-lg mb-8">
        {
          "Profitez de nos promotions exclusives sur une large gamme de produits électroniques. Jusqu'à 30% de réduction sur les smartphones, ordinateurs portables et accessoires."
        }
      </p>
      <button className="bg-primary text-primary-foreground font-semibold py-2 px-4 rounded-md hover:bg-primary/80 transition-colors duration-200">
        Découvrez nos offres
      </button>
    </div>
  )
}

export default PromoBanner
