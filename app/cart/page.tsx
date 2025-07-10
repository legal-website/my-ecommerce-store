"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useCart } from "@/hooks/use-cart"
import { Minus, Plus, Trash2, ShoppingBag, CreditCard } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function CartPage() {
  const { items, total, updateQuantity, removeFromCart } = useCart()

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <div className="max-w-md mx-auto space-y-6">
          <div className="w-24 h-24 bg-gradient-to-r from-red-500 to-orange-500 rounded-full flex items-center justify-center mx-auto">
            <ShoppingBag className="h-12 w-12 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900">Your Cart is Empty</h1>
          <p className="text-gray-600">Discover our amazing furniture collection and add some items to get started!</p>
          <Button asChild size="lg" className="mt-8">
            <Link href="/">Continue Shopping</Link>
          </Button>
        </div>
      </div>
    )
  }

  const deliveryCharge = total > 500 ? 0 : 49.99
  const finalTotal = total + deliveryCharge

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Shopping Cart</h1>
        <p className="text-gray-600">Review your selected furniture items</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-4">
          {items.map((item) => (
            <Card key={item.id} className="overflow-hidden">
              <CardContent className="p-6">
                <div className="flex items-center space-x-6">
                  <div className="relative w-24 h-24 bg-gray-100 rounded-lg overflow-hidden">
                    <Image src={item.image || "/placeholder.svg"} alt={item.name} fill className="object-cover" />
                  </div>

                  <div className="flex-1 space-y-2">
                    <h3 className="font-semibold text-lg text-gray-900">{item.name}</h3>
                    <p className="text-sm text-gray-600 line-clamp-2">{item.description}</p>
                    <div className="flex items-center space-x-2">
                      <span className="text-lg font-bold text-gray-900">${item.price.toFixed(2)}</span>
                      {item.originalPrice && (
                        <span className="text-sm text-gray-500 line-through">${item.originalPrice.toFixed(2)}</span>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="h-8 w-8"
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <span className="w-12 text-center font-medium">{item.quantity}</span>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="h-8 w-8"
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>

                  <div className="text-right space-y-2">
                    <p className="text-xl font-bold text-gray-900">${(item.price * item.quantity).toFixed(2)}</p>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeFromCart(item.id)}
                      className="text-red-600 hover:text-red-700 hover:bg-red-50"
                    >
                      <Trash2 className="h-4 w-4 mr-1" />
                      Remove
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div>
          <Card className="sticky top-8">
            <CardHeader>
              <CardTitle className="text-xl">Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal:</span>
                  <span className="font-medium">${total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Delivery:</span>
                  <span className="font-medium">
                    {deliveryCharge === 0 ? (
                      <span className="text-green-600">Free</span>
                    ) : (
                      `$${deliveryCharge.toFixed(2)}`
                    )}
                  </span>
                </div>
                {deliveryCharge === 0 && (
                  <p className="text-sm text-green-600 bg-green-50 p-2 rounded">
                    🎉 Free delivery on orders over $500!
                  </p>
                )}
              </div>

              <div className="border-t pt-4">
                <div className="flex justify-between items-center text-lg font-bold">
                  <span>Total (COD):</span>
                  <span className="text-2xl bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent">
                    ${finalTotal.toFixed(2)}
                  </span>
                </div>
              </div>

              <div className="bg-gradient-to-r from-blue-50 to-orange-50 p-4 rounded-lg border border-orange-200">
                <div className="flex items-center space-x-2 mb-2">
                  <CreditCard className="h-5 w-5 text-orange-600" />
                  <span className="font-medium text-orange-800">Cash on Delivery</span>
                </div>
                <p className="text-sm text-orange-700">
                  Pay ${finalTotal.toFixed(2)} in cash when your furniture is delivered to your doorstep
                </p>
              </div>

              <Button asChild className="w-full" size="lg">
                <Link href="/checkout">Place Order (COD)</Link>
              </Button>

              <Button asChild variant="outline" className="w-full bg-transparent">
                <Link href="/">Continue Shopping</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
