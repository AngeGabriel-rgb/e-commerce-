// components/client/footer.tsx
import Link from "next/link"
import { Facebook, Instagram, Twitter } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-background border-t py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="font-bold text-lg mb-4">ElectroShop</h3>
            <p className="text-muted-foreground mb-4">
              Votre boutique d'électronique en ligne avec les meilleurs prix et une livraison rapide.
            </p>
            <div className="flex space-x-4">
              <Link href="#" className="text-muted-foreground hover:text-primary">
                <Facebook size={20} />
                <span className="sr-only">Facebook</span>
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-primary">
                <Twitter size={20} />
                <span className="sr-only">Twitter</span>
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-primary">
                <Instagram size={20} />
                <span className="sr-only">Instagram</span>
              </Link>
            </div>
          </div>
          
          <div>
            <h3 className="font-bold text-lg mb-4">Catégories</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/client/produits?category=smartphones" className="text-muted-foreground hover:text-primary">
                  Smartphones
                </Link>
              </li>
              <li>
                <Link href="/client/produits?category=ordinateurs" className="text-muted-foreground hover:text-primary">
                  Ordinateurs
                </Link>
              </li>
              <li>
                <Link href="/client/produits?category=tablettes" className="text-muted-foreground hover:text-primary">
                  Tablettes
                </Link>
              </li>
              <li>
                <Link href="/client/produits?category=accessoires" className="text-muted-foreground hover:text-primary">
                  Accessoires
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-bold text-lg mb-4">Informations</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/client/a-propos" className="text-muted-foreground hover:text-primary">
                  À propos de nous
                </Link>
              </li>
              <li>
                <Link href="/client/livraison" className="text-muted-foreground hover:text-primary">
                  Livraison
                </Link>
              </li>
              <li>
                <Link href="/client/conditions" className="text-muted-foreground hover:text-primary">
                  Conditions générales
                </Link>
              </li>
              <li>
                <Link href="/client/confidentialite" className="text-muted-foreground hover:text-primary">
                  Politique de confidentialité
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-bold text-lg mb-4">Contact</h3>
            <address className="not-italic text-muted-foreground">
              <p>123 Rue du Commerce</p>
              <p>75001 Paris, France</p>
              <p className="mt-2">Email: contact@electroshop.fr</p>
              <p>Tél: 01 23 45 67 89</p>
            </address>
          </div>
        </div>
        
        <div className="border-t mt-8 pt-8 text-center text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} ElectroShop. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  )
}