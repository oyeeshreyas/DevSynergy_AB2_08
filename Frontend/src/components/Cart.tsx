"use client"

import { useState } from "react"
import { Minus, Plus, Trash2, UtensilsCrossed } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"
import { Button } from "./ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "./ui/card"
import { ScrollArea } from "./ui/scroll-area"
import { Input } from "./ui/input"
import { Badge } from "./ui/badge"
import CheckoutConfirmPage from "./CheckoutConfirmPage"
import { useCartStore } from "@/store/useCartStore"

const Cart = () => {
  const [open, setOpen] = useState(false)
  const { cart, removeFromTheCart, incrementQuantity, decrementQuantity, clearCart } = useCartStore()
  const [promoCode, setPromoCode] = useState("")
  const [discount, setDiscount] = useState(0)

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const total = subtotal - discount

  const applyPromoCode = () => {
    if (promoCode.toLowerCase() === "discount10") {
      setDiscount(Math.round(subtotal * 0.1))
    } else {
      setDiscount(0)
    }
  }

  return (
    <div className="min-h-screen w-full py-8 px-2 sm:px-6 lg:px-8">
      <Card className="max-w-[calc(100vw-1rem)] sm:max-w-4xl mx-auto shadow-2xl bg-white/80 backdrop-blur-sm">
        <CardHeader className=" text-white rounded-t-lg">
          <CardTitle className="text-3xl font-bold flex items-center justify-center">
            <UtensilsCrossed className="mr-2" />
          </CardTitle>
        </CardHeader>
        <CardContent className="p-4 sm:p-6">
          <div className="flex justify-between items-center mb-6">
            <span className="text-lg font-semibold text-gray-700">{cart.length} items in cart</span>
            <Button variant="outline" onClick={clearCart} className="text-red-500 hover:bg-red-50">
              Clear All
            </Button>
          </div>
          <div className="lg:flex lg:space-x-8">
            <div className="lg:w-2/3">
              <ScrollArea className="h-[50vh] sm:h-[400px] lg:h-auto rounded-md border-2 border-green-200">
                {cart.length > 0 ? (
                  cart.map((item) => (
                    <div
                      key={item._id}
                      className="flex items-center space-x-4 p-4 border-b border-green-100 last:border-b-0"
                    >
                      <Avatar className="h-16 w-16">
                        <AvatarImage src={item.image} alt={item.name} />
                        <AvatarFallback>{item.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg">{item.name}</h3>
                        <p className="text-green-600 font-medium">₹{item.price}</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button
                          size="icon"
                          variant="outline"
                          className="h-8 w-8 rounded-full"
                          onClick={() => decrementQuantity(item._id)}
                        >
                          <Minus className="h-4 w-4" />
                        </Button>
                        <span className="font-bold text-lg w-6 text-center">{item.quantity}</span>
                        <Button
                          size="icon"
                          className="h-8 w-8 rounded-full  bg-green-500 hover:bg-green-600 "
                          onClick={() => incrementQuantity(item._id)}
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => removeFromTheCart(item._id)}
                        className="text-red-500 hover:bg-red-50"
                      >
                        <Trash2 className="h-5 w-5" />
                      </Button>
                    </div>
                  ))
                ) : (
                  <div className="p-4 text-center text-gray-500">Your cart is empty</div>
                )}
              </ScrollArea>
            </div>
            <div className="lg:w-1/3 mt-8 lg:mt-0">
              <Card className="bg-green-50 shadow-md">
                <CardHeader>
                  <CardTitle className="text-2xl text-green-800">Order Summary</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between text-lg">
                      <span>Subtotal</span>
                      <span>₹{subtotal}</span>
                    </div>
                    {discount > 0 && (
                      <div className="flex justify-between text-green-600">
                        <span>Discount</span>
                        <span>-₹{discount}</span>
                      </div>
                    )}
                    <div className="flex justify-between font-bold text-xl text-green-800">
                      <span>Total</span>
                      <span>₹{total}</span>
                    </div>
                    <div className="pt-4">
                      <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
                        <Input
                          type="text"
                          placeholder="Enter promo code"
                          value={promoCode}
                          onChange={(e) => setPromoCode(e.target.value)}
                          className="w-full sm:flex-grow border-green-200 focus:border-green-500"
                        />
                        <Button onClick={applyPromoCode} className="w-full sm:w-auto  bg-green-500 hover:bg-green-600 ">
                          Apply
                        </Button>
                      </div>
                      {discount > 0 && (
                        <Badge variant="outline" className="mt-2 bg-green-50 text-green-600 border-green-200">
                          Promo code applied successfully!
                        </Badge>
                      )}
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button
                    onClick={() => setOpen(true)}
                    className="w-full  bg-green-500 hover:bg-green-600  text-white font-semibold py-3 px-4 rounded-full text-lg shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105"
                    disabled={cart.length === 0}
                  >
                    Proceed to Checkout
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        </CardContent>
      </Card>
      <CheckoutConfirmPage open={open} setOpen={setOpen} />
    </div>
  )
}

export default Cart

