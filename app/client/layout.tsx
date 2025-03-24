"use client";

import type React from "react";
import Header from "../../components/client/header";
import Footer from "../../components/client/footer";
import { CartProvider } from "../../components/client/cart-provider";
import { SessionProvider } from "next-auth/react";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SessionProvider>
      <CartProvider>
        <Header />
        <main className="flex-grow">{children}</main>
        <Footer />
      </CartProvider>
    </SessionProvider>
  );
}