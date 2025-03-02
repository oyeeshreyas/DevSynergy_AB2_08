"use client"

import { IndianRupee } from "lucide-react"
import { Separator } from "@/components/ui/separator"
import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { useOrderStore } from "@/store/useOrderStore"
import { useEffect } from "react"
import type { CartItem } from "@/types/cartType"
import { CheckCircle, Package, ShoppingBag } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const Success = () => {
  const { orders, getOrderDetails } = useOrderStore()

  useEffect(() => {
    getOrderDetails()
  }, [getOrderDetails]) // Added getOrderDetails to the dependency array

  if (orders.length === 0)
    return (
      <div className="flex items-center justify-center min-h-screen dark:bg-gray-900 p-4">
        <Card className="max-w-md w-full shadow-lg">
          <CardHeader className="text-center pb-2">
            <CardTitle className="text-2xl font-bold text-gray-700 dark:text-gray-300">Order not found!</CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <ShoppingBag className="h-16 w-16 mx-auto text-gray-400 dark:text-gray-600 mb-4" />
            <p className="text-gray-600 dark:text-gray-400">We couldn't find any order details.</p>
            <Link to="/cart" className="block mt-6">
              <Button className="w-full bg-green-500 hover:bg-green-600">Go to Cart</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    )

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900 px-4 py-8">
      <Card className="max-w-2xl w-full shadow-lg border-0">
        <CardHeader className="text-center pb-2 border-b dark:border-gray-700">
          <div className="flex justify-center mb-4">
            <div className="h-16 w-16 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
              <CheckCircle className="h-8 w-8 text-green-600 dark:text-green-500" />
            </div>
          </div>
          <CardTitle className="text-2xl font-bold text-gray-800 dark:text-gray-200">
            Order Status: <span className="text-green-600 dark:text-green-500">{"confirm".toUpperCase()}</span>
          </CardTitle>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Thank you for your purchase! Your order has been confirmed.
          </p>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-4">
              <Package className="h-5 w-5 text-gray-700 dark:text-gray-300" />
              <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-300">Order Summary</h2>
            </div>

            <div className="space-y-4">
              {orders.map((order: any, index: number) => (
                <div key={index} className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-4">
                  {order.cartItems.map((item: CartItem, itemIndex: number) => (
                    <div key={itemIndex} className="mb-4">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center">
                          <div className="h-16 w-16 rounded-md overflow-hidden bg-white dark:bg-gray-700 flex-shrink-0 border dark:border-gray-600">
                            <img
                              src={item.image || "/placeholder.svg"}
                              alt={item.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="ml-4">
                            <h3 className="text-gray-800 dark:text-gray-200 font-medium">{item.name}</h3>
                            <p className="text-sm text-gray-500 dark:text-gray-400">Qty: {item.quantity || 1}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-gray-800 dark:text-gray-200 flex items-center">
                            <IndianRupee className="h-4 w-4" />
                            <span className="text-lg font-medium">{item.price}</span>
                          </div>
                        </div>
                      </div>
                      {itemIndex < order.cartItems.length - 1 && <Separator className="my-4" />}
                    </div>
                  ))}
                </div>
              ))}
            </div>

            {/* Order Total */}
            
          </div>

          <Link to="/">
            <Button className="bg-green-500 hover:bg-green-600 w-full py-6 rounded-md shadow-lg text-base font-medium">
              Continue Shopping
            </Button>
          </Link>

          <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-4">
            A confirmation email has been sent to your registered email address.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}

export default Success

