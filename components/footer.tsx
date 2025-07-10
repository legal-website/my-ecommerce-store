import { Truck, CreditCard, Shield, Phone, Mail, MapPin } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      {/* Features Section */}
      <div className="border-b border-gray-800">
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div className="flex flex-col items-center space-y-4">
              <div className="w-16 h-16 bg-gradient-to-r from-red-500 to-orange-500 rounded-full flex items-center justify-center">
                <Truck className="h-8 w-8 text-white" />
              </div>
              <h3 className="font-semibold text-lg">Free Delivery</h3>
              <p className="text-gray-400 text-sm">Free shipping on orders over $500</p>
            </div>
            <div className="flex flex-col items-center space-y-4">
              <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center">
                <CreditCard className="h-8 w-8 text-white" />
              </div>
              <h3 className="font-semibold text-lg">Cash on Delivery</h3>
              <p className="text-gray-400 text-sm">Pay when you receive your furniture</p>
            </div>
            <div className="flex flex-col items-center space-y-4">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                <Shield className="h-8 w-8 text-white" />
              </div>
              <h3 className="font-semibold text-lg">Quality Guarantee</h3>
              <p className="text-gray-400 text-sm">Premium materials and craftsmanship</p>
            </div>
            <div className="flex flex-col items-center space-y-4">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center">
                <Phone className="h-8 w-8 text-white" />
              </div>
              <h3 className="font-semibold text-lg">24/7 Support</h3>
              <p className="text-gray-400 text-sm">Always here to help you</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-6">
            <Image
              src="/logo.webp"
              alt="Revive Furniture"
              width={200}
              height={60}
              className="h-12 w-auto brightness-0 invert"
            />
            <p className="text-gray-400 leading-relaxed">
              Transform your living space with our premium furniture collection. Quality craftsmanship meets modern
              design for the perfect home.
            </p>
            <div className="flex space-x-4">
              <div className="w-10 h-10 bg-gradient-to-r from-red-500 to-orange-500 rounded-full flex items-center justify-center cursor-pointer hover:scale-110 transition-transform">
                <span className="text-white font-bold">f</span>
              </div>
              <div className="w-10 h-10 bg-gradient-to-r from-red-500 to-orange-500 rounded-full flex items-center justify-center cursor-pointer hover:scale-110 transition-transform">
                <span className="text-white font-bold">t</span>
              </div>
              <div className="w-10 h-10 bg-gradient-to-r from-red-500 to-orange-500 rounded-full flex items-center justify-center cursor-pointer hover:scale-110 transition-transform">
                <span className="text-white font-bold">i</span>
              </div>
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-6">Quick Links</h3>
            <ul className="space-y-3 text-gray-400">
              <li>
                <Link href="/" className="hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/shop" className="hover:text-white transition-colors">
                  Shop
                </Link>
              </li>
              <li>
                <Link href="/products" className="hover:text-white transition-colors">
                  Products
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-white transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-6">Categories</h3>
            <ul className="space-y-3 text-gray-400">
              <li>
                <Link href="/living-room" className="hover:text-white transition-colors">
                  Living Room
                </Link>
              </li>
              <li>
                <Link href="/bedroom" className="hover:text-white transition-colors">
                  Bedroom
                </Link>
              </li>
              <li>
                <Link href="/dining-room" className="hover:text-white transition-colors">
                  Dining Room
                </Link>
              </li>
              <li>
                <Link href="/office" className="hover:text-white transition-colors">
                  Office
                </Link>
              </li>
              <li>
                <Link href="/outdoor" className="hover:text-white transition-colors">
                  Outdoor
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-6">Contact Info</h3>
            <div className="space-y-4 text-gray-400">
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-red-500" />
                <span>+01 23456789</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-red-500" />
                <span>furniture@domain.com</span>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="h-5 w-5 text-red-500" />
                <span>123 Furniture Street, Design City, DC 12345</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-gray-800">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-gray-400 text-sm">
              &copy; 2024 Revive Furniture. All rights reserved. | Cash on Delivery Available
            </p>
            <div className="flex space-x-6 text-sm text-gray-400">
              <Link href="/privacy" className="hover:text-white transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="hover:text-white transition-colors">
                Terms of Service
              </Link>
              <Link href="/returns" className="hover:text-white transition-colors">
                Return Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
