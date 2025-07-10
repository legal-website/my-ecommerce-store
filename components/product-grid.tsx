import { ProductCard } from "./product-card"

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

interface ProductGridProps {
  products: Product[]
}

export function ProductGrid({ products }: ProductGridProps) {
  return (
    <div className="space-y-12">
      {/* Section header */}
      <div className="text-center space-y-4">
        <h2 className="text-4xl font-bold text-gray-900">Best Seller Products</h2>
        <div className="w-24 h-1 bg-gradient-to-r from-[#C53D39] to-[#F1BA69] mx-auto rounded-full"></div>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Discover our most popular furniture pieces that combine style, comfort, and quality craftsmanship
        </p>
      </div>

      {/* Products grid */}
      <div id="products-section" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  )
}
