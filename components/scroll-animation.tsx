"use client"

import type React from "react"

import { useEffect, useState } from "react"

interface ScrollAnimationProps {
  children: React.ReactNode
  productId?: string
}

export function ScrollAnimation({ children, productId }: ScrollAnimationProps) {
  const [scrollY, setScrollY] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    // Listen for product scroll animation trigger
    const handleProductScroll = (event: CustomEvent) => {
      if (event.detail.productId === productId) {
        setIsAnimating(true)

        // Scroll to the product listing position
        const productElement = document.getElementById(`product-${productId}`)
        if (productElement) {
          setTimeout(() => {
            productElement.scrollIntoView({
              behavior: "smooth",
              block: "center",
            })
          }, 500)
        }

        // Reset animation after completion
        setTimeout(() => {
          setIsAnimating(false)
        }, 2000)
      }
    }

    window.addEventListener("productScroll", handleProductScroll as EventListener)
    return () => window.removeEventListener("productScroll", handleProductScroll as EventListener)
  }, [productId])

  return (
    <div
      className={`transition-all duration-1000 ease-out ${
        isAnimating ? "motion-blur active transform scale-95 opacity-50" : ""
      }`}
      style={{
        transform: isAnimating ? `translateY(${scrollY * 0.5}px) scale(0.8)` : `translateY(${scrollY * 0.1}px)`,
      }}
    >
      {children}
    </div>
  )
}
