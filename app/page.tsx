import Image from "next/image";

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <h1 className="text-4xl font-bold">Bienvenue dans notre E-commerce !</h1>
        <p className="text-lg">Découvrez nos produits exceptionnels.</p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {/* Exemple de produit 1 */}
          <div className="border rounded-lg p-4">
            <Image
              src="/path/to/product1.jpg"
              alt="Produit 1"
              width={200}
              height={200}
            />
            <h2 className="font-semibold">Produit 1</h2>
            <p>Prix : $19.99</p>
          </div>

          {/* Exemple de produit 2 */}
          <div className="border rounded-lg p-4">
            <Image
              src="/path/to/product2.jpg"
              alt="Produit 2"
              width={200}
              height={200}
            />
            <h2 className="font-semibold">Produit 2</h2>
            <p>Prix : $29.99</p>
          </div>

          {/* Exemple de produit 3 */}
          <div className="border rounded-lg p-4">
            <Image
              src="/path/to/product3.jpg"
              alt="Produit 3"
              width={200}
              height={200}
            />
            <h2 className="font-semibold">Produit 3</h2>
            <p>Prix : $39.99</p>
          </div>
        </div>
      </main>

      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
        {/* Lien vers d'autres pages ou ressources */}
        <a href="https://nextjs.org/docs" target="_blank" rel="noopener noreferrer">
          Documentation
        </a>
      </footer>
    </div>
  );
}