"use client"

import { useState, useRef, useEffect } from "react"
import { ArrowRight } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

const allCategories = [
  {
    id: "dining-table",
    name: "Dining Table",
    image: "https://images.unsplash.com/photo-1449247709967-d4461a6a6103?w=400&h=300&fit=crop",
    count: "120+ Items",
    description: "Elegant dining tables for memorable family gatherings",
  },
  {
    id: "tea-trolley",
    name: "Tea Trolley",
    image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=300&fit=crop",
    count: "45+ Items",
    description: "Stylish tea trolleys for perfect hospitality",
  },
  {
    id: "center-tables",
    name: "Center Tables",
    image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&h=300&fit=crop",
    count: "85+ Items",
    description: "Beautiful center tables to complete your living room",
  },
  {
    id: "study-tables",
    name: "Study Tables",
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=400&h=300&fit=crop",
    count: "65+ Items",
    description: "Ergonomic study tables for productive work sessions",
  },
  {
    id: "beds",
    name: "Beds Collection",
    image: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=600&h=500&fit=crop",
    count: "150+ Items",
    description: "Premium beds for the perfect night's sleep",
  },
  {
    id: "work-stations",
    name: "Work Stations",
    image: "https://images.unsplash.com/photo-1541558869434-2840d308329a?w=400&h=300&fit=crop",
    count: "90+ Items",
    description: "Modern workstations for enhanced productivity",
  },
  {
    id: "office-tables",
    name: "Office Tables",
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=400&h=300&fit=crop",
    count: "110+ Items",
    description: "Professional office tables for business excellence",
  },
  {
    id: "office-chairs",
    name: "Office Chairs",
    image: "https://images.unsplash.com/photo-1541558869434-2840d308329a?w=400&h=300&fit=crop",
    count: "75+ Items",
    description: "Comfortable office chairs for all-day support",
  },
]

