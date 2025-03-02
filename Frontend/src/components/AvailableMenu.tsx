
import { Button } from "./ui/button"
import { Card, CardContent } from "./ui/card"
import { useCartStore } from "@/store/useCartStore"
import { useNavigate } from "react-router-dom"
import { MenuItem } from "@/types/menuType"


const menuItems: MenuItem[] = [
  {
    _id: "67b41e1ef625e132bcb11932",
    name: "Craving Saving Meal",
    price: 779,
    discount: "40% OFF USE 1TYNEW",
    description:
      "Crave & Save whopping Rs. 213 on 4 Pc Hot & Crispy, 4 Pc Peri Peri Strips, Medium Popcorn, 2 Dips & a Pepsi PET 475ml [Serves 2-3]",
    image:
      "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_366/RX_THUMBNAIL/IMAGES/VENDOR/2024/12/9/054949a0-0d74-46eb-8840-0871bf05b0cf_33722.JPG",
    savings: 213,
  },
  {
    _id: "3",
    name: "Party Bucket Meal",
    price: 649,
    discount: "40% OFF USE 1TYNEW",
    description:
      "Party time Savings of Rs. 102 on 4 Pc Peri Peri Chicken Leg Pc, 2 Pc Peri Peri Strips, Regular Popcorn & a Pepsi PET 475ml [Serves 2]",
    image:
      "https://orderserv-kfc-assets.yum.com/15895bb59f7b4bb588ee933f8cd5344a/images/items/xl/D-PR00002002.jpg?ver=16.66",
    savings: 102,
  },
  {
    _id: "4",
    name: "Insta Reel Korean Roll Meal",
    price: 349,
    discount: "40% OFF USE 1TYNEW",
    description: "Flat Rs. 57 off on Tangy Korean Chicken Roll, 2 Pc Hot & Crispy, 7Up Zero Sugar Can [Serves 1]",
    image:
      "https://b.zmtcdn.com/data/dish_photos/54b/10822ad5a07ebf271d1365a26df3454b.jpeg",
    savings: 57,
  },
  {
    _id: "5",
    name: "Spicy Grilled Chicken Combo",
    price: 499,
    discount: "30% OFF USE SPICY30",
    description:
      "Enjoy our signature spicy grilled chicken with a side of crispy fries and a refreshing drink [Serves 1-2]",
    image:
      "https://orderserv-kfc-assets.yum.com/15895bb59f7b4bb588ee933f8cd5344a/images/items/xl/D-PR00002017.jpg?ver=16.66",
    savings: 150,
  },
  {
    _id: "6",
    name: "Family Feast Box",
    price: 999,
    discount: "25% OFF USE FAMILY25",
    description:
      "Perfect for family gatherings! 8 Pc Chicken, Large Popcorn, 4 Dips, 2 Large Fries & 2 Pepsi PET 750ml [Serves 4-5]",
    image:
      "https://cdn4.singleinterface.com/files/banner_images/34404/8162_1624879426_minglesbucketMeal310x236.jpg",
    savings: 250,
  },
  {
    _id: "7",
    name: "Veg Zinger Combo",
    price: 299,
    discount: "20% OFF USE VEG20",
    description: "Delicious Veg Zinger Burger with Medium Fries and a Pepsi PET 475ml [Serves 1]",
    image:
      "https://images.ctfassets.net/wtodlh47qxpt/392RDgEFoMhr9S8Zcn45SZ/4a58998840070168d334eef3f272c5d3/D-PR00001004-prod?h=300&w=400&fm=webp&fit=fill",
    savings: 60,
  },
  {
    _id: "8",
    name: "Boneless Strips Bucket",
    price: 449,
    discount: "35% OFF USE STRIPS35",
    description:
      "Enjoy 12 Pc Boneless Chicken Strips with 2 Dips - perfect for sharing or as a protein-packed meal [Serves 2-3]",
    image:
      "https://www.jvsfc.com/wp-content/uploads/2023/02/Hot-Crispy-Boneless-10-Pcs-With-Thousand-Sauce-Dip-1.jpg",
    savings: 157,
  },
  {
    _id: "9",
    name: "Chizza Meal",
    price: 399,
    discount: "15% OFF USE CHIZZA15",
    description: "Try our unique Chicken Chizza with a side of Spicy Potato Bites and a Pepsi PET 475ml [Serves 1]",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRRvZeLn0hJ2pGpjSgwB7mjw6moaHKyOvAjdg&s",
    savings: 60,
  },
  {
    _id: "10",
    name: "Midnight Munch Box",
    price: 599,
    discount: "25% OFF USE MIDNIGHT25",
    description:
      "Late night cravings? Get 6 Pc Hot & Crispy, 4 Hot Wings, Medium Popcorn & 2 Pepsi PET 475ml [Serves 2-3]",
    image:
      "https://images.ctfassets.net/wtodlh47qxpt/5QkOsHMzOkwnmm2UAzDhwt/5f6081b4d035e7f20ae684812ff1b7d0/D-PR00002412-prod?h=300&w=400&fm=webp&fit=fill",
    savings: 150,
  },
];

const AvailableMenu = () => {
  const { addToCart } = useCartStore()
  const navigate = useNavigate()
  

  const handleAddToCart = (item: MenuItem) => {
    const cartItem = {
      ...item,
      quantity: 1,
    }
    addToCart(cartItem)
    navigate("/cart")
  }

  return (
    <div>
      {menuItems.map((item) => (
        <Card key={item._id}>
          <CardContent className="flex items-center gap-4">
            <img src={item.image || "/placeholder.svg"} alt={item.name} className="w-24 h-24 rounded-md object-cover" />
            <div>
              <h3 className="text-lg font-medium">{item.name}</h3>
              <p className="text-sm text-gray-500">{item.description}</p>
              <p className="text-sm text-gray-500">Price: ₹{item.price}</p>
              {item.discount && <p className="text-sm text-green-500">{item.discount}</p>}
            </div>
          </CardContent>
          <div className="relative">
            <Button
              onClick={() => handleAddToCart(item)}
              className="absolute -bottom-3 left-1/2 -translate-x-1/2  bg-green-500 hover:bg-green-600  text-white font-semibold w-[100px] text-sm px-4 py-2 rounded-full shadow-lg transition-all duration-300 hover:scale-105"
            >
              ADD
            </Button>
          </div>
        </Card>
      ))}
    </div>
  )
}

export default AvailableMenu