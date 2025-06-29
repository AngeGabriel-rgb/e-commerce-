"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import Link from "next/link"

interface FormData {
  cardNumber: string
  expiry: string
  cvc: string
  name: string
  email: string
}

interface PaymentData {
  amount: number
  items: string[]
  total: number
}

export default function PaiementPage() {
  const [formData, setFormData] = useState<FormData>({
    cardNumber: '',
    expiry: '',
    cvc: '',
    name: '',
    email: ''
  })
  
  const [paymentData, setPaymentData] = useState<PaymentData>({
    amount: 29.99,
    items: ['Produit A', 'Produit B'],
    total: 29.99
  })
  
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  // Charger Stripe
  useEffect(() => {
    if (!window.Stripe) {
      const script = document.createElement('script')
      script.src = 'https://js.stripe.com/v3/'
      script.async = true
      document.body.appendChild(script)
    }
  }, [])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const formatCardNumber = (value: string): string => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '')
    const matches = v.match(/\d{4,16}/g)
    const match = matches && matches[0] || ''
    const parts = []
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4))
    }
    if (parts.length) {
      return parts.join(' ')
    } else {
      return v
    }
  }

  const formatExpiry = (value: string): string => {
    const v = value.replace(/\D/g, '')
    if (v.length >= 2) {
      return v.substring(0, 2) + '/' + v.substring(2, 4)
    }
    return v
  }

  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatCardNumber(e.target.value)
    setFormData(prev => ({
      ...prev,
      cardNumber: formatted
    }))
  }

  const handleExpiryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatExpiry(e.target.value)
    setFormData(prev => ({
      ...prev,
      expiry: formatted
    }))
  }

  const validateForm = (): boolean => {
    if (!formData.cardNumber || formData.cardNumber.replace(/\s/g, '').length < 13) {
      setError('Numéro de carte invalide')
      return false
    }
    if (!formData.expiry || formData.expiry.length < 5) {
      setError('Date d\'expiration invalide')
      return false
    }
    if (!formData.cvc || formData.cvc.length < 3) {
      setError('CVC invalide')
      return false
    }
    if (!formData.name.trim()) {
      setError('Nom sur la carte requis')
      return false
    }
    if (!formData.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      setError('Adresse email invalide')
      return false
    }
    return true
  }

  const processPayment = async () => {
    if (!validateForm()) return

    setLoading(true)
    setError('')

    try {
      // 1. Créer PaymentIntent
      const response = await fetch('/api/create-payment-intent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: paymentData.total,
          currency: 'eur',
          customer_email: formData.email,
          description: `Commande: ${paymentData.items.join(', ')}`,
          metadata: {
            order_id: `ORDER_${Date.now()}`,
            items: paymentData.items.join(', '),
            customer_name: formData.name
          }
        }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Erreur lors de la création du paiement')
      }

      const { clientSecret, paymentIntentId } = await response.json()

      // 2. Confirmer le paiement avec Stripe
      const stripePublicKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
      if (
        typeof window === "undefined" ||
        typeof (window as any).Stripe !== "function" ||
        !stripePublicKey
      ) {
        throw new Error('Stripe non initialisé ou clé publique manquante')
      }
      const stripe = (window as any).Stripe(stripePublicKey as string)
      
      if (!stripe) {
        throw new Error('Stripe non initialisé')
      }
      
      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: {
            number: formData.cardNumber.replace(/\s/g, ''),
            exp_month: parseInt(formData.expiry.split('/')[0]),
            exp_year: parseInt('20' + formData.expiry.split('/')[1]),
            cvc: formData.cvc,
          },
          billing_details: {
            name: formData.name,
            email: formData.email,
          },
        },
      })

      if (result.error) {
        setError(result.error.message || 'Erreur de paiement')
      } else {
        setSuccess(true)
        console.log('Paiement réussi:', result.paymentIntent)
        
        // Redirection après succès
        setTimeout(() => {
          window.location.href = '/client/confirmation?payment_intent=' + paymentIntentId
        }, 2000)
      }

    } catch (err: any) {
      console.error('Erreur de paiement:', err)
      setError(err.message || 'Une erreur est survenue lors du paiement')
    } finally {
      setLoading(false)
    }
  }

  if (success) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <Card className="w-[500px] bg-white shadow-md rounded-lg">
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="text-green-600 text-6xl mb-4">✓</div>
              <h2 className="text-2xl font-semibold text-gray-800 mb-2">Paiement réussi !</h2>
              <p className="text-gray-600">Votre commande a été traitée avec succès.</p>
              <p className="text-sm text-gray-500 mt-2">
                Montant: {paymentData.total.toFixed(2)} €
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
      <Card className="w-full max-w-md bg-white shadow-md rounded-lg">
        <CardHeader>
          <CardTitle className="text-2xl font-semibold text-gray-800">
            Informations de paiement
          </CardTitle>
          <CardDescription className="text-gray-600">
            Entrez vos informations de paiement ci-dessous
          </CardDescription>
          <div className="text-sm text-gray-500">
            Total: <span className="font-semibold">{paymentData.total.toFixed(2)} €</span>
          </div>
        </CardHeader>
        
        <CardContent>
          {error && (
            <Alert variant="destructive" className="mb-4">
              <AlertDescription>
                {error}
              </AlertDescription>
            </Alert>
          )}
          
          <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input 
                id="email" 
                name="email"
                type="email"
                placeholder="votre@email.com" 
                value={formData.email}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="card-number">Numéro de carte</Label>
              <Input 
                id="card-number" 
                name="cardNumber"
                placeholder="0000 0000 0000 0000" 
                value={formData.cardNumber}
                onChange={handleCardNumberChange}
                maxLength={19}
                required
              />
            </div>
            
            <div className="flex space-x-4">
              <div className="space-y-2 w-1/2">
                <Label htmlFor="expiry">Date d'expiration</Label>
                <Input 
                  id="expiry" 
                  name="expiry"
                  placeholder="MM/AA" 
                  value={formData.expiry}
                  onChange={handleExpiryChange}
                  maxLength={5}
                  required
                />
              </div>
              <div className="space-y-2 w-1/2">
                <Label htmlFor="cvc">CVC</Label>
                <Input 
                  id="cvc" 
                  name="cvc"
                  placeholder="123" 
                  type="text"
                  value={formData.cvc}
                  onChange={handleInputChange}
                  maxLength={4}
                  required
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="name">Nom sur la carte</Label>
              <Input 
                id="name" 
                name="name"
                placeholder="Votre nom" 
                type="text"
                value={formData.name}
                onChange={handleInputChange}
                required
              />
            </div>
          </form>
        </CardContent>
        
        <CardFooter className="flex flex-col space-y-4">
          <Button 
            className="w-full" 
            onClick={processPayment}
            disabled={loading}
          >
            {loading ? 'Traitement...' : `Payer ${paymentData.total.toFixed(2)} €`}
          </Button>
          
          <div className="flex space-x-2 w-full">
            <Button variant="outline" size="sm" className="flex-1" asChild>
              <Link href="/client/panier">Retour au panier</Link>
            </Button>
            <Button variant="ghost" size="sm" className="flex-1" asChild>
              <Link href="/client/produits">Continuer les achats</Link>
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}