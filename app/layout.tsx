import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { TopBar } from "@/components/top-bar"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { CartProvider } from "@/hooks/use-cart"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Revive Furniture - Transform Your Space Today",
  description:
    "Discover premium furniture with Cash on Delivery. Modern designs, exceptional comfort, and quality craftsmanship.",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <CartProvider>
          <TopBar />
          <Header />
          {children}
          <Footer />
        </CartProvider>
      </body>
    </html>
  )
}
