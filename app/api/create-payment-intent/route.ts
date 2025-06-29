import { NextResponse } from "next/server"
import Stripe from "stripe"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "", {
  apiVersion: "2025-03-31.basil",
})

interface PaymentRequestBody {
  amount: number
  currency?: string
  customer_email?: string
  metadata?: Record<string, string>
  description?: string
  customer_id?: string
}

export async function POST(request: Request) {
  try {
    if (!process.env.STRIPE_SECRET_KEY) {
      console.error("STRIPE_SECRET_KEY n'est pas configurée")
      return NextResponse.json(
        { error: "Configuration Stripe manquante" }, 
        { status: 500 }
      )
    }

    const body: PaymentRequestBody = await request.json()
    const { 
      amount, 
      currency = "eur", 
      customer_email, 
      metadata = {},
      description = "Paiement e-commerce",
      customer_id 
    } = body

    // Validations
    if (!amount || typeof amount !== 'number' || amount <= 0) {
      return NextResponse.json(
        { error: "Montant invalide" }, 
        { status: 400 }
      )
    }

    const amountInCents = Math.round(amount * 100)

    // Montant minimum (50 centimes pour EUR)
    if (amountInCents < 50) {
      return NextResponse.json(
        { error: "Montant minimum: 0.50 EUR" },
        { status: 400 }
      )
    }

    // Validation email
    if (customer_email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(customer_email)) {
      return NextResponse.json(
        { error: "Adresse email invalide" },
        { status: 400 }
      )
    }

    const paymentIntentParams: Stripe.PaymentIntentCreateParams = {
      amount: amountInCents,
      currency: currency.toLowerCase(),
      description,
      metadata: {
        ...metadata,
        created_at: new Date().toISOString(),
      },
      automatic_payment_methods: {
        enabled: true,
      },
    }

    if (customer_email) {
      paymentIntentParams.receipt_email = customer_email
    }

    if (customer_id) {
      paymentIntentParams.customer = customer_id
    }

    const paymentIntent = await stripe.paymentIntents.create(paymentIntentParams)

    console.log(`PaymentIntent créé: ${paymentIntent.id} pour ${amountInCents/100} ${currency}`)

    return NextResponse.json({ 
      clientSecret: paymentIntent.client_secret,
      paymentIntentId: paymentIntent.id,
      amount: amountInCents,
      currency: currency.toLowerCase()
    })

  } catch (error) {
    console.error("Erreur PaymentIntent:", error)
    
    if (error instanceof Stripe.errors.StripeError) {
      return NextResponse.json(
        { 
          error: "Erreur de paiement",
          details: error.message,
          type: error.type
        }, 
        { status: 400 }
      )
    }

    return NextResponse.json(
      { error: "Erreur interne du serveur" }, 
      { status: 500 }
    )
  }
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const paymentIntentId = searchParams.get('payment_intent_id')

    if (!paymentIntentId) {
      return NextResponse.json(
        { error: "ID de paiement manquant" },
        { status: 400 }
      )
    }

    const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId)

    return NextResponse.json({
      id: paymentIntent.id,
      status: paymentIntent.status,
      amount: paymentIntent.amount,
      currency: paymentIntent.currency,
      created: paymentIntent.created,
    })

  } catch (error) {
    console.error("Erreur récupération paiement:", error)
    
    if (error instanceof Stripe.errors.StripeError) {
      return NextResponse.json(
        { error: error.message },
        { status: 400 }
      )
    }

    return NextResponse.json(
      { error: "Erreur interne du serveur" },
      { status: 500 }
    )
  }
}