import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const testimonials = [
  {
    id: 1,
    name: "Sophie Martin",
    role: "Cliente fidèle",
    avatar: "/placeholder.svg?height=100&width=100&text=SM",
    content:
      "J'achète régulièrement chez ElectroShop et je suis toujours satisfaite de la qualité des produits et du service client. La livraison est rapide et le site est très facile à utiliser.",
  },
  {
    id: 2,
    name: "Thomas Dubois",
    role: "Professionnel",
    avatar: "/placeholder.svg?height=100&width=100&text=TD",
    content:
      "En tant que professionnel de l'informatique, je suis exigeant sur la qualité des produits. ElectroShop propose un excellent rapport qualité-prix et un service après-vente impeccable.",
  },
  {
    id: 3,
    name: "Julie Leroy",
    role: "Étudiante",
    avatar: "/placeholder.svg?height=100&width=100&text=JL",
    content:
      "J'ai acheté mon ordinateur portable pour mes études sur ElectroShop. Les conseils étaient pertinents et j'ai trouvé exactement ce dont j'avais besoin à un prix abordable.",
  },
]

export function Testimonials() {
  return (
    <section className="bg-secondary py-12">
      <div className="container">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-semibold">Ce que nos clients disent</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {
              "Découvrez les témoignages de nos clients satisfaits qui nous font confiance pour leurs achats d'électronique."
            }
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial) => (
            <Card key={testimonial.id}>
              <CardHeader>
                <CardTitle>{testimonial.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center space-x-4 mb-4">
                  <Avatar>
                    <AvatarImage src={testimonial.avatar || "/placeholder.svg"} alt={testimonial.name} />
                    <AvatarFallback>{testimonial.name.substring(0, 2)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-medium">{testimonial.name}</p>
                    <p className="text-xs text-muted-foreground">{testimonial.role}</p>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">{testimonial.content}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
