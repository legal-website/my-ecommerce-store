"use client"

import Link from "next/link"
import type React from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useCart } from "@/hooks/use-cart"
import { useState } from "react"
import { Truck, CreditCard, CheckCircle } from "lucide-react"

export default function CheckoutPage() {
  const { items, total, clearCart } = useCart()
  const [isProcessing, setIsProcessing] = useState(false)
  const [orderPlaced, setOrderPlaced] = useState(false)
  const [orderNumber, setOrderNumber] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsProcessing(true)

    // Simulate order processing
    await new Promise((resolve) => setTimeout(resolve, 3000))

    // Generate order number
    const orderNum = `RF-${Date.now()}`
    setOrderNumber(orderNum)
    setOrderPlaced(true)
    clearCart()
    setIsProcessing(false)
  }

  if (items.length === 0 && !orderPlaced) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-3xl font-bold mb-8">No Items to Checkout</h1>
        <Button asChild size="lg">
          <Link href="/">Continue Shopping</Link>
        </Button>
      </div>
    )
  }

  if (orderPlaced) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-2xl mx-auto text-center">
          <Card className="border-0 shadow-2xl bg-gradient-to-br from-green-50 to-emerald-50">
            <CardContent className="p-12">
              <div className="space-y-6">
                <div className="w-20 h-20 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle className="h-10 w-10 text-white" />
                </div>

                <div className="space-y-4">
                  <h1 className="text-4xl font-bold text-gray-900">Order Placed Successfully!</h1>
                  <p className="text-xl text-gray-600">Thank you for choosing Revive Furniture</p>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-sm border border-green-200">
                  <p className="text-lg font-medium text-gray-900 mb-2">
                    Order Number: <span className="text-green-600">{orderNumber}</span>
                  </p>
                  <p className="text-gray-600">
                    Your furniture will be delivered within 3-7 business days. You'll pay cash on delivery.
                  </p>
                </div>

                <div className="flex items-center justify-center space-x-2 text-orange-600">
                  <CreditCard className="h-5 w-5" />
                  <span className="font-medium">Cash on Delivery - No advance payment required</span>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button asChild size="lg">
                    <Link href="/">Continue Shopping</Link>
                  </Button>
                  <Button asChild variant="outline" size="lg">
                    <Link href="/track-order">Track Order</Link>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  const deliveryCharge = total > 500 ? 0 : 49.99
  const finalTotal = total + deliveryCharge

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Checkout</h1>
        <p className="text-gray-600">Complete your furniture order with Cash on Delivery</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Truck className="h-5 w-5 text-orange-500" />
              <span>Delivery Information</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="firstName">First Name *</Label>
                  <Input id="firstName" required className="mt-1" />
                </div>
                <div>
                  <Label htmlFor="lastName">Last Name *</Label>
                  <Input id="lastName" required className="mt-1" />
                </div>
              </div>

              <div>
                <Label htmlFor="email">Email Address *</Label>
                <Input id="email" type="email" required className="mt-1" />
              </div>

              <div>
                <Label htmlFor="phone">Phone Number *</Label>
                <Input id="phone" type="tel" required className="mt-1" />
              </div>

              <div>
                <Label htmlFor="address">Complete Address *</Label>
                <Input id="address" placeholder="House/Flat No, Street, Area" required className="mt-1" />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="city">City *</Label>
                  <Input id="city" required className="mt-1" />
                </div>
                <div>
                  <Label htmlFor="zipCode">Zip Code *</Label>
                  <Input id="zipCode" required className="mt-1" />
                </div>
              </div>

              <div>
                <Label htmlFor="landmark">Landmark (Optional)</Label>
                <Input id="landmark" placeholder="Near hospital, school, etc." className="mt-1" />
              </div>

              <div>
                <Label htmlFor="notes">Special Instructions (Optional)</Label>
                <Input id="notes" placeholder="Any special delivery instructions..." className="mt-1" />
              </div>

              {/* Payment Method Display */}
              <div className="bg-gradient-to-r from-orange-50 to-red-50 p-6 rounded-lg border border-orange-200">
                <div className="flex items-center space-x-3 mb-3">
                  <CreditCard className="h-6 w-6 text-orange-600" />
                  <div>
                    <h3 className="font-semibold text-orange-800">Payment Method</h3>
                    <p className="text-orange-600 font-medium">Cash on Delivery (COD)</p>
                  </div>
                </div>
                <p className="text-sm text-orange-700">
                  Pay ${finalTotal.toFixed(2)} in cash when your furniture is delivered to your doorstep. No advance
                  payment required!
                </p>
              </div>

              <Button type="submit" className="w-full" size="lg" disabled={isProcessing}>
                {isProcessing ? (
                  <div className="flex items-center space-x-2">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    <span>Processing Order...</span>
                  </div>
                ) : (
                  `Place Order - $${finalTotal.toFixed(2)} (COD)`
                )}
              </Button>
            </form>
          </CardContent>
        </Card>

        <Card className="sticky top-8">
          <CardHeader>
            <CardTitle>Order Summary</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3 max-h-64 overflow-y-auto">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="flex justify-between items-center py-2 border-b border-gray-100 last:border-b-0"
                >
                  <div className="flex-1">
                    <span className="font-medium text-sm">{item.name}</span>
                    <span className="text-gray-500 text-sm ml-2">x {item.quantity}</span>
                  </div>
                  <span className="font-medium">${(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>

            <div className="border-t pt-4 space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal:</span>
                <span className="font-medium">${total.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Delivery Charge:</span>
                <span className="font-medium">
                  {deliveryCharge === 0 ? (
                    <span className="text-green-600">Free</span>
                  ) : (
                    `$${deliveryCharge.toFixed(2)}`
                  )}
                </span>
              </div>
              {deliveryCharge === 0 && (
                <p className="text-sm text-green-600 bg-green-50 p-2 rounded">🎉 Free delivery on orders over $500!</p>
              )}
              <div className="flex justify-between items-center text-lg font-bold border-t pt-3">
                <span>Total (COD):</span>
                <span className="text-2xl bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent">
                  ${finalTotal.toFixed(2)}
                </span>
              </div>
            </div>

            <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
              <p className="text-sm text-yellow-800">
                <strong>Note:</strong> You will pay ${finalTotal.toFixed(2)} in cash when your furniture is delivered.
                Our delivery team will contact you before arrival.
              </p>
            </div>

            <div className="text-center text-sm text-gray-500 space-y-1">
              <p>🚚 Estimated delivery: 3-7 business days</p>
              <p>📞 We'll call you before delivery</p>
              <p>💰 Pay cash on delivery</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
