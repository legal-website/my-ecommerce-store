"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, Star, ShoppingBag } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

interface ShowcaseProduct {
  id: string
  name: string
  category: string
  price: number
  originalPrice: number
  discount: number
  rating: number
  reviews: number
  image: string
  description: string
  features: string[]
  colors: string[]
}

const showcaseProducts: ShowcaseProduct[] = [
  {
    id: "bed-showcase",
    name: "Premium King Size Bed",
    category: "Bedroom",
    price: 89999,
    originalPrice: 119999,
    discount: 25,
    rating: 4.9,
    reviews: 234,
    image: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=600&h=600&fit=crop",
    description: "Luxurious king size bed with premium upholstery and ergonomic design for ultimate comfort",
    features: ["Premium Materials", "Ergonomic Design", "Easy Assembly", "2 Year Warranty"],
    colors: ["Natural Oak", "Dark Walnut", "White Finish"],
  },
  {
    id: "office-chair-showcase",
    name: "Executive Office Chair",
    category: "Office",
    price: 45999,
    originalPrice: 59999,
    discount: 23,
    rating: 4.8,
    reviews: 189,
    image: "https://images.unsplash.com/photo-1541558869434-2840d308329a?w=600&h=600&fit=crop",
    description: "Professional executive chair with lumbar support and premium leather finish for long work hours",
    features: ["Lumbar Support", "Premium Leather", "360° Rotation", "Height Adjustable"],
    colors: ["Black Leather", "Brown Leather", "Gray Fabric"],
  },
  {
    id: "gaming-setup-showcase",
    name: "Gaming Room Setup",
    category: "Gaming",
    price: 125999,
    originalPrice: 159999,
    discount: 21,
    rating: 4.9,
    reviews: 156,
    image: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=600&h=600&fit=crop",
    description:
      "Complete gaming room setup with ergonomic chair, desk, and RGB lighting for ultimate gaming experience",
    features: ["RGB Lighting", "Cable Management", "Ergonomic Design", "Gaming Optimized"],
    colors: ["Black & Red", "Black & Blue", "All Black"],
  },
]

