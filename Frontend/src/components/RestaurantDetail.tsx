import { Badge } from "@/components/ui/badge"
import { Clock, MapPin, Star, Utensils, Phone } from "lucide-react"
import AvailableMenu from "./AvailableMenu"
import { useParams } from "react-router-dom"
import { useEffect } from "react"
import { useRestaurantStore } from "@/store/useRestaurantStore"

const RestaurantDetail = () => {
  const params = useParams();
  const {  getSingleRestaurant } = useRestaurantStore();

  useEffect(() => {
    getSingleRestaurant(params.id!); 
    
  }, [params.id]);
  
  
  return (
    <div className="w-full min-h-screen bg-orange-50">
      <div className="w-full ">
        
        <div className="relative 8 flex-cols">
          <img
            src="https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/0fdd0e25559501.56347a238b44b.png"
            alt="Burger King banner"
            className="w-full object-cover h-[400px]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
          <div className="absolute max-w-6xl mx-auto bottom-6 left-6 right-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="px-3 py-1 text-sm font-semibold text-white bg-orange-500 rounded-full">20% OFF</div>
              <div className="px-3 py-1 text-sm font-semibold text-orange-600 rounded-full bg-white/90">
                Best of BK Combos
              </div>
            </div>
            <h1 className="py-5 mb-3 text-4xl font-bold text-left text-white md:text-5xl">Burger King</h1>
            <div className="flex flex-wrap items-center gap-3">
              {["Burgers", "Fast Food", "Beverages", "Snacks"].map((cuisine, idx) => (
                <Badge key={idx} className="text-orange-600 bg-white/90 hover:bg-white">
                  {cuisine}
                </Badge>
              ))}
            </div>
          </div>
        </div>

        
        <div className="p-6 mb-8 bg-white shadow-lg rounded-xl">
          <div className="grid gap-6 md:grid-cols-3">
           
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 px-4 py-2 font-semibold text-green-800 bg-green-100 rounded-lg">
                <Star className="w-5 h-5 fill-current" />
                <span className="text-lg">4.2</span>
              </div>
              <div>
                <p className="font-medium">Very Good</p>
                <p className="text-sm text-gray-600">500+ Ratings</p>
              </div>
            </div>

            
            <div className="flex items-center gap-4">
              <Clock className="w-8 h-8 text-orange-500" />
              <div>
                <p className="font-medium">Delivery Time</p>
                <p className="font-semibold text-orange-600">45 mins</p>
              </div>
            </div>

            
            <div className="flex items-center gap-4">
              <div className="p-2 bg-orange-100 rounded-lg">
                <Utensils className="w-6 h-6 text-orange-600" />
              </div>
              <div>
                <p className="font-medium">Cost for Two</p>
                <p className="font-semibold text-orange-600">₹400</p>
              </div>
            </div>
          </div>
        </div>

        
        <div className="grid gap-6 mb-8 md:grid-cols-2">
          <div className="p-6 bg-white shadow-lg rounded-xl">
            <div className="flex items-start gap-4">
              <MapPin className="w-6 h-6 mt-1 text-orange-500" />
              <div>
                <h3 className="mb-2 text-lg font-semibold">Restaurant Location</h3>
                <p className="leading-relaxed text-gray-600">
                  123 Main Street, City Center Mall
                  <br />
                  Cityville, State 12345
                </p>
              </div>
            </div>
          </div>

          <div className="p-6 bg-white shadow-lg rounded-xl">
            <div className="flex items-start gap-4">
              <Phone className="w-6 h-6 mt-1 text-orange-500" />
              <div>
                <h3 className="mb-2 text-lg font-semibold">Contact & Opening Hours</h3>
                <p className="text-gray-600">
                  Phone: +91 1234567890
                  <br />
                  Open: 11:00 AM - 11:00 PM
                </p>
              </div>
            </div>
          </div>
        </div>

        
        <AvailableMenu />
      </div>
    </div>
  )
}

export default RestaurantDetail

