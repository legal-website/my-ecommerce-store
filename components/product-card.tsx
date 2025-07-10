"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { useCart } from "@/hooks/use-cart"
import { Heart, Eye, ShoppingBag, Star, BarChart3 } from "lucide-react"
import Image from "next/image"
import { useState } from "react"

interface Product {
  id: string
  name: string
  price: number
  originalPrice?: number
  image: string
  hoverImage?: string
  description: string
  rating?: number
  isOnSale?: boolean
  isSoldOut?: boolean
  discount?: number
}

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart()
  const [isHovered, setIsHovered] = useState(false)
  const [isWishlisted, setIsWishlisted] = useState(false)

  return (
    <Card
      className={`group relative overflow-hidden bg-white transition-all duration-300 transform hover:-translate-y-1 ${
        isHovered ? "border-[#C53D39]/50 border-[0.5px]" : "border-gray-200 border"
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      id={`product-${product.id}`}
    >
      {/* Image container */}
      <div className="relative aspect-square overflow-hidden bg-gray-50">
        <Image
          src={isHovered && product.hoverImage ? product.hoverImage : product.image}
          alt={product.name}
          fill
          className="object-cover transition-all duration-500 group-hover:scale-105"
        />

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col space-y-2">
          {product.isSoldOut && (
            <span className="bg-gray-800 text-white px-3 py-1 text-xs font-medium rounded-full">Sold Out</span>
          )}
          {product.isOnSale && product.discount && (
            <span className="bg-gradient-to-r from-[#C53D39] to-[#F1BA69] text-white px-3 py-1 text-xs font-medium rounded-full">
              -{product.discount}%
            </span>
          )}
        </div>

        {/* Wishlist button */}
        <button
          onClick={() => setIsWishlisted(!isWishlisted)}
          className={`absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${
            isWishlisted ? "bg-[#C53D39] text-white" : "bg-white/90 text-gray-600 hover:bg-[#C53D39] hover:text-white"
          }`}
        >
          <Heart className={`h-4 w-4 ${isWishlisted ? "fill-current" : ""}`} />
        </button>

        {/* Quick action buttons - appear on hover */}
        <div
          className={`absolute inset-x-3 bottom-3 flex flex-col space-y-2 transition-all duration-300 ${
            isHovered ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          <Button
            variant="secondary"
            size="sm"
            className="w-full bg-white/95 hover:bg-white text-gray-900 text-xs py-2 h-8"
          >
            <Eye className="h-3 w-3 mr-1" />
            Quick View
          </Button>
          <Button
            onClick={() => addToCart(product)}
            size="sm"
            className="w-full text-xs py-2 h-8"
            disabled={product.isSoldOut}
          >
            <ShoppingBag className="h-3 w-3 mr-1" />
            {product.isSoldOut ? "Sold Out" : "Quick Shop"}
          </Button>
        </div>

        {/* Compare button - bottom right corner */}
        <button
          className={`absolute bottom-3 right-3 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${
            isHovered ? "opacity-100 bg-white/90 hover:bg-[#C53D39] hover:text-white" : "opacity-0"
          } text-gray-600`}
        >
          <BarChart3 className="h-4 w-4" />
        </button>
      </div>

      {/* Product info */}
      <div className="p-4 space-y-2">
        <div className="space-y-1">
          <h3 className="font-medium text-gray-900 text-sm leading-tight">{product.name}</h3>
        </div>

        {/* Rating */}
        {product.rating && (
          <div className="flex items-center space-x-1">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`h-3 w-3 ${i < product.rating! ? "text-yellow-400 fill-current" : "text-gray-300"}`}
              />
            ))}
            <span className="text-xs text-gray-500 ml-1">({product.rating})</span>
          </div>
        )}

        {/* Price */}
        <div className="flex items-center space-x-2">
          <span className="text-lg font-bold text-gray-900">${product.price.toFixed(2)}</span>
          {product.originalPrice && (
            <span className="text-sm text-gray-500 line-through">${product.originalPrice.toFixed(2)}</span>
          )}
        </div>
      </div>
    </Card>
  )
}
