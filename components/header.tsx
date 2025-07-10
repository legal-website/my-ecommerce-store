"use client"

import { Button } from "@/components/ui/button"
import { useCart } from "@/hooks/use-cart"
import { ShoppingCart, Search, User, Heart, Menu } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { useState } from "react"
import { MegaMenu } from "./mega-menu"

export function Header() {
  const { items } = useCart()
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0)
  const [showMegaMenu, setShowMegaMenu] = useState(false)
  const [activeLink, setActiveLink] = useState("")

  return (
    <header className="bg-white/95 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        {/* Secondary header */}
        <div className="flex items-center justify-between py-3 text-sm text-gray-600 border-b border-gray-100">
          <div className="flex items-center space-x-6 font-poppins">
            <span className="flex items-center space-x-2">
              <span>📞 +01 23456789</span>
            </span>
            <span className="flex items-center space-x-2">
              <span>✉️ furniture@domain.com</span>
            </span>
          </div>
          <div className="flex items-center space-x-4 font-poppins">
            <span>Summer sale discount of 50% off! Shop Now</span>
            <div className="flex items-center space-x-2">
              <span>🇺🇸 USD</span>
            </div>
          </div>
        </div>

        {/* Main header */}
        <div className="flex items-center justify-between py-4 relative">
          <Link href="/" className="flex items-center space-x-3">
            <Image src="/logo.webp" alt="Revive Furniture" width={180} height={60} className="h-12 w-auto" />
          </Link>

          <nav className="hidden lg:flex items-center space-x-8 font-poppins font-medium">
            <Link
              href="/"
              className={`text-gray-700 hover:text-[#C53D39] transition-all duration-300 ${activeLink === "home" ? "text-[#C53D39]" : ""}`}
              onMouseEnter={() => setActiveLink("home")}
              onMouseLeave={() => setActiveLink("")}
            >
              Home
            </Link>
            <div
              className="relative"
              onMouseEnter={() => setShowMegaMenu(true)}
              onMouseLeave={() => setShowMegaMenu(false)}
            >
              <Link
                href="/shop"
                className={`text-gray-700 hover:text-[#C53D39] transition-all duration-300 ${activeLink === "shop" ? "text-[#C53D39]" : ""}`}
                onMouseEnter={() => setActiveLink("shop")}
              >
                Shop
              </Link>
            </div>
            <Link
              href="/products"
              className={`text-gray-700 hover:text-[#C53D39] transition-all duration-300 ${activeLink === "products" ? "text-[#C53D39]" : ""}`}
              onMouseEnter={() => setActiveLink("products")}
              onMouseLeave={() => setActiveLink("")}
            >
              Products
            </Link>
            <Link
              href="/about"
              className={`text-gray-700 hover:text-[#C53D39] transition-all duration-300 ${activeLink === "about" ? "text-[#C53D39]" : ""}`}
              onMouseEnter={() => setActiveLink("about")}
              onMouseLeave={() => setActiveLink("")}
            >
              About
            </Link>
            <Link
              href="/contact"
              className={`text-gray-700 hover:text-[#C53D39] transition-all duration-300 ${activeLink === "contact" ? "text-[#C53D39]" : ""}`}
              onMouseEnter={() => setActiveLink("contact")}
              onMouseLeave={() => setActiveLink("")}
            >
              Contact
            </Link>
          </nav>

          <div className="flex items-center space-x-4">
            {/* Search Bar */}
            <div className="relative hidden md:block">
              <input
                type="text"
                placeholder="Search furniture..."
                className="w-64 pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-[#C53D39] focus:border-transparent transition-all duration-300 font-poppins"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            </div>

            <Button variant="ghost" size="icon" className="hover:bg-gray-100 transition-all duration-300">
              <Search className="h-5 w-5 md:hidden" />
            </Button>

            <Button variant="ghost" size="icon" className="hover:bg-gray-100 transition-all duration-300">
              <User className="h-5 w-5" />
            </Button>

            <Button variant="ghost" size="icon" className="hover:bg-gray-100 transition-all duration-300 relative">
              <Heart className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 bg-[#C53D39] text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                0
              </span>
            </Button>

            <Button asChild variant="ghost" className="relative hover:bg-gray-100 transition-all duration-300">
              <Link href="/cart" className="flex items-center space-x-1">
                <ShoppingCart className="h-5 w-5" />
                {itemCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-[#C53D39] text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {itemCount}
                  </span>
                )}
              </Link>
            </Button>

            <Button variant="ghost" size="icon" className="lg:hidden">
              <Menu className="h-5 w-5" />
            </Button>
          </div>

          {/* Mega Menu */}
          <MegaMenu
            isVisible={showMegaMenu}
            onMouseEnter={() => setShowMegaMenu(true)}
            onMouseLeave={() => setShowMegaMenu(false)}
          />
        </div>
      </div>
    </header>
  )
}
