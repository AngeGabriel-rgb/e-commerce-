import type React from "react"
import { Header } from "@/components/client/header"
import Footer from "@/components/client/footer"
import { CartProvider } from "@/components/client/cart-provider"

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex flex-col min-h-screen">
      <CartProvider>
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </CartProvider>
    </div>
  )
}

