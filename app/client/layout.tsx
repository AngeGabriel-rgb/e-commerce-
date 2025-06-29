import type React from "react"
import { CartProvider } from "@/components/client/cart-provider"
import Footer from "@/components/client/footer"
import Header from "@/components/client/header"

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <CartProvider>
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </div>
    </CartProvider>
  )
}
