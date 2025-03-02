import { useState, useEffect, useMemo } from "react"
import { useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import {
  Search,
  ArrowRight,
  Clock,
  Drumstick,
  Pizza,
  SandwichIcon as Hamburger,
  ShoppingCart,
  Truck,
  MessageCircle,
} from "lucide-react"
import { motion,  AnimatePresence } from "framer-motion"

const HeroSection = () => {
  const [searchText, setSearchText] = useState<string>("")
  const [activeIndex, setActiveIndex] = useState(0)
  const navigate = useNavigate()
  

  const heroImages = [
    "https://images.unsplash.com/photo-1600100397849-3a782cfd8492?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fGluZGlhbiUyMGZhcm1lcnxlbnwwfHwwfHx8MA%3D%3D",
    "https://images.unsplash.com/photo-1525383033081-6088a7a5affa?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fHZpZXRuYW0lMjBmYXJtfGVufDB8fDB8fHww",
    "https://plus.unsplash.com/premium_photo-1674019234981-036f884baf0d?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDQyfHx8ZW58MHx8fHx8",
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((current) => (current + 1) % heroImages.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  const restaurants = [
    {
      name: "KFC",
      image:
        "https://e0.pxfuel.com/wallpapers/593/129/desktop-wallpaper-kfc-kfc-chicken.jpg",
      description: "Finger-Lickin' Good Fried Chicken",
      icon: Drumstick,
    },
    {
      name: "Pizza Hut",
      image: "https://b.zmtcdn.com/data/pictures/chains/5/3400105/8825db90e0b3e0013bffefdd596eaf58.jpg",
      description: "Delicious Pizzas for Every Taste",
      icon: Pizza,
    },
    {
      name: "McDonald's",
      image: "https://static.vecteezy.com/system/resources/thumbnails/032/937/205/small_2x/fast-food-meal-burger-fries-drink-free-photo.jpg",
      description: "I'm Lovin' It - Fast Food Favorites",
      icon: Hamburger,
    },
    {
      name: "Domino's Pizza",
      image: "https://media-cdn.tripadvisor.com/media/photo-s/10/aa/89/3a/pizza.jpg",
      description: "Hot, Fresh Pizza Delivered Fast",
      icon: Pizza,
    },
    {
      name: "Burger King",
      image: "https://plus.unsplash.com/premium_photo-1683619761464-6b7c9a2716a8?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8YnVyZ2VyJTIwa2luZ3xlbnwwfHwwfHx8MA%3D%3D",
      description: "Home of the Whopper",
      icon: Hamburger,
    },
  ]

  const filteredSuggestions = useMemo(
    () => restaurants.filter((restaurant) => restaurant.name.toLowerCase().includes(searchText.toLowerCase())),
    [searchText, restaurants],
  )

  const featuredDishes = [
    {
      name: "Apple",
      image: "https://plus.unsplash.com/premium_photo-1661322640130-f6a1e2c36653?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8YXBwbGV8ZW58MHx8MHx8fDA%3D",
      price: "₹200/kg",
      time: "20 min"
    },
    {
      name: "Okra",
      image: "https://media.istockphoto.com/id/1857815009/photo/close-up-of-ladyfingers-vegetable-on-hand-close-up-of-okra-lady-fingers-lady-fingers-or-okra.webp?a=1&b=1&s=612x612&w=0&k=20&c=A_zUeAXq50TmD9pl8VuLCOeCvGplsWPIaFFDDayLqQY=",
      price: "₹80/kg",
      time: "25 min"
    },
    {
      name: "Ghee",
      image: "https://media.istockphoto.com/id/857450176/photo/ghee-or-clarified-butter-close-up-in-wooden-bowl-and-silver-spoon-selective-focus.webp?a=1&b=1&s=612x612&w=0&k=20&c=n60RJg4OCMTlp8WtjSNFecj0grJswbBYZYLRRFoQgn4=",
      price: "₹500/1L",
      time: "30 min"
    },
    {
      name: "Tomato",
      image: "https://plus.unsplash.com/premium_photo-1661827989152-6306a475e618?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8dG9tYXRvJTIwZmFybXxlbnwwfHwwfHx8MA%3D%3D",
      price: "₹50/Kg",
      time: "35 min"
    }
  ];
  const scrollToBottom = () => {
    window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
    navigate("/chat")
  };

  return (
    <div className="min-h-screen overflow-hidden bg-gradient-to-b from-orange-50 to-white z-50">
      <div className="w-full h-screen -my-20 overflow-hidden">
      <motion.div
  className="fixed bottom-6 right-6 bg-green-500 text-white p-4 rounded-full shadow-lg cursor-pointer z-50"
  whileHover={{ scale: 1.2 }}
  whileTap={{ scale: 0.9 }}
  onClick={scrollToBottom}
  
>
  <MessageCircle className="w-8 h-8" />
</motion.div>
        <AnimatePresence initial={false}>
          <motion.img
            key={activeIndex}
            src={heroImages[activeIndex]}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            className="absolute inset-0 object-cover w-full h-full"
          />
        </AnimatePresence>
        <div className="absolute inset-0 bg-black bg-opacity-50"> </div>
        <div className="relative z-10 flex flex-col items-center justify-center px-4 my-40 text-white">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="text-center"
          >
            <h1 className="mb-4 my-8 text-6xl font-extrabold text-white md:text-8xl bg-clip-text">FarmDirect</h1>
            
          </motion.div>
          <motion.div
            className="w-full max-w-3xl"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 1 }}
          >
            <div className="relative flex items-center">
              <div className="relative w-full max-w-3xl ">
                
              <h1 className="mb-4 text-4xl font-extrabold text-white md:text-3xl">
            Farm to Table <span className="text-green-400">Marketplace</span>
          </h1>
          <p className="max-w-2xl mx-auto mb-8 text-lg text-gray-200">
            Fresh produce directly from farmers to your table. Support local agriculture and enjoy the freshest
            ingredients.
          </p>
          <Button 
            size="lg" 
            className="rounded-full bg-green-500 hover:bg-green-600 text-white px-8 py-5"
            onClick={() => navigate("/search")}
          >
            Explore Products
          </Button>

                {searchText.length > 0 && (
                  <div className="absolute z-10 w-full mt-2 overflow-hidden bg-white rounded-lg shadow-lg">
                    {filteredSuggestions.map((restaurant, index) => (
                      <motion.div
                        key={index}
                        className="flex items-center p-4 cursor-pointer hover:bg-orange-50"
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.2, delay: index * 0.05 }}
                        onClick={() => {
                          setSearchText(restaurant.name)
                          navigate(`/search/${restaurant.name}`)
                        }}
                      >
                        <img
                          src={restaurant.image || "/placeholder.svg"}
                          alt={restaurant.name}
                          className="w-16 h-16 mr-4 rounded-full"
                        />
                        <div className="flex-grow">
                          <h3 className="text-lg font-semibold text-gray-800">{restaurant.name}</h3>
                          <p className="text-sm text-gray-600">{restaurant.description}</p>
                        </div>
                        <restaurant.icon className="w-8 h-8 text-green-500" />
                      </motion.div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="relative px-4 py-20 my-20 bg-green-50 rounded-3xl md:px-8 bg-gradient">
        <h2 className="mb-12 text-5xl font-bold text-center text-green-600"></h2>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {featuredDishes.map((dish, index) => (
            <motion.div
              key={index}
              className="overflow-hidden transition-all duration-300 transform bg-white shadow-lg rounded-3xl hover:shadow-2xl hover:scale-105"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="relative">
                <img src={dish.image || "/placeholder.svg"} alt={dish.name} className="object-cover w-full h-56" />
                <div className="absolute flex items-center px-2 py-1 text-sm font-semibold text-green-500 bg-white rounded-full top-2 right-2">
                 
                </div>
              </div>
              <div className="p-6">
                <h3 className="mb-2 text-xl font-bold text-gray-800">{dish.name}</h3>
                <div className="flex items-center justify-between mb-4">
                  <p className="text-2xl font-bold text-green-500">{dish.price}</p>
                  <span className="flex items-center text-gray-600">
                    <Clock className="w-4 h-4 mr-1" /> {dish.time}
                  </span>
                </div>
                <Button className="w-full py-3 font-semibold text-white transition-all duration-300 rounded-full  bg-green-500 hover:bg-green-600 " onClick={() => navigate("/search")} >
                  Order Now
                </Button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="relative px-4 py-20 overflow-hidden md:px-8 bg-gradient from-white to-green-50">
        <motion.div
          className="overflow-hidden shadow-2xl bg-gradient-to-r from-green-400 to-blue-500 rounded-3xl"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex flex-col items-center md:flex-row">
            <div className="p-12 md:w-1/2">
              <motion.h2
                className="mb-6 text-5xl font-bold text-white"
                initial={{ x: -100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.8 }}
              >
                Fresh Start!
              </motion.h2>
              <motion.p
                className="mb-8 text-xl text-white"
                initial={{ x: -100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                Experience farm-fresh goodness! Get 30% off on your first order with code: FARM30
              </motion.p>
              <motion.div
                initial={{ x: -100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                <Button className="px-10 py-5 text-xl font-semibold text-black transition-all duration-300 bg-white rounded-full shadow-lg hover:bg-green-100 hover:scale-105" onClick={() => navigate("/search")}>
                  Claim Offer <ArrowRight className="w-6 h-6 ml-2" />
                </Button>
              </motion.div>
            </div>
            <div className="relative md:w-1/2">
              <img
                src="https://media.istockphoto.com/id/1409236261/photo/healthy-food-healthy-eating-background-fruit-vegetable-berry-vegetarian-eating-superfood.webp?a=1&b=1&s=612x612&w=0&k=20&c=9iXfq7aU8ST5daSEfJfTYITHbpUS9vquT0IAink2PDg="
                alt="Special Offer"
                className="object-cover w-full h-96 md:h-full"
              />
              <motion.div
                className="absolute p-4 bg-white rounded-full shadow-lg top-4 right-4"
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
              >
                <p>🌱</p>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>

      <div className="px-4 py-20 md:px-8 bg-gradient-to-b from-green-50 to-white">
        <h2 className="mb-16 text-5xl font-bold text-center text-black">How It Works</h2>
        <div className="flex flex-col items-center justify-center gap-12 md:flex-row">
          {[
            { icon: Search, title: "Discover", description: "Find fresh produce directly from local farmers" },
            { icon: ShoppingCart, title: "Order", description: "Select farm-fresh products and place your order" },
            { icon: Truck, title: "Deliver", description: "Get your order delivered straight from the farm to your home" },
          ].map((step, index) => (
            <motion.div
              key={index}
              className="flex flex-col items-center text-center"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
            >
              <motion.div
                className="p-6 mb-6 rounded-full shadow-lg bg-gradient-to-br from-green-600"
                whileHover={{ scale: 1.1 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <step.icon className="w-16 h-16 text-white" />
              </motion.div>
              <h3 className="mb-3 text-2xl font-bold text-gray-800">{step.title}</h3>
              <p className="text-lg text-gray-600">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default HeroSection

