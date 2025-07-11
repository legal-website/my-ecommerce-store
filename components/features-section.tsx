"use client"

import { useState, useRef, useEffect } from "react"
import { Truck, RotateCcw, Shield, Headphones } from "lucide-react"

const features = [
  {
    id: 1,
    icon: Truck,
    title: "Free Delivery",
    description: "Free Delivery on all Orders above 100,000 pkr in Lahore",
    color: "from-blue-500 to-cyan-500",
  },
  {
    id: 2,
    icon: RotateCcw,
    title: "7 Days Return",
    description: "If goods have problems",
    color: "from-green-500 to-emerald-500",
  },
  {
    id: 3,
    icon: Shield,
    title: "Secure Payment",
    description: "100% secure payment",
    color: "from-purple-500 to-pink-500",
  },
  {
    id: 4,
    icon: Headphones,
    title: "24/7 Support",
    description: "Dedicated support",
    color: "from-orange-500 to-red-500",
  },
]

export function FeaturesSection() {
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
    <section ref={sectionRef} className="py-8 bg-white relative overflow-hidden">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, #C53D39 1px, transparent 0)`,
            backgroundSize: "60px 60px",
          }}
        ></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {features.map((feature, index) => {
            const IconComponent = feature.icon
            return (
              <div
                key={feature.id}
                className={`group text-center transition-all duration-700 ${
                  isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                }`}
                style={{
                  transitionDelay: `${index * 150}ms`,
                }}
              >
                {/* Icon Container */}
                <div className="relative mb-4">
                  <div
                    className={`w-16 h-16 mx-auto rounded-2xl bg-gradient-to-r ${feature.color} flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110`}
                  >
                    <IconComponent className="h-8 w-8 text-white" />
                  </div>

                  {/* Floating background circle */}
                  <div
                    className={`absolute inset-0 w-16 h-16 mx-auto rounded-full bg-gradient-to-r ${feature.color} opacity-20 blur-xl group-hover:opacity-30 transition-opacity duration-300`}
                  ></div>
                </div>

                {/* Content */}
                <div className="space-y-2">
                  <h3 className="text-lg font-bold text-gray-900 group-hover:text-[#C53D39] transition-colors duration-300">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed max-w-xs mx-auto">{feature.description}</p>
                </div>

                {/* Hover indicator */}
                <div
                  className={`w-12 h-1 bg-gradient-to-r ${feature.color} mx-auto mt-3 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 transform scale-x-0 group-hover:scale-x-100`}
                ></div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
