"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"
import Image from "next/image"

interface Product {
  id: string
  name: string
  price: number
  originalPrice?: number
  image: string
  description: string
  category: string
}

const featuredProducts: Product[] = [
  {
    id: "hero-1",
    name: "Luxe Sectional Sofa",
    price: 2299.99,
    originalPrice: 2899.99,
    image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&h=600&fit=crop",
    description: "Premium leather sectional with ergonomic design and built-in USB charging ports for modern living",
    category: "Living Room",
  },
  {
    id: "hero-2",
    name: "Executive Office Chair",
    price: 899.99,
    originalPrice: 1199.99,
    image: "https://images.unsplash.com/photo-1541558869434-2840d308329a?w=800&h=600&fit=crop",
    description: "Ergonomic office chair with lumbar support and premium materials for all-day comfort",
    category: "Office",
  },
  {
    id: "hero-3",
    name: "Modern Dining Set",
    price: 1599.99,
    originalPrice: 1999.99,
    image: "https://images.unsplash.com/photo-1449247709967-d4461a6a6103?w=800&h=600&fit=crop",
    description: "Contemporary 8-seater dining table with matching chairs in premium oak finish",
    category: "Dining Room",
  },
]

export function HeroCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  const heroRef = useRef<HTMLDivElement>(null)
  const productImageRef = useRef<HTMLDivElement>(null)
  const [hasAnimated, setHasAnimated] = useState<{ [key: number]: boolean }>({})

  useEffect(() => {
    if (!isAutoPlaying) return

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % featuredProducts.length)
    }, 6000)

    return () => clearInterval(interval)
  }, [isAutoPlaying])

  useEffect(() => {
    const handleScroll = () => {
      // Check if current slide has already been animated
      if (hasAnimated[currentSlide] || !heroRef.current || !productImageRef.current) return

      const scrollY = window.scrollY
      const heroHeight = heroRef.current.offsetHeight

      // Trigger animation only once when user scrolls 40% of hero
      if (scrollY > heroHeight * 0.4) {
        setHasAnimated((prev) => ({ ...prev, [currentSlide]: true }))
        animateProductToListing()
      }
    }

    const animateProductToListing = () => {
      const currentProduct = featuredProducts[currentSlide]
      const productImageElement = productImageRef.current
      const targetElement = document.getElementById(`product-${currentProduct.id}`)

      if (!productImageElement || !targetElement) return

      // Get the product card's image container (first child with aspect-square class)
      const targetImageContainer = targetElement.querySelector(".aspect-square")
      if (!targetImageContainer) return

      // Get exact positions
      const imageRect = productImageElement.getBoundingClientRect()

      // Create the floating image element
      const floatingImage = document.createElement("div")
      floatingImage.style.cssText = `
        position: fixed;
        left: ${imageRect.left}px;
        top: ${imageRect.top}px;
        width: ${imageRect.width}px;
        height: ${imageRect.height}px;
        z-index: 1000;
        border-radius: 24px;
        overflow: hidden;
        opacity: 1;
        transition: all 2.5s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
        transform: scale(1) rotate(0deg);
        pointer-events: none;
      `

      // Add the image with 100% opacity
      floatingImage.innerHTML = `
        <img src="${currentProduct.image}" alt="${currentProduct.name}" 
             style="width: 100%; height: 100%; object-fit: cover; opacity: 1;" />
      `

      document.body.appendChild(floatingImage)

      // Slightly dim the original image during animation
      productImageElement.style.opacity = "0.4"
      productImageElement.style.transition = "opacity 0.3s ease"

      // Start the realistic animation after a brief delay
      setTimeout(() => {
        // Get fresh target position (targeting the image container specifically)
        const newTargetRect = targetImageContainer.getBoundingClientRect()

        // Calculate final position (no scroll offset needed for fixed positioning)
        const finalLeft = newTargetRect.left
        const finalTop = newTargetRect.top
        const finalWidth = newTargetRect.width
        const finalHeight = newTargetRect.height

        // Apply the transformation with realistic physics
        floatingImage.style.cssText += `
          left: ${finalLeft}px;
          top: ${finalTop}px;
          width: ${finalWidth}px;
          height: ${finalHeight}px;
          transform: scale(0.98) rotate(-1deg);
          opacity: 1;
          border-radius: 16px;
        `
      }, 200)

      // Perfect alignment phase
      setTimeout(() => {
        const finalTargetRect = targetImageContainer.getBoundingClientRect()

        floatingImage.style.cssText += `
          left: ${finalTargetRect.left}px;
          top: ${finalTargetRect.top}px;
          width: ${finalTargetRect.width}px;
          height: ${finalTargetRect.height}px;
          transform: scale(1) rotate(0deg);
          opacity: 1;
          border-radius: 12px;
        `
      }, 2000)

      // Fade out and cleanup
      setTimeout(() => {
        floatingImage.style.opacity = "0"
        floatingImage.style.transform = "scale(1.02)"
      }, 2300)

      // Final cleanup and restore original image
      setTimeout(() => {
        if (document.body.contains(floatingImage)) {
          document.body.removeChild(floatingImage)
        }
        productImageElement.style.opacity = "1"
      }, 2800)

      // Highlight the target product briefly
      setTimeout(() => {
        const targetCard = targetElement.closest(".group")
        if (targetCard) {
          const cardElement = targetCard as HTMLElement
          cardElement.style.transform = "translateY(-8px) scale(1.02)"
          cardElement.style.boxShadow = "0 25px 50px rgba(197, 61, 57, 0.15)"
          cardElement.style.transition = "all 0.5s ease"

          setTimeout(() => {
            cardElement.style.transform = ""
            cardElement.style.boxShadow = ""
          }, 1000)
        }
      }, 2400)
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [currentSlide, hasAnimated])

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % featuredProducts.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + featuredProducts.length) % featuredProducts.length)
  }

  const goToSlide = (index: number) => {
    setCurrentSlide(index)
  }

  const currentProduct = featuredProducts[currentSlide]

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen bg-gradient-to-br from-gray-50 via-white to-[#F1BA69]/5 overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-r from-[#C53D39]/10 to-[#F1BA69]/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-r from-[#F1BA69]/10 to-[#C53D39]/10 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="min-h-screen flex items-center">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center w-full">
            {/* Left content */}
            <div className="space-y-8">
              <div className="inline-block">
                <span className="bg-gradient-to-r from-[#C53D39] to-[#F1BA69] text-white px-6 py-3 rounded-full text-sm font-medium font-poppins tracking-wide">
                  {currentProduct.category.toUpperCase()}
                </span>
              </div>

              <div className="space-y-4">
                <h1 className="text-5xl lg:text-6xl font-bold leading-tight">
                  <span className="block text-gray-900">{currentProduct.name.split(" ")[0]}</span>
                  <span className="block bg-gradient-to-r from-[#C53D39] to-[#F1BA69] bg-clip-text text-transparent">
                    {currentProduct.name.split(" ").slice(1).join(" ")}
                  </span>
                </h1>

                <p className="text-xl text-gray-600 max-w-lg leading-relaxed">{currentProduct.description}</p>
              </div>

              <div className="flex items-baseline space-x-4">
                <span className="text-5xl font-bold text-[#C53D39]">${currentProduct.price.toFixed(2)}</span>
                {currentProduct.originalPrice && (
                  <span className="text-2xl text-gray-400 line-through">
                    ${currentProduct.originalPrice.toFixed(2)}
                  </span>
                )}
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="xl" className="group text-lg px-8 py-4">
                  <span className="font-poppins font-semibold">Shop Now</span>
                  <span className="group-hover:translate-x-1 transition-transform ml-2">→</span>
                </Button>
                <Button
                  variant="outline"
                  size="xl"
                  className="font-poppins font-semibold bg-transparent text-lg px-8 py-4"
                >
                  View Details
                </Button>
              </div>

              {/* Product indicators */}
              <div className="flex items-center space-x-4 pt-8">
                <div className="flex space-x-2">
                  {featuredProducts.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => goToSlide(index)}
                      className={`w-3 h-3 rounded-full transition-all duration-300 ${
                        index === currentSlide
                          ? "bg-gradient-to-r from-[#C53D39] to-[#F1BA69] w-8"
                          : "bg-gray-300 hover:bg-gray-400"
                      }`}
                    />
                  ))}
                </div>
                <div className="text-sm text-gray-500 font-poppins">
                  {currentSlide + 1} / {featuredProducts.length}
                </div>
              </div>
            </div>

            {/* Right content - Single Product Image with transparent background */}
            <div className="relative">
              <div className="relative w-full h-[600px] lg:h-[700px]">
                {/* Main product image with transparent background */}
                <div
                  ref={productImageRef}
                  className="relative w-full h-full rounded-3xl overflow-hidden transition-all duration-700 ease-out"
                  style={{ backgroundColor: "transparent" }}
                >
                  <Image
                    src={currentProduct.image || "/placeholder.svg"}
                    alt={currentProduct.name}
                    fill
                    className="object-contain transition-all duration-700 ease-out"
                    style={{ backgroundColor: "transparent" }}
                    priority
                  />
                </div>

                {/* Navigation arrows */}
                <button
                  onClick={prevSlide}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-all duration-300"
                  onMouseEnter={() => setIsAutoPlaying(false)}
                  onMouseLeave={() => setIsAutoPlaying(true)}
                >
                  <ChevronLeft className="h-6 w-6 text-[#C53D39]" />
                </button>
                <button
                  onClick={nextSlide}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-all duration-300"
                  onMouseEnter={() => setIsAutoPlaying(false)}
                  onMouseLeave={() => setIsAutoPlaying(true)}
                >
                  <ChevronRight className="h-6 w-6 text-[#C53D39]" />
                </button>

                {/* Floating elements */}
                <div className="absolute -top-6 -left-6 w-16 h-16 bg-gradient-to-r from-[#C53D39]/20 to-[#F1BA69]/20 rounded-full"></div>
                <div className="absolute -bottom-4 -right-4 w-12 h-12 bg-gradient-to-r from-[#F1BA69]/20 to-[#C53D39]/20 rounded-full"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-[#C53D39] rounded-full flex justify-center">
          <div className="w-1 h-3 bg-gradient-to-b from-[#C53D39] to-[#F1BA69] rounded-full mt-2"></div>
        </div>
      </div>
    </section>
  )
}
