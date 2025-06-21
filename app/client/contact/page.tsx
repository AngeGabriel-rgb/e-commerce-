import { ContactForm } from "@/components/client/contact-form"

export default function ContactPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-4">Contactez-nous</h1>
          <p className="text-muted-foreground">
            Nous sommes là pour vous aider. Envoyez-nous un message et nous vous répondrons rapidement.
          </p>
        </div>
        <ContactForm />
      </div>
    </div>
  )
}
