import { ProductGrid } from "@/components/product-grid"
import { Hero } from "@/components/hero"

const products = [
  {
    id: "1",
    name: "Modern Sectional Sofa",
    price: 1299.99,
    originalPrice: 1599.99,
    image: "/placeholder.svg?height=400&width=400",
    hoverImage: "/placeholder.svg?height=400&width=400&text=Hover",
    description: "Luxurious sectional sofa with premium fabric upholstery and ergonomic design",
    rating: 4.8,
    isOnSale: true,
    discount: 19,
  },
  {
    id: "2",
    name: "Ergonomic Office Chair",
    price: 599.99,
    image: "/placeholder.svg?height=400&width=400",
    hoverImage: "/placeholder.svg?height=400&width=400&text=Chair",
    description: "Professional office chair with lumbar support and adjustable height",
    rating: 4.6,
  },
  {
    id: "3",
    name: "Dining Table Set",
    price: 899.99,
    originalPrice: 1199.99,
    image: "/placeholder.svg?height=400&width=400",
    hoverImage: "/placeholder.svg?height=400&width=400&text=Table",
    description: "Elegant 6-seater dining table with matching chairs in oak finish",
    rating: 4.9,
    isOnSale: true,
    discount: 25,
  },
  {
    id: "4",
    name: "King Size Bed Frame",
    price: 799.99,
    image: "/placeholder.svg?height=400&width=400",
    hoverImage: "/placeholder.svg?height=400&width=400&text=Bed",
    description: "Solid wood king size bed frame with upholstered headboard",
    rating: 4.7,
    isSoldOut: true,
  },
  {
    id: "5",
    name: "Coffee Table",
    price: 299.99,
    originalPrice: 399.99,
    image: "/placeholder.svg?height=400&width=400",
    hoverImage: "/placeholder.svg?height=400&width=400&text=Coffee",
    description: "Modern glass-top coffee table with storage compartment",
    rating: 4.5,
    isOnSale: true,
    discount: 25,
  },
  {
    id: "6",
    name: "Bookshelf Unit",
    price: 449.99,
    image: "/placeholder.svg?height=400&width=400",
    hoverImage: "/placeholder.svg?height=400&width=400&text=Shelf",
    description: "5-tier wooden bookshelf with adjustable shelves",
    rating: 4.4,
  },
  {
    id: "7",
    name: "Recliner Chair",
    price: 899.99,
    originalPrice: 1099.99,
    image: "/placeholder.svg?height=400&width=400",
    hoverImage: "/placeholder.svg?height=400&width=400&text=Recliner",
    description: "Leather recliner chair with massage function and cup holders",
    rating: 4.8,
    isOnSale: true,
    discount: 18,
  },
  {
    id: "8",
    name: "Wardrobe Cabinet",
    price: 1199.99,
    image: "/placeholder.svg?height=400&width=400",
    hoverImage: "/placeholder.svg?height=400&width=400&text=Wardrobe",
    description: "Spacious 3-door wardrobe with mirror and multiple compartments",
    rating: 4.6,
  },
]

export default function Home() {
  return (
    <div className="min-h-screen">
      <Hero />
      <main className="container mx-auto px-4 py-16">
        <ProductGrid products={products} />
      </main>
    </div>
  )
}
