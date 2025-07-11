"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { useCart } from "@/hooks/use-cart"
import { X, Heart, Star, ShoppingBag, RotateCcw, ZoomIn, ZoomOut, RotateCw, Play, Pause } from "lucide-react"
import Image from "next/image"

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

interface QuickViewModalProps {
  product: Product | null
  isOpen: boolean
  onClose: () => void
}

export function QuickViewModal({ product, isOpen, onClose }: QuickViewModalProps) {
  const { addToCart } = useCart()
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [viewMode, setViewMode] = useState<"normal" | "3d" | "360">("normal")
  const [rotationY, setRotationY] = useState(0)
  const [zoom, setZoom] = useState(1)
  const [isWishlisted, setIsWishlisted] = useState(false)
  const [is360Playing, setIs360Playing] = useState(false)
  const [rotation360, setRotation360] = useState(0)

  if (!isOpen || !product) return null

  // Mock additional product images for different views
  const productImages = [
    product.image,
    product.hoverImage || product.image,
    `${product.image}?angle=side`,
    `${product.image}?angle=back`,
    `${product.image}?angle=top`,
  ]

  // Mock 360 view images (in real app, these would be actual 360 product shots)
  const images360 = Array.from({ length: 36 }, (_, i) => `${product.image}?360=${i * 10}`)

  const handleRotate = () => {
    setRotationY((prev) => prev + 45)
  }

  const handleZoomIn = () => {
    setZoom((prev) => Math.min(prev + 0.2, 2))
  }

  const handleZoomOut = () => {
    setZoom((prev) => Math.max(prev - 0.2, 0.5))
  }

  const toggle360View = () => {
    setIs360Playing(!is360Playing)
    if (!is360Playing) {
      const interval = setInterval(() => {
        setRotation360((prev) => {
          const newRotation = (prev + 10) % 360
          if (newRotation === 0) {
            clearInterval(interval)
            setIs360Playing(false)
          }
          return newRotation
        })
      }, 100)
    }
  }

  const getCurrentImage = () => {
    if (viewMode === "360") {
      const imageIndex = Math.floor(rotation360 / 10)
      return images360[imageIndex] || product.image
    }
    return productImages[currentImageIndex] || product.image
  }

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-7xl max-h-[95vh] overflow-hidden">
        <CardContent className="p-0 h-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 h-full max-h-[95vh]">
            {/* Left Side - Product Images */}
            <div className="relative bg-gray-50 p-8 overflow-hidden">
              {/* Close Button */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 z-20 w-10 h-10 bg-white/90 hover:bg-white rounded-full flex items-center justify-center transition-all duration-300 shadow-lg"
              >
                <X className="h-5 w-5 text-gray-600" />
              </button>

              {/* View Mode Controls - More Prominent */}
              <div className="absolute top-4 left-4 z-20 bg-white/95 backdrop-blur-sm rounded-2xl p-3 shadow-lg border border-gray-200">
                <div className="flex flex-col space-y-3">
                  <div className="text-xs font-medium text-gray-600 text-center">VIEW MODES</div>

                  {/* Normal View */}
                  <button
                    onClick={() => setViewMode("normal")}
                    className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 ${
                      viewMode === "normal"
                        ? "bg-[#C53D39] text-white shadow-lg"
                        : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                    }`}
                    title="Normal View"
                  >
                    <div className="w-6 h-6 border-2 border-current rounded"></div>
                  </button>

                  {/* 3D View */}
                  <button
                    onClick={() => setViewMode("3d")}
                    className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 ${
                      viewMode === "3d"
                        ? "bg-[#C53D39] text-white shadow-lg"
                        : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                    }`}
                    title="3D View"
                  >
                    <RotateCcw className="h-5 w-5" />
                  </button>

                  {/* 360 View */}
                  <button
                    onClick={() => setViewMode("360")}
                    className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 ${
                      viewMode === "360"
                        ? "bg-[#C53D39] text-white shadow-lg"
                        : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                    }`}
                    title="360° View"
                  >
                    <RotateCw className="h-5 w-5" />
                  </button>
                </div>
              </div>

              {/* View-specific Controls */}
              {(viewMode === "3d" || viewMode === "360") && (
                <div className="absolute top-4 left-24 z-20 bg-white/95 backdrop-blur-sm rounded-2xl p-3 shadow-lg border border-gray-200">
                  <div className="flex flex-col space-y-2">
                    <div className="text-xs font-medium text-gray-600 text-center">CONTROLS</div>

                    {viewMode === "3d" && (
                      <>
                        <button
                          onClick={handleRotate}
                          className="w-10 h-10 bg-gray-100 hover:bg-gray-200 rounded-lg flex items-center justify-center transition-all duration-300"
                          title="Rotate"
                        >
                          <RotateCcw className="h-4 w-4 text-gray-600" />
                        </button>
                        <button
                          onClick={handleZoomIn}
                          className="w-10 h-10 bg-gray-100 hover:bg-gray-200 rounded-lg flex items-center justify-center transition-all duration-300"
                          title="Zoom In"
                        >
                          <ZoomIn className="h-4 w-4 text-gray-600" />
                        </button>
                        <button
                          onClick={handleZoomOut}
                          className="w-10 h-10 bg-gray-100 hover:bg-gray-200 rounded-lg flex items-center justify-center transition-all duration-300"
                          title="Zoom Out"
                        >
                          <ZoomOut className="h-4 w-4 text-gray-600" />
                        </button>
                      </>
                    )}

                    {viewMode === "360" && (
                      <button
                        onClick={toggle360View}
                        className={`w-10 h-10 rounded-lg flex items-center justify-center transition-all duration-300 ${
                          is360Playing ? "bg-red-100 hover:bg-red-200" : "bg-green-100 hover:bg-green-200"
                        }`}
                        title={is360Playing ? "Pause 360°" : "Play 360°"}
                      >
                        {is360Playing ? (
                          <Pause className="h-4 w-4 text-red-600" />
                        ) : (
                          <Play className="h-4 w-4 text-green-600" />
                        )}
                      </button>
                    )}
                  </div>
                </div>
              )}

              {/* Main Product Image */}
              <div className="relative h-96 lg:h-[500px] rounded-2xl overflow-hidden bg-white mt-16">
                <div
                  className="relative w-full h-full transition-all duration-700 ease-out"
                  style={{
                    transform:
                      viewMode === "3d"
                        ? `perspective(1000px) rotateY(${rotationY}deg) scale(${zoom})`
                        : viewMode === "360"
                          ? `rotateY(${rotation360}deg) scale(${zoom})`
                          : `scale(${zoom})`,
                    transformStyle: "preserve-3d",
                  }}
                >
                  <Image
                    src={getCurrentImage() || "/placeholder.svg"}
                    alt={product.name}
                    fill
                    className="object-cover transition-all duration-500"
                  />

                  {/* 3D Shadow Effect */}
                  {viewMode === "3d" && (
                    <div
                      className="absolute inset-0 bg-gradient-to-r from-black/10 to-transparent opacity-30"
                      style={{
                        transform: `translateZ(-1px) rotateY(180deg)`,
                      }}
                    />
                  )}

                  {/* 360 View Indicator */}
                  {viewMode === "360" && (
                    <div className="absolute bottom-4 left-4 bg-black/70 text-white px-3 py-1 rounded-full text-sm">
                      360° {Math.round(rotation360)}°
                    </div>
                  )}
                </div>
              </div>

              {/* Image Thumbnails - Only show in normal mode */}
              {viewMode === "normal" && (
                <div className="flex space-x-2 mt-4 justify-center">
                  {productImages.map((img, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`w-16 h-16 rounded-lg overflow-hidden border-2 transition-all duration-300 ${
                        currentImageIndex === index ? "border-[#C53D39]" : "border-gray-200 hover:border-gray-300"
                      }`}
                    >
                      <Image
                        src={img || "/placeholder.svg"}
                        alt={`${product.name} view ${index + 1}`}
                        width={64}
                        height={64}
                        className="object-cover w-full h-full"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Right Side - Product Details (Scrollable) */}
            <div className="overflow-y-auto max-h-[95vh]">
              <div className="p-8 space-y-6">
                {/* Product Title & Rating */}
                <div>
                  <div className="flex items-start justify-between mb-2">
                    <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 pr-4">{product.name}</h1>
                    <button
                      onClick={() => setIsWishlisted(!isWishlisted)}
                      className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 flex-shrink-0 ${
                        isWishlisted
                          ? "bg-[#C53D39] text-white"
                          : "bg-gray-100 text-gray-600 hover:bg-[#C53D39] hover:text-white"
                      }`}
                    >
                      <Heart className={`h-5 w-5 ${isWishlisted ? "fill-current" : ""}`} />
                    </button>
                  </div>

                  {product.rating && (
                    <div className="flex items-center space-x-2">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-4 w-4 ${i < product.rating! ? "text-yellow-400 fill-current" : "text-gray-300"}`}
                          />
                        ))}
                      </div>
                      <span className="text-sm text-gray-600">({product.rating}/5)</span>
                      <span className="text-sm text-gray-500">• 127 reviews</span>
                    </div>
                  )}
                </div>

                {/* Price */}
                <div className="flex items-baseline space-x-3">
                  <span className="text-3xl font-bold text-[#C53D39]">${product.price.toFixed(2)}</span>
                  {product.originalPrice && (
                    <>
                      <span className="text-xl text-gray-400 line-through">${product.originalPrice.toFixed(2)}</span>
                      {product.discount && (
                        <span className="bg-gradient-to-r from-[#C53D39] to-[#F1BA69] text-white px-3 py-1 rounded-full text-sm font-medium">
                          -{product.discount}% OFF
                        </span>
                      )}
                    </>
                  )}
                </div>

                {/* Stock Status */}
                <div className="flex items-center space-x-2">
                  <div className={`w-3 h-3 rounded-full ${product.isSoldOut ? "bg-red-500" : "bg-green-500"}`}></div>
                  <span className={`text-sm font-medium ${product.isSoldOut ? "text-red-600" : "text-green-600"}`}>
                    {product.isSoldOut ? "Out of Stock" : "In Stock"}
                  </span>
                </div>

                {/* Description */}
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Description</h3>
                  <p className="text-gray-600 leading-relaxed">{product.description}</p>
                </div>

                {/* Product Features */}
                <div>
                  <h3 className="font-semibold text-gray-900 mb-3">Key Features</h3>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li className="flex items-center space-x-2">
                      <div className="w-1.5 h-1.5 bg-[#C53D39] rounded-full"></div>
                      <span>Premium quality materials</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <div className="w-1.5 h-1.5 bg-[#C53D39] rounded-full"></div>
                      <span>Modern ergonomic design</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <div className="w-1.5 h-1.5 bg-[#C53D39] rounded-full"></div>
                      <span>Easy assembly included</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <div className="w-1.5 h-1.5 bg-[#C53D39] rounded-full"></div>
                      <span>2-year warranty</span>
                    </li>
                  </ul>
                </div>

                {/* Specifications */}
                <div>
                  <h3 className="font-semibold text-gray-900 mb-3">Specifications</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-gray-500">Material:</span>
                      <span className="ml-2 text-gray-900">Premium Wood</span>
                    </div>
                    <div>
                      <span className="text-gray-500">Dimensions:</span>
                      <span className="ml-2 text-gray-900">120x80x75 cm</span>
                    </div>
                    <div>
                      <span className="text-gray-500">Weight:</span>
                      <span className="ml-2 text-gray-900">25 kg</span>
                    </div>
                    <div>
                      <span className="text-gray-500">Color:</span>
                      <span className="ml-2 text-gray-900">Natural Oak</span>
                    </div>
                  </div>
                </div>

                {/* Size Options */}
                <div>
                  <h3 className="font-semibold text-gray-900 mb-3">Available Sizes</h3>
                  <div className="flex space-x-2">
                    {["Small", "Medium", "Large"].map((size) => (
                      <button
                        key={size}
                        className="px-4 py-2 border border-gray-300 rounded-lg hover:border-[#C53D39] hover:text-[#C53D39] transition-colors duration-300"
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Color Options */}
                <div>
                  <h3 className="font-semibold text-gray-900 mb-3">Available Colors</h3>
                  <div className="flex space-x-2">
                    {["#8B4513", "#D2691E", "#F5DEB3", "#696969"].map((color) => (
                      <button
                        key={color}
                        className="w-8 h-8 rounded-full border-2 border-gray-300 hover:border-[#C53D39] transition-colors duration-300"
                        style={{ backgroundColor: color }}
                      />
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="space-y-4 pt-4">
                  <Button
                    onClick={() => {
                      addToCart(product)
                      onClose()
                    }}
                    className="w-full"
                    size="lg"
                    disabled={product.isSoldOut}
                  >
                    <ShoppingBag className="h-5 w-5 mr-2" />
                    {product.isSoldOut ? "Sold Out" : "Add to Cart"}
                  </Button>

                  <div className="grid grid-cols-2 gap-3">
                    <Button variant="outline" size="lg" className="w-full bg-transparent">
                      Buy Now
                    </Button>
                    <Button variant="outline" size="lg" className="w-full bg-transparent">
                      Compare
                    </Button>
                  </div>
                </div>

                {/* Delivery Info */}
                <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-4 rounded-lg border border-green-200">
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center space-x-2 text-green-700">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="font-medium">Free delivery on orders over $500</span>
                    </div>
                    <div className="flex items-center space-x-2 text-green-600">
                      <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                      <span>Cash on Delivery available</span>
                    </div>
                    <div className="flex items-center space-x-2 text-green-600">
                      <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                      <span>Estimated delivery: 3-7 business days</span>
                    </div>
                  </div>
                </div>

                {/* Customer Reviews */}
                <div>
                  <h3 className="font-semibold text-gray-900 mb-4">Customer Reviews</h3>
                  <div className="space-y-4">
                    {[
                      { name: "Sarah Johnson", rating: 5, comment: "Excellent quality and fast delivery!" },
                      { name: "Mike Chen", rating: 4, comment: "Great product, exactly as described." },
                      { name: "Emma Davis", rating: 5, comment: "Love the design and comfort!" },
                    ].map((review, index) => (
                      <div key={index} className="border-b border-gray-100 pb-4 last:border-b-0">
                        <div className="flex items-center space-x-2 mb-2">
                          <span className="font-medium text-sm">{review.name}</span>
                          <div className="flex">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`h-3 w-3 ${i < review.rating ? "text-yellow-400 fill-current" : "text-gray-300"}`}
                              />
                            ))}
                          </div>
                        </div>
                        <p className="text-sm text-gray-600">{review.comment}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
