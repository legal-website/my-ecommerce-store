"use client"

import { useState, useRef, useEffect } from "react"
import Image from "next/image"

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
]

export function OurClients() {
  const [isInView, setIsInView] = useState(false)
  const sectionRef = useRef<HTMLDivElement>(null)

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

  return (
    <section ref={sectionRef} className="py-20 bg-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, #C53D39 1px, transparent 0)`,
            backgroundSize: "40px 40px",
          }}
        ></div>
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

        {/* Clients Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-8 items-center max-w-6xl mx-auto">
          {clients.map((client, index) => (
            <div
              key={client.id}
              className={`group relative transition-all duration-700 ${
                isInView ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-8 scale-95"
              }`}
              style={{
                transitionDelay: `${index * 100}ms`,
              }}
            >
              <div className="relative h-16 w-full bg-gray-50 rounded-lg overflow-hidden border border-gray-100 group-hover:border-[#C53D39]/30 transition-all duration-300 group-hover:shadow-lg">
                <Image
                  src={client.logo || "/placeholder.svg"}
                  alt={client.name}
                  fill
                  className="object-contain p-4 filter grayscale group-hover:grayscale-0 transition-all duration-300 group-hover:scale-110"
                />

                {/* Hover overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-[#C53D39]/0 to-[#F1BA69]/0 group-hover:from-[#C53D39]/5 group-hover:to-[#F1BA69]/5 transition-all duration-300"></div>
              </div>

              {/* Client name tooltip */}
              <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white px-2 py-1 rounded text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
                {client.name}
              </div>
            </div>
          ))}
        </div>

        {/* Stats Section */}
        <div
          className={`grid grid-cols-1 md:grid-cols-4 gap-8 mt-20 transition-all duration-1000 delay-500 ${
            isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="text-center">
            <div className="text-4xl font-bold text-[#C53D39] mb-2">500+</div>
            <div className="text-gray-600">Happy Clients</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-[#C53D39] mb-2">50+</div>
            <div className="text-gray-600">Countries</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-[#C53D39] mb-2">1M+</div>
            <div className="text-gray-600">Products Sold</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-[#C53D39] mb-2">99%</div>
            <div className="text-gray-600">Satisfaction Rate</div>
          </div>
        </div>
      </div>
    </section>
  )
}
