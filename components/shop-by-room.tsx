"use client"

import { useState, useRef, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

interface Room {
  id: string
  name: string
  image: string
  isLarge?: boolean
}

const rooms: Room[] = [
  {
    id: "study-room",
    name: "Study Room",
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&h=800&fit=crop",
    isLarge: true,
  },
  {
    id: "gaming-room",
    name: "Gaming Room",
    image: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=400&fit=crop",
    isLarge: false,
  },
  {
    id: "bed-room",
    name: "Bed Room",
    image: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=400&h=400&fit=crop",
    isLarge: false,
  },
  {
    id: "home-decor",
    name: "Home Decor",
    image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=400&fit=crop",
    isLarge: false,
  },
  {
    id: "living-room",
    name: "Living Room",
    image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&h=400&fit=crop",
    isLarge: false,
  },
]

export function ShopByRoom() {
  const [isInView, setIsInView] = useState(false)
  const [hoveredCard, setHoveredCard] = useState<string | null>(null)
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
    <section ref={sectionRef} className="py-8 bg-white relative overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div
          className={`text-center mb-16 transition-all duration-1000 ${
            isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Shop by{" "}
            <span className="bg-gradient-to-r from-[#C53D39] to-[#F1BA69] bg-clip-text text-transparent">Room</span>
          </h2>
          <div className="w-32 h-1 bg-gradient-to-r from-[#C53D39] to-[#F1BA69] mx-auto rounded-full mb-6"></div>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
            Find the perfect furniture for every space in your home
          </p>
        </div>

        {/* Rooms Grid - Exact Reference Layout */}
        <div className="max-w-6xl mx-auto">
          <div className="flex gap-4 h-[600px]">
            {/* Large Left Card */}
            <div className="flex-1">
              <Link
                href={`/room/${rooms[0].id}`}
                className="group relative block w-full h-full bg-gray-50 rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-lg"
                onMouseEnter={() => setHoveredCard(rooms[0].id)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                {/* Image */}
                <div className="relative w-full h-full">
                  <Image
                    src={rooms[0].image || "/placeholder.svg"}
                    alt={rooms[0].name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>

                {/* Arrow Button - Top Right on Hover */}
                <div
                  className={`absolute top-4 right-4 w-10 h-10 bg-gradient-to-r from-[#C53D39] to-[#F1BA69] rounded-full flex items-center justify-center shadow-lg transition-all duration-300 ${
                    hoveredCard === rooms[0].id ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2"
                  }`}
                >
                  <ArrowRight className="h-5 w-5 text-white" />
                </div>

                {/* Category Label */}
                <div className="absolute bottom-6 left-6">
                  <div className="bg-white px-6 py-3 rounded-lg shadow-sm">
                    <span className="text-gray-900 font-medium text-lg">{rooms[0].name}</span>
                  </div>
                </div>
              </Link>
            </div>

            {/* Right Side - 2x2 Grid */}
            <div className="flex-1">
              <div className="grid grid-cols-2 gap-4 h-full">
                {rooms.slice(1, 5).map((room) => (
                  <Link
                    key={room.id}
                    href={`/room/${room.id}`}
                    className="group relative block w-full h-full bg-gray-50 rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-lg"
                    onMouseEnter={() => setHoveredCard(room.id)}
                    onMouseLeave={() => setHoveredCard(null)}
                  >
                    {/* Image */}
                    <div className="relative w-full h-full">
                      <Image
                        src={room.image || "/placeholder.svg"}
                        alt={room.name}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>

                    {/* Arrow Button - Top Right on Hover */}
                    <div
                      className={`absolute top-3 right-3 w-8 h-8 bg-gradient-to-r from-[#C53D39] to-[#F1BA69] rounded-full flex items-center justify-center shadow-lg transition-all duration-300 ${
                        hoveredCard === room.id ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2"
                      }`}
                    >
                      <ArrowRight className="h-4 w-4 text-white" />
                    </div>

                    {/* Category Label */}
                    <div className="absolute bottom-4 left-4">
                      <div className="bg-white px-4 py-2 rounded-lg shadow-sm">
                        <span className="text-gray-900 font-medium text-sm">{room.name}</span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Additional Rooms - Second Row */}
        <div className="max-w-6xl mx-auto mt-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              {
                id: "dining-room",
                name: "Dining Room",
                image: "https://images.unsplash.com/photo-1449247709967-d4461a6a6103?w=400&h=300&fit=crop",
              },
              {
                id: "office",
                name: "Office",
                image: "https://images.unsplash.com/photo-1541558869434-2840d308329a?w=400&h=300&fit=crop",
              },
              {
                id: "kitchen",
                name: "Kitchen",
                image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=300&fit=crop",
              },
            ].map((room) => (
              <Link
                key={room.id}
                href={`/room/${room.id}`}
                className="group relative block w-full h-64 bg-gray-50 rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-lg"
                onMouseEnter={() => setHoveredCard(room.id)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                {/* Image */}
                <div className="relative w-full h-full">
                  <Image
                    src={room.image || "/placeholder.svg"}
                    alt={room.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>

                {/* Arrow Button - Top Right on Hover */}
                <div
                  className={`absolute top-4 right-4 w-10 h-10 bg-gradient-to-r from-[#C53D39] to-[#F1BA69] rounded-full flex items-center justify-center shadow-lg transition-all duration-300 ${
                    hoveredCard === room.id ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2"
                  }`}
                >
                  <ArrowRight className="h-5 w-5 text-white" />
                </div>

                {/* Category Label */}
                <div className="absolute bottom-4 left-4">
                  <div className="bg-white px-4 py-2 rounded-lg shadow-sm">
                    <span className="text-gray-900 font-medium text-base">{room.name}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
