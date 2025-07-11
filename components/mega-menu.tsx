"use client"
import Link from "next/link"
import Image from "next/image"

interface MegaMenuProps {
  isVisible: boolean
  onMouseEnter: () => void
  onMouseLeave: () => void
}

const categories = [
  {
    name: "Living Room",
    subcategories: ["Sofas & Sectionals", "Coffee Tables", "TV Stands", "Recliners", "Accent Chairs"],
    image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=300&h=200&fit=crop",
  },
  {
    name: "Bedroom",
    subcategories: ["Beds & Frames", "Dressers", "Nightstands", "Wardrobes", "Mattresses"],
    image: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=300&h=200&fit=crop",
  },
  {
    name: "Office",
    subcategories: ["Office Chairs", "Desks", "Bookcases", "Filing Cabinets", "Desk Accessories"],
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=300&h=200&fit=crop",
  },
  {
    name: "Outdoor",
    subcategories: ["Patio Sets", "Outdoor Sofas", "Garden Chairs", "Umbrellas", "Fire Pits"],
    image: "https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?w=300&h=200&fit=crop",
  },
]

export function MegaMenu({ isVisible, onMouseEnter, onMouseLeave }: MegaMenuProps) {
  return (
    <div
      className={`mega-menu ${isVisible ? "show" : ""} absolute top-full left-0 w-full bg-white border-t-4 border-[#C53D39] z-50`}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-4 gap-8">
          {categories.map((category) => (
            <div key={category.name} className="space-y-4">
              <div className="relative overflow-hidden rounded-lg group">
                <Image
                  src={category.image || "/placeholder.svg"}
                  alt={category.name}
                  width={300}
                  height={200}
                  className="w-full h-32 object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                <h3 className="absolute bottom-2 left-2 text-white font-bold text-lg font-poppins">{category.name}</h3>
              </div>
              <ul className="space-y-2">
                {category.subcategories.map((subcategory) => (
                  <li key={subcategory}>
                    <Link
                      href={`/category/${subcategory.toLowerCase().replace(/\s+/g, "-")}`}
                      className="text-gray-600 hover:text-[#C53D39] transition-colors duration-200 text-sm font-poppins"
                    >
                      {subcategory}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-8 pt-6 border-t border-gray-200">
          <div className="flex justify-center space-x-8">
            <Link
              href="/sale"
              className="bg-gradient-to-r from-[#C53D39] to-[#F1BA69] text-white px-6 py-2 rounded-full font-semibold hover:opacity-90 transition-all duration-300"
            >
              Shop Sale Items
            </Link>
            <Link
              href="/new-arrivals"
              className="border-2 border-[#C53D39] text-[#C53D39] px-6 py-2 rounded-full font-semibold hover:bg-[#C53D39] hover:text-white transition-all duration-300"
            >
              New Arrivals
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
