"use client"

import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react"
import Link from "next/link"

export function Hero() {
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <section className="relative min-h-screen bg-gradient-to-br from-gray-50 via-white to-orange-50 overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-r from-red-400/20 to-orange-400/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-r from-orange-400/20 to-yellow-400/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center min-h-screen py-20">
          {/* Left content */}
          <div className="space-y-8">
            <div className="inline-block">
              <span className="bg-gradient-to-r from-red-500 to-orange-500 text-white px-4 py-2 rounded-full text-sm font-medium">
                FURNITURE SALE
              </span>
            </div>

            <h1 className="text-6xl lg:text-7xl font-bold leading-tight">
              <span className="block text-gray-900">Transform</span>
              <span className="block bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent">
                Your Space
              </span>
              <span className="block text-gray-900">Today</span>
            </h1>

            <p className="text-xl text-gray-600 max-w-lg leading-relaxed">
              Discover premium furniture that combines modern design with exceptional comfort. Create the perfect living
              space with our curated collection.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button asChild size="xl" className="group">
                <Link href="#products" className="flex items-center space-x-2">
                  <span>Explore Collection</span>
                  <span className="group-hover:translate-x-1 transition-transform">→</span>
                </Link>
              </Button>
              <Button asChild variant="outline" size="xl">
                <Link href="/about">Learn More</Link>
              </Button>
            </div>

            <div className="flex items-center space-x-8 pt-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-gray-900">1000+</div>
                <div className="text-sm text-gray-600">Happy Customers</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-gray-900">500+</div>
                <div className="text-sm text-gray-600">Premium Products</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-gray-900">24/7</div>
                <div className="text-sm text-gray-600">Support</div>
              </div>
            </div>
          </div>

          {/* Right content - Floating furniture with parallax */}
          <div className="relative">
            <div
              className="relative transform transition-transform duration-1000 ease-out"
              style={{
                transform: `translateY(${scrollY * 0.1}px) rotateY(${scrollY * 0.05}deg)`,
              }}
            >
              {/* Main furniture image */}
              <div className="relative w-full h-96 lg:h-[500px] bg-gradient-to-br from-gray-100 to-gray-200 rounded-3xl shadow-2xl overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-red-500/10 to-orange-500/10"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-80 h-80 bg-gradient-to-br from-amber-400 to-orange-500 rounded-2xl shadow-xl transform rotate-12 hover:rotate-6 transition-transform duration-500">
                    <div className="w-full h-full bg-gradient-to-br from-amber-300 to-orange-400 rounded-2xl m-2 flex items-center justify-center">
                      <span className="text-white text-2xl font-bold">Modern Sofa</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating elements */}
              <div
                className="absolute -top-10 -left-10 w-20 h-20 bg-gradient-to-r from-red-400 to-orange-400 rounded-full shadow-lg animate-bounce"
                style={{ animationDelay: "0s", animationDuration: "3s" }}
              ></div>
              <div
                className="absolute -bottom-5 -right-5 w-16 h-16 bg-gradient-to-r from-orange-400 to-yellow-400 rounded-full shadow-lg animate-bounce"
                style={{ animationDelay: "1s", animationDuration: "3s" }}
              ></div>
              <div
                className="absolute top-1/2 -right-8 w-12 h-12 bg-gradient-to-r from-red-300 to-pink-300 rounded-full shadow-lg animate-bounce"
                style={{ animationDelay: "2s", animationDuration: "3s" }}
              ></div>
            </div>

            {/* Decorative elements */}
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute top-10 right-10 text-6xl opacity-10 font-bold text-gray-400 transform rotate-12">
                RF
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-gray-400 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-gradient-to-b from-red-500 to-orange-500 rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  )
}
