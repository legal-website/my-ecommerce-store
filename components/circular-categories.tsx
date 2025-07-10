"use client"

import { useState, useRef, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"

const categories = [
  {
    id: "beds",
    name: "Beds",
    image: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=200&h=200&fit=crop",
    count: "150+ Items",
  },
  {
    id: "dining-table",
    name: "Dining Table",
    image: "https://images.unsplash.com/photo-1449247709967-d4461a6a6103?w=200&h=200&fit=crop",
    count: "120+ Items",
  },
  {
    id: "tea-trolley",
    name: "Tea Trolley",
    image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=200&h=200&fit=crop",
    count: "45+ Items",
  },
  {
    id: "center-tables",
    name: "Center Tables",
    image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=200&h=200&fit=crop",
    count: "85+ Items",
  },
  {
    id: "study-tables",
    name: "Study Tables",
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=200&h=200&fit=crop",
    count: "65+ Items",
  },
  {
    id: "work-stations",
    name: "Work Stations",
    image: "https://images.unsplash.com/photo-1541558869434-2840d308329a?w=200&h=200&fit=crop",
    count: "90+ Items",
  },
  {
    id: "office-tables",
    name: "Office Tables",
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=200&h=200&fit=crop",
    count: "110+ Items",
  },
  {
    id: "office-decor",
    name: "Office Decor",
    image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=200&h=200&fit=crop",
    count: "75+ Items",
  },
]

export function CircularCategories() {
  const [isInView, setIsInView] = useState(false)
  const [hasAnimated, setHasAnimated] = useState(false)
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setIsInView(true)
          setHasAnimated(true)
        }
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
  }, [hasAnimated])

  const CategoryCircle = ({ category, index }: { category: any; index: number }) => {
    const [isHovered, setIsHovered] = useState(false)

    return (
      <Link
        href={`/category/${category.id}`}
        className={`group flex flex-col items-center space-y-3 transition-all duration-700 ${
          isInView ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-12 scale-95"
        }`}
        style={{
          transitionDelay: `${index * 150}ms`,
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Circular Image Container */}
        <div className="relative">
          {/* Progress Bar Border - Circular Fill Animation */}
          <div
            className={`absolute inset-0 rounded-full transition-opacity duration-300 ${
              isHovered ? "opacity-100" : "opacity-0"
            }`}
            style={{
              background: `conic-gradient(from 0deg, #F97316 0deg, #F97316 ${isHovered ? "360deg" : "0deg"}, transparent ${isHovered ? "360deg" : "0deg"})`,
              padding: "3px",
              transition: isHovered
                ? "background 2s ease-out, opacity 0.3s ease"
                : "background 0.3s ease, opacity 0.3s ease",
            }}
          >
            <div className="w-full h-full bg-white rounded-full"></div>
          </div>

          {/* Main Circle */}
          <div
            className={`relative w-32 h-32 md:w-36 md:h-36 lg:w-40 lg:h-40 rounded-full overflow-hidden bg-gray-100 transition-all duration-300 transform group-hover:scale-105 ${
              isHovered ? "shadow-lg" : "shadow-sm"
            }`}
            style={{
              filter: isHovered ? "drop-shadow(0 10px 25px rgba(249, 115, 22, 0.15))" : "none",
            }}
          >
            <Image
              src={category.image || "/placeholder.svg"}
              alt={category.name}
              fill
              className="object-cover transition-all duration-500 group-hover:scale-110"
            />

            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

            {/* Hover Effect Glow */}
            <div
              className={`absolute inset-0 rounded-full transition-all duration-300 ${
                isHovered ? "bg-gradient-to-r from-orange-500/10 to-orange-600/10" : ""
              }`}
            ></div>
          </div>
        </div>

        {/* Category Name */}
        <div className="text-center">
          <h3 className="font-semibold text-gray-900 text-sm md:text-base font-poppins group-hover:text-orange-600 transition-colors duration-300">
            {category.name}
          </h3>
          <p className="text-xs text-gray-500 mt-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            {category.count}
          </p>
        </div>
      </Link>
    )
  }

  return (
    <section
      ref={sectionRef}
      className={`py-20 bg-gradient-to-br from-white via-gray-50/50 to-[#F1BA69]/5 relative overflow-hidden transition-all duration-1000 ${
        isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-16"
      }`}
    >
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div
          className={`absolute top-20 left-20 w-64 h-64 bg-gradient-to-r from-[#C53D39]/5 to-[#F1BA69]/5 rounded-full blur-3xl transition-all duration-1000 ${
            isInView ? "opacity-100 scale-100" : "opacity-0 scale-75"
          }`}
          style={{ transitionDelay: "200ms" }}
        ></div>
        <div
          className={`absolute bottom-20 right-20 w-80 h-80 bg-gradient-to-r from-[#F1BA69]/5 to-[#C53D39]/5 rounded-full blur-3xl transition-all duration-1000 ${
            isInView ? "opacity-100 scale-100" : "opacity-0 scale-75"
          }`}
          style={{ transitionDelay: "400ms" }}
        ></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="flex items-center max-w-7xl mx-auto gap-16">
          {/* Left Side - Question (25% width) */}
          <div
            className={`w-1/4 space-y-6 transition-all duration-1000 ${
              isInView ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-12"
            }`}
            style={{ transitionDelay: "300ms" }}
          >
            <div className="space-y-4">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
                What are you{" "}
                <span className="bg-gradient-to-r from-[#C53D39] to-[#F1BA69] bg-clip-text text-transparent">
                  shopping
                </span>{" "}
                for today?
              </h2>
              <p className="text-base md:text-lg text-gray-600">
                Discover our premium furniture collection organized by category for your perfect home and office setup.
              </p>
            </div>

            {/* Decorative Elements */}
            <div
              className={`flex items-center space-x-4 pt-4 transition-all duration-700 ${
                isInView ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"
              }`}
              style={{ transitionDelay: "800ms" }}
            >
              <div className="w-12 h-1 bg-gradient-to-r from-[#C53D39] to-[#F1BA69] rounded-full"></div>
              <div className="w-6 h-1 bg-gradient-to-r from-[#F1BA69] to-[#C53D39] rounded-full"></div>
              <div className="w-3 h-1 bg-[#C53D39] rounded-full"></div>
            </div>
          </div>

          {/* Right Side - Categories Grid (75% width) */}
          <div
            className={`flex-1 transition-all duration-1000 ${
              isInView ? "opacity-100 translate-x-0" : "opacity-0 translate-x-12"
            }`}
            style={{ transitionDelay: "500ms" }}
          >
            {/* Custom grid with 15px spacing */}
            <div
              className="grid grid-cols-2 sm:grid-cols-4 justify-items-center"
              style={{
                gap: "15px", // 15px gap for both rows and columns
              }}
            >
              {categories.slice(0, 8).map((category, index) => (
                <CategoryCircle key={category.id} category={category} index={index} />
              ))}
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div
          className={`text-center mt-20 transition-all duration-1000 ${
            isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
          style={{ transitionDelay: "1200ms" }}
        >
          <div className="inline-flex items-center space-x-4 bg-gradient-to-r from-[#C53D39]/10 to-[#F1BA69]/10 px-8 py-4 rounded-full">
            <span className="text-gray-700 font-medium font-poppins">Explore our complete furniture collection</span>
            <div className="flex space-x-1">
              <div className="w-2 h-2 bg-[#C53D39] rounded-full animate-pulse"></div>
              <div className="w-2 h-2 bg-[#F1BA69] rounded-full animate-pulse delay-200"></div>
              <div className="w-2 h-2 bg-[#C53D39] rounded-full animate-pulse delay-400"></div>
            </div>
          </div>
        </div>
      </div>

      {/* CSS for smooth progress bar animation */}
      <style jsx global>{`
        .progress-border {
          background: conic-gradient(from 0deg, #F97316 var(--progress, 0deg), transparent var(--progress, 0deg));
          transition: --progress 2s ease-out;
        }
        
        .progress-border:hover {
          --progress: 360deg;
        }
      `}</style>
    </section>
  )
}
