import { useState } from "react"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { motion, AnimatePresence } from "framer-motion"
import { Search, Filter, TrendingUp, DollarSign, Clock } from "lucide-react"

const orderStatuses = ["Pending", "Confirmed", "Preparing", "OutForDelivery", "Delivered"]

const mockOrders = [
  {
    id: 1,
    customer: "Eashan",
    address: "Sinhgad College, Pune",
    amount: 599,
    status: "Pending",
    items: ["Margherita ", "Coke"],
  },
  {
    id: 2,
    customer: "Shreya",
    address: "MG Road, Mumbai",
    amount: 849,
    status: "Confirmed",
    items: ["Chicken Biryani", "Raita", "Gulab Jamun"],
  },
  {
    id: 3,
    customer: "Andree",
    address: "Koramangala, Bangalore",
    amount: 399,
    status: "Preparing",
    items: ["Veg Burger", "Fries", "Chocolate Shake"],
  },
  {
    id: 4,
    customer: "Thomos",
    address: "Salt Lake, Kolkata",
    amount: 749,
    status: "OutForDelivery",
    items: ["Masala Dosa", "Idli", "Filter Coffee"],
  },
  
]

const Orders = () => {
  const [orders, setOrders] = useState(mockOrders)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("All")

  const filteredOrders = orders.filter(
    (order) =>
      (order.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.address.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (statusFilter === "All" || order.status === statusFilter),
  )

  const totalOrders = filteredOrders.length
  const totalRevenue = filteredOrders.reduce((sum, order) => sum + order.amount, 0)
  const pendingOrders = filteredOrders.filter((order) => order.status === "Pending").length

  const updateOrderStatus = (orderId: number, newStatus: string) => {
    setOrders(orders.map((order) => (order.id === orderId ? { ...order, status: newStatus } : order)))
  }

  return (
    <div className="max-w-7xl mx-auto py-10 px-4 sm:px-6 lg:px-8">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-4xl font-extrabold text-gray-900 dark:text-white mb-10"
      >
        Orders Dashboard
      </motion.h1>

      {/* Summary Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10"
      >
        <div className="bg-blue-100 dark:bg-blue-900 p-6 rounded-xl shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-blue-600 dark:text-blue-200 font-medium">Total Orders</p>
              <p className="text-3xl font-bold text-blue-800 dark:text-blue-100">{totalOrders}</p>
            </div>
            <TrendingUp className="h-10 w-10 text-blue-500 dark:text-blue-300" />
          </div>
        </div>
        <div className="bg-green-100 dark:bg-green-900 p-6 rounded-xl shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-green-600 dark:text-green-200 font-medium">Total Revenue</p>
              <p className="text-3xl font-bold text-green-800 dark:text-green-100">₹{totalRevenue}</p>
            </div>
            <DollarSign className="h-10 w-10 text-green-500 dark:text-green-300" />
          </div>
        </div>
        <div className="bg-yellow-100 dark:bg-yellow-900 p-6 rounded-xl shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-yellow-600 dark:text-yellow-200 font-medium">Pending Orders</p>
              <p className="text-3xl font-bold text-yellow-800 dark:text-yellow-100">{pendingOrders}</p>
            </div>
            <Clock className="h-10 w-10 text-yellow-500 dark:text-yellow-300" />
          </div>
        </div>
      </motion.div>

      {/* Search and Filter */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-6 space-y-4 md:space-y-0">
        <div className="relative w-full md:w-1/3">
          <Input
            type="text"
            placeholder="Search orders..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
        </div>
        <div className="flex items-center space-x-4 w-full md:w-auto">
          <Filter className="text-gray-400" size={20} />
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="All">All Statuses</SelectItem>
                {orderStatuses.map((status) => (
                  <SelectItem key={status} value={status}>
                    {status}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Orders List */}
      <motion.div layout className="space-y-6">
        <AnimatePresence>
          {filteredOrders.map((order) => (
            <motion.div
              key={order.id}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="bg-white dark:bg-gray-800 shadow-lg rounded-xl p-6 border border-gray-200 dark:border-gray-700"
            >
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
                <div className="flex-1 mb-4 md:mb-0">
                  <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100">{order.customer}</h2>
                  <p className="text-gray-600 dark:text-gray-400 mt-2">
                    <span className="font-semibold">Address:</span> {order.address}
                  </p>
                  <p className="text-gray-600 dark:text-gray-400 mt-2">
                    <span className="font-semibold">Total Amount:</span> ₹{order.amount}
                  </p>
                  <div className="mt-2">
                    <span className="font-semibold text-gray-600 dark:text-gray-400">Items:</span>
                    <ul className="list-disc list-inside text-gray-600 dark:text-gray-400 ml-2">
                      {order.items.map((item, index) => (
                        <li key={index}>{item}</li>
                      ))}
                    </ul>
                  </div>
                </div>
                <div className="w-full md:w-1/3">
                  <Label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Order Status
                  </Label>
                  <Select defaultValue={order.status} onValueChange={(value) => updateOrderStatus(order.id, value)}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        {orderStatuses.map((status) => (
                          <SelectItem key={status} value={status}>
                            {status}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </div>
  )
}

export default Orders

