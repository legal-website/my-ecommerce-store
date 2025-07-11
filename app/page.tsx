"use client"

import { HeroCarousel } from "@/components/hero-carousel"
import { FeaturesSection } from "@/components/features-section"
import { CircularCategories } from "@/components/circular-categories"
import { ProductShowcase } from "@/components/product-showcase"
import { ProductCarousel } from "@/components/product-carousel"
import { ShopByRoom } from "@/components/shop-by-room"
import { OurClients } from "@/components/our-clients"

const products = [
  {
    id: "hero-1",
    name: "Luxe Sectional Sofa",
    price: 2299.99,
    originalPrice: 2899.99,
    image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&h=400&fit=crop",
    hoverImage: "https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?w=400&h=400&fit=crop",
    description: "Premium leather sectional with ergonomic design and built-in USB charging ports",
    rating: 4.9,
    isOnSale: true,
    discount: 21,
  },
  {
    id: "hero-2",
    name: "Executive Office Chair",
    price: 899.99,
    originalPrice: 1199.99,
    image: "https://images.unsplash.com/photo-1541558869434-2840d308329a?w=400&h=400&fit=crop",
    hoverImage: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=400&fit=crop",
    description: "Ergonomic office chair with lumbar support and premium materials",
    rating: 4.8,
    isOnSale: true,
    discount: 25,
  },
  {
    id: "hero-3",
    name: "Modern Dining Set",
    price: 1599.99,
    originalPrice: 1999.99,
    image: "https://images.unsplash.com/photo-1449247709967-d4461a6a6103?w=400&h=400&fit=crop",
    hoverImage: "https://images.unsplash.com/photo-1449247709967-d4461a6a6103?w=400&h=400&fit=crop",
    description: "Contemporary 8-seater dining table with matching chairs in oak finish",
    rating: 4.7,
    isOnSale: true,
    discount: 20,
  },
  {
    id: "hero-4",
    name: "King Platform Bed",
    price: 1299.99,
    originalPrice: 1699.99,
    image: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=400&h=400&fit=crop",
    hoverImage: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=400&h=400&fit=crop",
    description: "Minimalist king size platform bed with integrated nightstands",
    rating: 4.6,
    isOnSale: true,
    discount: 24,
  },
  {
    id: "5",
    name: "Coffee Table",
    price: 599.99,
    originalPrice: 799.99,
    image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=400&fit=crop",
    hoverImage: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=400&fit=crop",
    description: "Modern glass-top coffee table with storage compartment",
    rating: 4.5,
    isOnSale: true,
    discount: 25,
  },
  {
    id: "6",
    name: "Bookshelf Unit",
    price: 449.99,
    image: "https://images.unsplash.com/photo-1449247709967-d4461a6a6103?w=400&h=400&fit=crop",
    hoverImage: "https://images.unsplash.com/photo-1449247709967-d4461a6a6103?w=400&h=400&fit=crop",
    description: "5-tier wooden bookshelf with adjustable shelves",
    rating: 4.4,
  },
  {
    id: "7",
    name: "Recliner Chair",
    price: 899.99,
    originalPrice: 1099.99,
    image: "https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?w=400&h=400&fit=crop",
    hoverImage: "https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?w=400&h=400&fit=crop",
    description: "Leather recliner chair with massage function and cup holders",
    rating: 4.8,
    isOnSale: true,
    discount: 18,
  },
  {
    id: "8",
    name: "Wardrobe Cabinet",
    price: 1199.99,
    image: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=400&h=400&fit=crop",
    hoverImage: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=400&h=400&fit=crop",
    description: "Spacious 3-door wardrobe with mirror and multiple compartments",
    rating: 4.6,
  },
]

export default function Home() {
  return (
    <div className="min-h-screen">
      <HeroCarousel />
      <FeaturesSection />
      <CircularCategories />
      <ProductShowcase />
      <main className="container mx-auto px-4 py-8" id="products-section">
        <ProductCarousel
          products={products}
          title="Best Seller Products"
          subtitle="Discover our most popular furniture pieces that combine style, comfort, and quality craftsmanship"
        />
      </main>
      <ShopByRoom />
      <OurClients />
    </div>
  )
}