export function ProductShowcase() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const sectionRef = useRef<HTMLDivElement>(null)

  // Auto-play functionality
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % showcaseProducts.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % showcaseProducts.length)
  }

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + showcaseProducts.length) % showcaseProducts.length)
  }

  const currentProduct = showcaseProducts[currentIndex]

  return (
    <section ref={sectionRef} className="py-8 relative overflow-hidden" style={{ height: "550px" }}>
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-50 via-white to-[#F1BA69]/5">
        {/* Animated Circles */}
        <div className="absolute top-20 left-20 w-32 h-32 bg-gradient-to-r from-[#C53D39]/10 to-[#F1BA69]/10 rounded-full animate-pulse"></div>
        <div
          className="absolute top-40 right-32 w-24 h-24 bg-gradient-to-r from-[#F1BA69]/15 to-[#C53D39]/15 rounded-full animate-bounce"
          style={{ animationDuration: "3s" }}
        ></div>
        <div
          className="absolute bottom-32 left-40 w-20 h-20 bg-gradient-to-r from-[#C53D39]/8 to-[#F1BA69]/8 rounded-full animate-pulse"
          style={{ animationDelay: "1s" }}
        ></div>

        {/* Animated Dotted Vectors */}
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-[#C53D39]/30 rounded-full animate-ping"></div>
        <div
          className="absolute top-1/3 right-1/4 w-1 h-1 bg-[#F1BA69]/40 rounded-full animate-ping"
          style={{ animationDelay: "0.5s" }}
        ></div>
        <div
          className="absolute bottom-1/4 left-1/3 w-1.5 h-1.5 bg-[#C53D39]/25 rounded-full animate-ping"
          style={{ animationDelay: "1.5s" }}
        ></div>
        <div
          className="absolute bottom-1/3 right-1/3 w-1 h-1 bg-[#F1BA69]/35 rounded-full animate-ping"
          style={{ animationDelay: "2s" }}
        ></div>

        {/* Floating Geometric Shapes */}
        <div
          className="absolute top-16 right-16 w-16 h-16 border-2 border-[#C53D39]/20 rounded-lg rotate-45 animate-spin"
          style={{ animationDuration: "8s" }}
        ></div>
        <div className="absolute bottom-16 left-16 w-12 h-12 border-2 border-[#F1BA69]/20 rounded-full animate-pulse"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10 h-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center h-full max-w-7xl mx-auto">
          {/* Left Side - Product Image */}
          <div className="relative">
            {/* Main Product Image with Transparent Background */}
            <div className="relative w-full h-96 lg:h-[450px]">
              <div className="absolute inset-0 bg-gradient-to-r from-white/80 to-transparent rounded-3xl"></div>
              <Image
                src={currentProduct.image || "/placeholder.svg"}
                alt={currentProduct.name}
                fill
                className="object-contain transition-all duration-700 ease-out drop-shadow-2xl"
                style={{
                  filter: "drop-shadow(0 25px 50px rgba(0, 0, 0, 0.15))",
                  mixBlendMode: "multiply",
                }}
                priority
              />
            </div>

            {/* Navigation Arrows */}
            <Button
              variant="outline"
              size="icon"
              className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/90 backdrop-blur-sm border-2 border-gray-200 hover:border-[#C53D39] hover:bg-white shadow-lg"
              onClick={prevSlide}
            >
              <ChevronLeft className="h-6 w-6" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/90 backdrop-blur-sm border-2 border-gray-200 hover:border-[#C53D39] hover:bg-white shadow-lg"
              onClick={nextSlide}
            >
              <ChevronRight className="h-6 w-6" />
            </Button>
          </div>

          {/* Right Side - Product Details */}
          <div className="space-y-6">
            {/* Category Badge */}
            <div className="inline-block">
              <span className="bg-gradient-to-r from-[#C53D39] to-[#F1BA69] text-white px-4 py-2 rounded-full text-sm font-medium tracking-wide">
                {currentProduct.category.toUpperCase()}
              </span>
            </div>

            {/* Product Title */}
            <div>
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-3">{currentProduct.name}</h2>
              <p className="text-gray-600 text-lg leading-relaxed">{currentProduct.description}</p>
            </div>

            {/* Rating */}
            <div className="flex items-center space-x-3">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-5 w-5 ${i < Math.floor(currentProduct.rating) ? "text-yellow-400 fill-current" : "text-gray-300"}`}
                  />
                ))}
              </div>
              <span className="text-gray-600">({currentProduct.rating})</span>
              <span className="text-gray-500">• {currentProduct.reviews} reviews</span>
            </div>

            {/* Price */}
            <div className="flex items-baseline space-x-4">
              <span className="text-4xl font-bold text-[#C53D39]">₹{currentProduct.price.toLocaleString()}</span>
              <span className="text-xl text-gray-400 line-through">
                ₹{currentProduct.originalPrice.toLocaleString()}
              </span>
              <span className="bg-gradient-to-r from-[#C53D39] to-[#F1BA69] text-white px-3 py-1 rounded-full text-sm font-medium">
                -{currentProduct.discount}% OFF
              </span>
            </div>

            {/* Features */}
            <div>
              <h4 className="font-semibold text-gray-900 mb-3">Key Features:</h4>
              <div className="grid grid-cols-2 gap-2">
                {currentProduct.features.map((feature, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-gradient-to-r from-[#C53D39] to-[#F1BA69] rounded-full"></div>
                    <span className="text-gray-600 text-sm">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Colors */}
            <div>
              <h4 className="font-semibold text-gray-900 mb-3">Available Colors:</h4>
              <div className="flex space-x-3">
                {currentProduct.colors.map((color, index) => (
                  <span key={index} className="text-sm text-gray-600 bg-gray-100 px-3 py-1 rounded-full">
                    {color}
                  </span>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button size="lg" className="flex-1 text-lg px-8 py-4">
                <ShoppingBag className="h-5 w-5 mr-2" />
                Add to Cart
              </Button>
              <Button asChild variant="outline" size="lg" className="flex-1 text-lg px-8 py-4 bg-transparent">
                <Link href={`/product/${currentProduct.id}`}>View Details</Link>
              </Button>
            </div>
          </div>
        </div>

        {/* Slide Indicators */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-3">
          {showcaseProducts.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentIndex
                  ? "bg-gradient-to-r from-[#C53D39] to-[#F1BA69] w-8"
                  : "bg-gray-300 hover:bg-gray-400"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