export function CategorySection() {
  const [isInView, setIsInView] = useState(false)
  const [featuredIndex, setFeaturedIndex] = useState(0)
  const [isChanging, setIsChanging] = useState(false)
  const sectionRef = useRef<HTMLDivElement>(null)
  const scrollContainerRef = useRef<HTMLDivElement>(null)

  // Auto-rotate featured category
  useEffect(() => {
    const interval = setInterval(() => {
      setIsChanging(true)
      setTimeout(() => {
        setFeaturedIndex((prev) => (prev + 1) % allCategories.length)
        setIsChanging(false)
      }, 300)
    }, 4000) // Change every 4 seconds

    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true)
        }
      },
      { threshold: 0.2 },
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  const CategoryCard = ({ category, index, delay = 0 }: { category: any; index: number; delay?: number }) => (
    <Link
      href={`/category/${category.id}`}
      className={`group relative overflow-hidden rounded-2xl bg-white shadow-lg hover:shadow-2xl transition-all duration-700 transform hover:-translate-y-3 border border-gray-100 ${
        isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
      }`}
      style={{
        transitionDelay: `${delay + index * 150}ms`,
      }}
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={category.image || "/placeholder.svg"}
          alt={category.name}
          fill
          className="object-cover transition-all duration-700 group-hover:scale-110"
        />

        {/* Futuristic overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-300"></div>

        {/* Glowing border effect */}
        <div className="absolute inset-0 border-2 border-transparent group-hover:border-[#C53D39]/30 rounded-2xl transition-all duration-300"></div>

        {/* Hover glow effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#C53D39]/0 to-[#F1BA69]/0 group-hover:from-[#C53D39]/10 group-hover:to-[#F1BA69]/10 transition-all duration-300"></div>

        {/* Animated particles */}
        <div className="absolute top-4 right-4 w-2 h-2 bg-[#F1BA69] rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 animate-pulse"></div>
        <div className="absolute bottom-6 left-6 w-1 h-1 bg-[#C53D39] rounded-full opacity-0 group-hover:opacity-80 transition-all duration-500 animate-pulse delay-200"></div>
      </div>

      {/* Content */}
      <div className="absolute bottom-0 left-0 right-0 p-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-white font-bold text-lg font-poppins mb-1 group-hover:text-[#F1BA69] transition-colors duration-300">
              {category.name}
            </h3>
            <p className="text-white/80 text-sm">{category.count}</p>
          </div>
          <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center group-hover:bg-gradient-to-r group-hover:from-[#C53D39] group-hover:to-[#F1BA69] transition-all duration-300">
            <ArrowRight className="h-5 w-5 text-white group-hover:translate-x-1 transition-transform duration-300" />
          </div>
        </div>
      </div>

      {/* Futuristic corner accents */}
      <div className="absolute top-4 right-4 w-8 h-8 border-t-2 border-r-2 border-white/30 group-hover:border-[#F1BA69] transition-colors duration-300"></div>
      <div className="absolute bottom-4 left-4 w-8 h-8 border-b-2 border-l-2 border-white/30 group-hover:border-[#F1BA69] transition-colors duration-300"></div>
    </Link>
  )

  const featuredCategory = allCategories[featuredIndex]

  return (
    <section
      ref={sectionRef}
      className="py-20 bg-gradient-to-br from-gray-50 via-white to-[#F1BA69]/5 relative overflow-hidden"
    >
      {/* Futuristic background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-10 left-20 w-64 h-64 bg-gradient-to-r from-[#C53D39]/5 to-[#F1BA69]/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-20 w-80 h-80 bg-gradient-to-r from-[#F1BA69]/5 to-[#C53D39]/5 rounded-full blur-3xl"></div>

        {/* Grid pattern overlay */}
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, #C53D39 1px, transparent 0)`,
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
            Shop by{" "}
            <span className="bg-gradient-to-r from-[#C53D39] to-[#F1BA69] bg-clip-text text-transparent">Category</span>
          </h2>
          <div className="w-32 h-1 bg-gradient-to-r from-[#C53D39] to-[#F1BA69] mx-auto rounded-full mb-6"></div>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
            Discover our comprehensive furniture collection organized by category for your perfect home setup
          </p>
        </div>

        {/* Categories Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 max-w-7xl mx-auto">
          {/* Left Side - Scrollable Categories Container */}
          <div className="lg:col-span-2 space-y-6">
            <h3
              className={`text-2xl md:text-3xl font-bold text-gray-900 font-poppins mb-8 transition-all duration-1000 delay-200 ${
                isInView ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"
              }`}
            >
              Browse All Categories
            </h3>

            {/* Scrollable Container - Exactly 4 categories visible (2x2) */}
            <div
              ref={scrollContainerRef}
              className={`h-[520px] overflow-y-scroll scrollbar-hide transition-all duration-300 ${
                isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
              style={{
                transitionDelay: "400ms",
                scrollbarWidth: "none" /* Firefox */,
                msOverflowStyle: "none" /* Internet Explorer 10+ */,
              }}
            >
              {/* Categories Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pr-2">
                {allCategories.map((category, index) => (
                  <CategoryCard key={category.id} category={category} index={index} delay={300} />
                ))}
              </div>

              {/* End of categories indicator */}
              <div className="text-center py-8 border-t border-gray-200 mt-6">
                <div className="flex items-center justify-center space-x-2 text-sm text-gray-500">
                  <div className="w-2 h-2 bg-gradient-to-r from-[#C53D39] to-[#F1BA69] rounded-full"></div>
                  <span className="font-poppins">You've reached the end of categories</span>
                  <div className="w-2 h-2 bg-gradient-to-r from-[#C53D39] to-[#F1BA69] rounded-full"></div>
                </div>
              </div>
            </div>

            {/* Scroll hint */}
            <div
              className={`text-center transition-all duration-1000 delay-600 ${
                isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
            >
              <div className="flex items-center justify-center space-x-2 text-sm text-gray-500">
                <div className="w-1 h-6 bg-gradient-to-b from-[#C53D39] to-[#F1BA69] rounded-full animate-pulse"></div>
                <span className="font-poppins">Scroll to explore more categories</span>
              </div>
            </div>
          </div>

          {/* Right Side - Sticky Featured Category */}
          <div className="lg:col-span-1">
            <div className="sticky top-8">
              <h3
                className={`text-2xl md:text-3xl font-bold text-gray-900 font-poppins mb-8 transition-all duration-1000 delay-400 ${
                  isInView ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"
                }`}
              >
                Featured Category
              </h3>

              <Link
                href={`/category/${featuredCategory.id}`}
                className={`group relative overflow-hidden rounded-3xl bg-white shadow-2xl hover:shadow-3xl transition-all duration-700 transform hover:-translate-y-4 border border-gray-100 block ${
                  isInView ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-12 scale-95"
                } ${isChanging ? "scale-95 opacity-80" : "scale-100 opacity-100"}`}
                style={{
                  transitionDelay: "600ms",
                  height: "520px", // Match the scrollable container height
                }}
              >
                <div className="relative h-full overflow-hidden">
                  <Image
                    src={featuredCategory.image || "/placeholder.svg"}
                    alt={featuredCategory.name}
                    fill
                    className={`object-cover transition-all duration-1000 group-hover:scale-105 ${
                      isChanging ? "scale-110 blur-sm" : "scale-100 blur-0"
                    }`}
                  />

                  {/* Premium overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-70 group-hover:opacity-50 transition-opacity duration-500"></div>

                  {/* Animated border */}
                  <div className="absolute inset-0 border-4 border-transparent group-hover:border-gradient-to-r group-hover:from-[#C53D39] group-hover:to-[#F1BA69] rounded-3xl transition-all duration-500"></div>

                  {/* Glowing effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-[#C53D39]/0 to-[#F1BA69]/0 group-hover:from-[#C53D39]/20 group-hover:to-[#F1BA69]/20 transition-all duration-500"></div>

                  {/* Featured badge */}
                  <div className="absolute top-6 left-6">
                    <span className="bg-gradient-to-r from-[#C53D39] to-[#F1BA69] text-white px-4 py-2 rounded-full text-xs font-bold tracking-wide animate-pulse">
                      FEATURED
                    </span>
                  </div>

                  {/* Auto-rotation indicator */}
                  <div className="absolute top-6 right-6 flex space-x-1">
                    {allCategories.map((_, index) => (
                      <div
                        key={index}
                        className={`w-2 h-2 rounded-full transition-all duration-300 ${
                          index === featuredIndex ? "bg-[#F1BA69] w-6" : "bg-white/40"
                        }`}
                      />
                    ))}
                  </div>

                  {/* Floating particles */}
                  <div className="absolute top-1/4 right-8 w-3 h-3 bg-[#F1BA69] rounded-full opacity-60 group-hover:opacity-100 transition-all duration-300 animate-bounce"></div>
                  <div className="absolute top-1/2 right-12 w-2 h-2 bg-[#C53D39] rounded-full opacity-40 group-hover:opacity-80 transition-all duration-500 animate-bounce delay-300"></div>
                  <div className="absolute top-3/4 right-6 w-1 h-1 bg-white rounded-full opacity-60 group-hover:opacity-100 transition-all duration-400 animate-pulse"></div>

                  {/* Sticky indicator */}
                  <div className="absolute top-1/2 left-6 transform -translate-y-1/2">
                    <div className="flex flex-col items-center space-y-2 opacity-60 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="w-1 h-8 bg-white/60 rounded-full"></div>
                      <div className="w-2 h-2 bg-[#F1BA69] rounded-full animate-pulse"></div>
                      <div className="w-1 h-8 bg-white/60 rounded-full"></div>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="absolute bottom-0 left-0 right-0 p-8">
                  <div className="space-y-4">
                    <div>
                      <h3
                        className={`text-white font-bold text-2xl md:text-3xl font-poppins mb-2 group-hover:text-[#F1BA69] transition-all duration-300 ${
                          isChanging ? "translate-y-4 opacity-0" : "translate-y-0 opacity-100"
                        }`}
                      >
                        {featuredCategory.name}
                      </h3>
                      <p
                        className={`text-white/90 text-sm mb-2 transition-all duration-300 delay-100 ${
                          isChanging ? "translate-y-4 opacity-0" : "translate-y-0 opacity-100"
                        }`}
                      >
                        {featuredCategory.count}
                      </p>
                      <p
                        className={`text-white/80 text-sm leading-relaxed transition-all duration-300 delay-200 ${
                          isChanging ? "translate-y-4 opacity-0" : "translate-y-0 opacity-100"
                        }`}
                      >
                        {featuredCategory.description}
                      </p>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-[#F1BA69] font-semibold text-sm">Explore Collection</span>
                      <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center group-hover:bg-gradient-to-r group-hover:from-[#C53D39] group-hover:to-[#F1BA69] transition-all duration-300">
                        <ArrowRight className="h-6 w-6 text-white group-hover:translate-x-1 transition-transform duration-300" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Futuristic corner elements */}
                <div className="absolute top-6 right-6 w-12 h-12 border-t-2 border-r-2 border-white/40 group-hover:border-[#F1BA69] transition-colors duration-300"></div>
                <div className="absolute bottom-8 left-8 w-12 h-12 border-b-2 border-l-2 border-white/40 group-hover:border-[#F1BA69] transition-colors duration-300"></div>
              </Link>

              {/* Auto-rotation info */}
              <div
                className={`text-center mt-6 transition-all duration-1000 delay-1000 ${
                  isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                }`}
              >
                <div className="flex items-center justify-center space-x-2 text-sm text-gray-500">
                  <div className="w-2 h-2 bg-gradient-to-r from-[#C53D39] to-[#F1BA69] rounded-full animate-pulse"></div>
                  <span className="font-poppins">Sticky • Auto-rotating every 4 seconds</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Hide scrollbars completely */}
      <style jsx global>{`
        .scrollbar-hide {
          -ms-overflow-style: none;  /* Internet Explorer 10+ */
          scrollbar-width: none;  /* Firefox */
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;  /* Safari and Chrome */
        }
      `}</style>
    </section>
  )
}
