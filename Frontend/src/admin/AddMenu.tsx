"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Loader2, Plus, FileEdit,  Leaf, BarChart3, Package, ShoppingCart, } from "lucide-react"
import { type FormEvent, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { motion } from "framer-motion"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"


// Mock data for demonstration
const mockProducts = [
  {
    id: 1,
    name: "Organic Tomatoes",
    description: "Fresh, locally grown organic tomatoes. Perfect for salads and cooking.",
    price: 40,
    stock: 120,
    unit: "kg",
    category: "Vegetables",
    image: "data:image/jpeg;base64,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",
  },
  {
    id: 2,
    name: "Fresh Bananas",
    description: "Free-range eggs from our happy hens. Rich in flavor and nutrition.",
    price: 80,
    stock: 200,
    unit: "dozen",
    category: "Dairy & Eggs",
    image: "https://plus.unsplash.com/premium_photo-1675731118330-08c71253af17?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8ODl8fGJhbmFuYSUyMGhkfGVufDB8fDB8fHww",
  },
  {
    id: 3,
    name: "Ghee",
    description: "Pure, raw honey harvested from our own beehives. Unfiltered and unpasteurized.",
    price: 250,
    stock: 50,
    unit: "bottle",
    category: "Other",
    image: "data:image/jpeg;base64,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",
  },
  {
    id: 4,
    name: "Organic Apples",
    description: "Sweet and crisp apples grown without pesticides. Great for snacking or baking.",
    price: 60,
    stock: 80,
    unit: "kg",
    category: "Fruits",
    image: "https://plus.unsplash.com/premium_photo-1661322640130-f6a1e2c36653?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8YXBwbGV8ZW58MHx8MHx8fDA%3D",
  },
]

// Product form schema type
type ProductFormSchema = {
  name: string
  description: string
  price: number
  stock: number
  unit: string
  category: string
  image?: File
}

const FarmDashboard = () => {
  const [products, setProducts] = useState(mockProducts)
  const [input, setInput] = useState<ProductFormSchema>({
    name: "",
    description: "",
    price: 0,
    stock: 0,
    unit: "kg",
    category: "Vegetables",
  })
  const [open, setOpen] = useState<boolean>(false)
  const [editOpen, setEditOpen] = useState<boolean>(false)
  const [ setSelectedProduct] = useState<any>()
  const [error, setError] = useState<Partial<ProductFormSchema>>({})
  const [loading, setLoading] = useState(false)
  const [activeTab, setActiveTab] = useState("products")
  const [lowStockThreshold] = useState(30)

  const changeEventHandler = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target
    setInput({ ...input, [name]: type === "number" ? Number(value) : value })
  }

  const handleSelectChange = (name: string, value: string) => {
    setInput({ ...input, [name]: value })
  }

  const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)

    // Simple validation
    const newErrors: Partial<ProductFormSchema> = {}
    if (!input.name) newErrors.name = "Product name is required"
    if (!input.description) newErrors.description = "Description is required"

    if (Object.keys(newErrors).length > 0) {
      setError(newErrors)
      setLoading(false)
      return
    }

    // Simulate API call
    setTimeout(() => {
      const newProduct = {
        id: products.length + 1,
        ...input,
        image: input.image ? URL.createObjectURL(input.image) : "/placeholder.svg?height=192&width=384",
      }

      setProducts([...products, newProduct])
      setInput({
        name: "",
        description: "",
        price: 0,
        stock: 0,
        unit: "kg",
        category: "Vegetables",
      })
      setLoading(false)
      setOpen(false)
    }, 1000)
  }

  const handleEdit = (product: any) => {
    setSelectedProduct(product)
    setInput({
      name: product.name,
      description: product.description,
      price: product.price,
      stock: product.stock,
      unit: product.unit,
      category: product.category,
    })
    setEditOpen(true)
  }

  const updateProduct = () => {
    setLoading(true)

    // Simulate API call
    setTimeout(() => {
      

      
      setLoading(false)
      setEditOpen(false)
    }, 1000)
  }

  

  const updateStock = (id: number, newStock: number) => {
    const updatedProducts = products.map((p) => (p.id === id ? { ...p, stock: newStock } : p))
    setProducts(updatedProducts)
  }

  // Calculate dashboard stats
  const totalProducts = products.length
  const totalStock = products.reduce((sum, product) => sum + product.stock, 0)
  const lowStockProducts = products.filter((p) => p.stock <= lowStockThreshold).length
  const totalValue = products.reduce((sum, product) => sum + product.price * product.stock, 0)

  return (
    <div className="min-h-screen">
      <div className="flex h-screen overflow-hidden">
        {/* Sidebar */}
        <div className="hidden md:flex w-64 flex-col fixed inset-y-0 bg-white border-r border-gray-200">
          <div className="flex items-center h-16 px-6 border-b border-gray-200">
            
          </div>
          <div className="flex-1 flex flex-col overflow-y-auto pt-5 pb-4">
            <nav className="mt-5 flex-1 px-3 space-y-1">
              <Button
                variant={activeTab === "dashboard" ? "default" : "ghost"}
                className="w-full justify-start"
                onClick={() => setActiveTab("dashboard")}
              >
                <BarChart3 className="mr-3 h-5 w-5" />
                Dashboard
              </Button>
              <Button
                variant={activeTab === "products" ? "default" : "ghost"}
                className="w-full justify-start"
                onClick={() => setActiveTab("products")}
              >
                <Package className="mr-3 h-5 w-5" />
                Products
              </Button>
              
            </nav>
          </div>
          <div className="p-4 border-t border-gray-200">
            <div className="flex items-center">
              <div className="ml-3">
              </div>
            </div>
          </div>
        </div>

        {/* Main content */}
        <div className="flex flex-col flex-1 md:pl-64">
          <div className="sticky top-0 z-10 flex-shrink-0 h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6">
            <h1 className="text-2xl font-semibold text-gray-900">
              {activeTab === "dashboard" ? "Dashboard" : "Farm Products"}
            </h1>
            <div className="ml-4 flex items-center md:ml-6">
              {activeTab === "products" && (
                <Dialog open={open} onOpenChange={setOpen}>
                  <DialogTrigger asChild>
                    <Button className="bg-green-600 hover:bg-green-700 text-white">
                      <Plus className="mr-2 h-5 w-5" />
                      Add New Product
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[550px]">
                    <DialogHeader>
                      <DialogTitle className="text-2xl font-bold text-gray-800">Add New Farm Product</DialogTitle>
                      <DialogDescription className="text-gray-600">
                        Add a new product to your farm inventory
                      </DialogDescription>
                    </DialogHeader>
                    <form onSubmit={submitHandler} className="space-y-6 py-4">
                      <div className="space-y-2">
                        <Label className="text-gray-700 font-semibold">Product Name</Label>
                        <Input
                          type="text"
                          name="name"
                          value={input.name}
                          onChange={changeEventHandler}
                          placeholder="e.g., Organic Tomatoes"
                          className="border-gray-300"
                        />
                        {error.name && <span className="text-xs font-medium text-red-600">{error.name}</span>}
                      </div>
                      <div className="space-y-2">
                        <Label className="text-gray-700 font-semibold">Description</Label>
                        <Textarea
                          name="description"
                          value={input.description}
                          onChange={changeEventHandler}
                          placeholder="Describe your product..."
                          className="border-gray-300"
                          rows={3}
                        />
                        {error.description && (
                          <span className="text-xs font-medium text-red-600">{error.description}</span>
                        )}
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label className="text-gray-700 font-semibold">Price (₹)</Label>
                          <Input
                            type="number"
                            name="price"
                            value={input.price}
                            onChange={changeEventHandler}
                            placeholder="0.00"
                            className="border-gray-300"
                          />
                          {error.price && <span className="text-xs font-medium text-red-600">{error.price}</span>}
                        </div>
                        <div className="space-y-2">
                          <Label className="text-gray-700 font-semibold">Initial Stock</Label>
                          <Input
                            type="number"
                            name="stock"
                            value={input.stock}
                            onChange={changeEventHandler}
                            placeholder="0"
                            className="border-gray-300"
                          />
                          {error.stock && <span className="text-xs font-medium text-red-600">{error.stock}</span>}
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label className="text-gray-700 font-semibold">Unit</Label>
                          <Select value={input.unit} onValueChange={(value) => handleSelectChange("unit", value)}>
                            <SelectTrigger>
                              <SelectValue placeholder="Select unit" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="kg">Kilogram (kg)</SelectItem>
                              <SelectItem value="g">Gram (g)</SelectItem>
                              <SelectItem value="piece">Piece</SelectItem>
                              <SelectItem value="dozen">Dozen</SelectItem>
                              <SelectItem value="bundle">Bundle</SelectItem>
                              <SelectItem value="bottle">Bottle</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label className="text-gray-700 font-semibold">Category</Label>
                          <Select
                            value={input.category}
                            onValueChange={(value) => handleSelectChange("category", value)}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select category" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Vegetables">Vegetables</SelectItem>
                              <SelectItem value="Fruits">Fruits</SelectItem>
                              <SelectItem value="Dairy & Eggs">Dairy & Eggs</SelectItem>
                              <SelectItem value="Grains">Grains</SelectItem>
                              <SelectItem value="Herbs">Herbs</SelectItem>
                              <SelectItem value="Other">Other</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label className="text-gray-700 font-semibold">Product Image</Label>
                        <Input
                          type="file"
                          name="image"
                          onChange={(e) => setInput({ ...input, image: e.target.files?.[0] || undefined })}
                          className="border-gray-300"
                        />
                      </div>
                      <DialogFooter>
                        <Button
                          type="submit"
                          disabled={loading}
                          className="bg-green-600 hover:bg-green-700 text-white w-full py-3"
                        >
                          {loading ? (
                            <>
                              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                              Creating...
                            </>
                          ) : (
                            "Add Product"
                          )}
                        </Button>
                      </DialogFooter>
                    </form>
                  </DialogContent>
                </Dialog>
              )}
            </div>
          </div>

          <main className="flex-1 overflow-y-auto p-6">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="mb-8 md:hidden">
                <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
                <TabsTrigger value="products">Products</TabsTrigger>
              </TabsList>

              <TabsContent value="dashboard">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                      <CardTitle className="text-sm font-medium text-gray-500">Total Products</CardTitle>
                      <Package className="h-4 w-4 text-gray-500" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">{totalProducts}</div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                      <CardTitle className="text-sm font-medium text-gray-500">Total Stock</CardTitle>
                      <BarChart3 className="h-4 w-4 text-gray-500" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">{totalStock} units</div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                      <CardTitle className="text-sm font-medium text-gray-500">Low Stock Items</CardTitle>
                      <Loader2 className="h-4 w-4 text-gray-500" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">{lowStockProducts}</div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                      <CardTitle className="text-sm font-medium text-gray-500">Inventory Value</CardTitle>
                      <ShoppingCart className="h-4 w-4 text-gray-500" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">₹{totalValue.toLocaleString()}</div>
                    </CardContent>
                  </Card>
                </div>

                <h2 className="text-xl font-semibold mb-4">Inventory Status</h2>
                <div className="bg-white rounded-lg shadow overflow-hidden">
                  <div className="p-6">
                    <div className="space-y-6">
                      {products.map((product) => (
                        <div key={product.id} className="space-y-2">
                          <div className="flex justify-between">
                            <span className="font-medium">{product.name}</span>
                            <span className="text-sm text-gray-500">
                              {product.stock} {product.unit} in stock
                            </span>
                          </div>
                          <div className="flex items-center gap-4">
                            <Progress value={Math.min((product.stock / 200) * 100, 100)} className="h-2 flex-1" />
                            <span className="text-sm w-16 text-right">
                              {product.stock <= lowStockThreshold ? (
                                <span className="text-red-500">Low</span>
                              ) : (
                                <span className="text-green-500">Good</span>
                              )}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="products">
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {products.map((product, idx) => (
                    <motion.div
                      key={product.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: idx * 0.1 }}
                    >
                      <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300 bg-white rounded-xl border border-gray-200">
                        <CardContent className="p-0">
                          <div className="relative">
                            <img
                              src={product.image || "/placeholder.svg"}
                              alt={product.name}
                              className="h-48 w-full object-cover"
                            />
                            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent to-black opacity-60"></div>
                            <div className="absolute top-4 right-4">
                              {product.stock <= lowStockThreshold && (
                                <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">Low Stock</span>
                              )}
                            </div>
                            <div className="absolute bottom-4 left-4 right-4">
                              <h3 className="text-xl font-bold text-white mb-1">{product.name}</h3>
                              <div className="flex justify-between items-center">
                                <span className="text-lg font-semibold text-white">
                                  ₹{product.price}/{product.unit}
                                </span>
                                <div className="flex gap-2">
                                  <Button
                                    size="sm"
                                    onClick={() => handleEdit(product)}
                                    className="bg-white text-green-600 hover:bg-green-100"
                                  >
                                    <FileEdit className="h-4 w-4" />
                                  </Button>
                                  
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="p-4">
                            <p className="text-gray-600 text-sm line-clamp-2 mb-3">{product.description}</p>
                            <div className="flex justify-between items-center">
                              <div>
                                <span className="text-sm font-medium text-gray-700">
                                  Stock: {product.stock} {product.unit}
                                </span>
                              </div>
                              <div className="flex gap-2">
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => updateStock(product.id, Math.max(0, product.stock - 1))}
                                  disabled={product.stock <= 0}
                                >
                                  -
                                </Button>
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => updateStock(product.id, product.stock + 1)}
                                >
                                  +
                                </Button>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>

                {products.length === 0 && (
                  <div className="text-center py-12">
                    <Leaf className="mx-auto h-12 w-12 text-gray-400" />
                    <h3 className="mt-2 text-sm font-semibold text-gray-900">No products</h3>
                    <p className="mt-1 text-sm text-gray-500">Get started by adding a new product.</p>
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </main>
        </div>
      </div>

      {/* Edit Product Dialog */}
      <Dialog open={editOpen} onOpenChange={setEditOpen}>
        <DialogContent className="sm:max-w-[550px]">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-gray-800">Edit Product</DialogTitle>
            <DialogDescription className="text-gray-600">Update your product details</DialogDescription>
          </DialogHeader>
          <div className="space-y-6 py-4">
            <div className="space-y-2">
              <Label className="text-gray-700 font-semibold">Product Name</Label>
              <Input
                type="text"
                name="name"
                value={input.name}
                onChange={changeEventHandler}
                className="border-gray-300"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-gray-700 font-semibold">Description</Label>
              <Textarea
                name="description"
                value={input.description}
                onChange={changeEventHandler}
                className="border-gray-300"
                rows={3}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-gray-700 font-semibold">Price (₹)</Label>
                <Input
                  type="number"
                  name="price"
                  value={input.price}
                  onChange={changeEventHandler}
                  className="border-gray-300"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-gray-700 font-semibold">Stock</Label>
                <Input
                  type="number"
                  name="stock"
                  value={input.stock}
                  onChange={changeEventHandler}
                  className="border-gray-300"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-gray-700 font-semibold">Unit</Label>
                <Select value={input.unit} onValueChange={(value) => handleSelectChange("unit", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select unit" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="kg">Kilogram (kg)</SelectItem>
                    <SelectItem value="g">Gram (g)</SelectItem>
                    <SelectItem value="piece">Piece</SelectItem>
                    <SelectItem value="dozen">Dozen</SelectItem>
                    <SelectItem value="bundle">Bundle</SelectItem>
                    <SelectItem value="bottle">Bottle</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label className="text-gray-700 font-semibold">Category</Label>
                <Select value={input.category} onValueChange={(value) => handleSelectChange("category", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Vegetables">Vegetables</SelectItem>
                    <SelectItem value="Fruits">Fruits</SelectItem>
                    <SelectItem value="Dairy & Eggs">Dairy & Eggs</SelectItem>
                    <SelectItem value="Grains">Grains</SelectItem>
                    <SelectItem value="Herbs">Herbs</SelectItem>
                    <SelectItem value="Other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <Button onClick={updateProduct} disabled={loading} className="bg-green-600 hover:bg-green-700 text-white">
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Updating...
                  </>
                ) : (
                  "Update Product"
                )}
              </Button>
            </DialogFooter>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default FarmDashboard

