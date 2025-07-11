"use client"

import { useState, useRef, useEffect } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

const clients = [
  {
    id: 1,
    name: "IKEA",
    logo: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=200&h=100&fit=crop&q=80",
  },
  {
    id: 2,
    name: "West Elm",
    logo: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=200&h=100&fit=crop&q=80",
  },
  {
    id: 3,
    name: "CB2",
    logo: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=200&h=100&fit=crop&q=80",
  },
  {
    id: 4,
    name: "Pottery Barn",
    logo: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=200&h=100&fit=crop&q=80",
  },
  {
    id: 5,
    name: "Crate & Barrel",
    logo: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=200&h=100&fit=crop&q=80",
  },
  {
    id: 6,
    name: "Room & Board",
    logo: "https://images.unsplash.com/photo-1449247709967-d4461a6a6103?w=200&h=100&fit=crop&q=80",
  },
  {
    id: 7,
    name: "Article",
    logo: "https://images.unsplash.com/photo-1541558869434-2840d308329a?w=200&h=100&fit=crop&q=80",
  },
  {
    id: 8,
    name: "Wayfair",
    logo: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=200&h=100&fit=crop&q=80",
  },
  {
    id: 9,
    name: "Target",
    logo: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=200&h=100&fit=crop&q=80",
  },
  {
    id: 10,
    name: "HomeGoods",
    logo: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=200&h=100&fit=crop&q=80",
  },
  {
    id: 11,
    name: "Ashley",
    logo: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=200&h=100&fit=crop&q=80",
  },
  {
    id: 12,
    name: "La-Z-Boy",
    logo: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=200&h=100&fit=crop&q=80",
  },
]

export function OurClients() {
  const [isInView, setIsInView] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  const sectionRef = useRef<HTMLDivElement>(null)

  // Number of clients to show per view (responsive)
  const getClientsPerView = () => {
    if (typeof window === "undefined") return 6
    if (window.innerWidth < 640) return 2
    if (window.innerWidth < 768) return 3
    if (window.innerWidth < 1024) return 4
    return 6
  }

  const [clientsPerView, setClientsPerView] = useState(6)

  useEffect(() => {
    const handleResize = () => {
      setClientsPerView(getClientsPerView())
    }

    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  const maxIndex = Math.max(0, clients.length - clientsPerView)

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying) return

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1))
    }, 3000)

    return () => clearInterval(interval)
  }, [isAutoPlaying, maxIndex])

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting)
      },
      {
        threshold: 0.2,
        rootMargin: "0px 0px -10% 0px",
      },
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1))
  }

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1))
  }

  return (
    <section
      ref={sectionRef}
      className="py-8 bg-gradient-to-br from-gray-50 via-white to-[#F1BA69]/5 relative overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-64 h-64 bg-gradient-to-r from-[#C53D39]/5 to-[#F1BA69]/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-80 h-80 bg-gradient-to-r from-[#F1BA69]/5 to-[#C53D39]/5 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div
          className={`text-center mb-16 transition-all duration-1000 ${
            isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Our{" "}
            <span className="bg-gradient-to-r from-[#C53D39] to-[#F1BA69] bg-clip-text text-transparent">Clients</span>
          </h2>
          <div className="w-32 h-1 bg-gradient-to-r from-[#C53D39] to-[#F1BA69] mx-auto rounded-full mb-6"></div>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
            Trusted by leading furniture brands and retailers worldwide
          </p>
        </div>

        {/* Clients Carousel */}
        <div className="relative max-w-6xl mx-auto">
          {/* Navigation Buttons */}
          <Button
            variant="outline"
            size="icon"
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-white/90 backdrop-blur-sm border-2 border-gray-200 hover:border-[#C53D39] hover:bg-white shadow-lg"
            onClick={prevSlide}
            onMouseEnter={() => setIsAutoPlaying(false)}
            onMouseLeave={() => setIsAutoPlaying(true)}
          >
            <ChevronLeft className="h-6 w-6" />
          </Button>

          <Button
            variant="outline"
            size="icon"
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-white/90 backdrop-blur-sm border-2 border-gray-200 hover:border-[#C53D39] hover:bg-white shadow-lg"
            onClick={nextSlide}
            onMouseEnter={() => setIsAutoPlaying(false)}
            onMouseLeave={() => setIsAutoPlaying(true)}
          >
            <ChevronRight className="h-6 w-6" />
          </Button>

          {/* Clients Container */}
          <div className="overflow-hidden mx-12">
            <div
              className="flex transition-transform duration-500 ease-out"
              style={{
                transform: `translateX(-${currentIndex * (100 / clientsPerView)}%)`,
              }}
            >
              {clients.map((client) => (
                <div key={client.id} className="flex-shrink-0 px-4" style={{ width: `${100 / clientsPerView}%` }}>
                  <div
                    className={`group relative h-24 bg-white rounded-2xl border border-gray-100 overflow-hidden transition-all duration-500 hover:shadow-xl hover:border-[#C53D39]/30 hover:-translate-y-2 ${
                      isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                    }`}
                  >
                    <Image
                      src={client.logo || "/placeholder.svg"}
                      alt={client.name}
                      fill
                      className="object-contain p-6 filter grayscale group-hover:grayscale-0 transition-all duration-500 group-hover:scale-110"
                    />

                    {/* Hover overlay */}
                    <div className="absolute inset-0 bg-gradient-to-r from-[#C53D39]/0 to-[#F1BA69]/0 group-hover:from-[#C53D39]/5 group-hover:to-[#F1BA69]/5 transition-all duration-500"></div>

                    {/* Client name tooltip */}
                    <div className="absolute -bottom-10 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white px-3 py-1 rounded-lg text-sm opacity-0 group-hover:opacity-100 transition-all duration-300 whitespace-nowrap">
                      {client.name}
                      <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-gray-900 rotate-45"></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center space-x-2 mt-8">
            {Array.from({ length: maxIndex + 1 }).map((_, index) => (
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

          {/* Auto-play indicator */}
          <div className="text-center mt-4">
            <div className="inline-flex items-center space-x-2 text-sm text-gray-500">
              <div
                className={`w-2 h-2 rounded-full transition-all duration-300 ${isAutoPlaying ? "bg-green-500 animate-pulse" : "bg-gray-400"}`}
              ></div>
              <span>{isAutoPlaying ? "Auto-playing" : "Paused"}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
