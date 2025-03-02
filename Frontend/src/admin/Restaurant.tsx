import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { type RestaurantFormSchema, restaurantFromScheme } from "@/schema/restaurantSchema"
import { Loader2,  MapPin, Clock,  ImageIcon, Sprout, Wheat } from "lucide-react"
import { type FormEvent, useEffect, useState } from "react"
import { motion } from "framer-motion"
import { useRestaurantStore } from "@/store/useRestaurantStore"

const Restaurant = () => {
  const [input, setInput] = useState<RestaurantFormSchema>({
    restaurantName: "",
    city: "",
    country: "",
    deliveryTime: 0,
    cuisines: [],
    imageFile: undefined,
  })
  const [errors, setErrors] = useState<Partial<RestaurantFormSchema>>();
  const { loading, createRestaurant, restaurant, updateRestaurant,getRestaurant } = useRestaurantStore();
  const changeEventHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target
    setInput({ ...input, [name]: type === "number" ? Number(value) : value })
  }

  const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const result = restaurantFromScheme.safeParse(input)
    if (!result.success) {
      const fieldErrors = result.error.formErrors.fieldErrors
      setErrors(fieldErrors as Partial<RestaurantFormSchema>)
      return
    }
    //ADD RESTAURANT API
    try {
      const formData = new FormData;
      formData.append("restaurantName", input.restaurantName);
      formData.append("city", input.city);
      formData.append("country", input.country);
      formData.append("deliveryTime", input.deliveryTime.toString());
      formData.append("cuisines", JSON.stringify(input.cuisines));

      if (input.imageFile) {
        formData.append("imageFile", input.imageFile);
      }
      if (restaurant) {
        //UPDATE
        await updateRestaurant(formData);
      } else {
        //CREATE
        await createRestaurant(formData);
      }
    } catch (error) {
      console.log(error);
    }

  };

  useEffect(() => {
    const fetchRestaurant = async () => {
      await getRestaurant();
      if(restaurant){
        setInput({
          restaurantName: restaurant.restaurantName || "",
          city: restaurant.city || "",
          country: restaurant.country || "",
          deliveryTime: restaurant.deliveryTime || 0,
          cuisines: restaurant.cuisines
            ? restaurant.cuisines.map((cuisine: string) => cuisine)
            : [],
          imageFile: undefined,
        });
      };
      }
    fetchRestaurant();
    
  }, []);


  return (
    <div className=" inset-0 overflow-auto">
      <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <h1 className="text-4xl font-extrabold text-center text-gray-800 mb-2">Welcome, Farmer!</h1>
          <p className="text-xl text-center text-gray-600 mb-8">Let's get your farm on our platform</p>
        </motion.div>

        <Card className="shadow-lg">
          <CardHeader className="bg-green-500">
            <CardTitle className="text-2xl font-bold text-center text-white">Add Your Farm</CardTitle>
          </CardHeader>
          <CardContent className="bg-white p-6">
            <form onSubmit={submitHandler} className="space-y-6">
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <motion.div whileHover={{ scale: 1.02 }} transition={{ type: "spring", stiffness: 300 }}>
                  <Label className="flex items-center space-x-2 text-gray-700">
                    <Sprout className="w-5 h-5 text-green-500" />
                    <span>What do you produce</span>
                  </Label>
                  <Input
                    type="text"
                    name="restaurantName"
                    value={input.restaurantName}
                    onChange={changeEventHandler}
                    placeholder="e.g. Fruits, Vegetable, Dairy "
                    className="mt-1 border-gray-300 focus:border-orange-500 focus:ring-orange-500"
                  />
                  {errors && <span className="text-xs text-red-600 font-medium">{errors.restaurantName}</span>}
                </motion.div>

                <motion.div whileHover={{ scale: 1.02 }} transition={{ type: "spring", stiffness: 300 }}>
                  <Label className="flex items-center space-x-2 text-gray-700">
                    <MapPin className="w-5 h-5 text-green-500" />
                    <span>City,Village</span>
                  </Label>
                  <Input
                    type="text"
                    name="city"
                    value={input.city}
                    onChange={changeEventHandler}
                    placeholder="Enter your city name"
                    className="mt-1 border-gray-300 focus:border-orange-500 focus:ring-orange-500"
                  />
                  {errors && <span className="text-xs text-red-600 font-medium">{errors.city}</span>}
                </motion.div>

                <motion.div whileHover={{ scale: 1.02 }} transition={{ type: "spring", stiffness: 300 }}>
                  <Label className="flex items-center space-x-2 text-gray-700">
                    <MapPin className="w-5 h-5 text-green-500" />
                    <span>Country</span>
                  </Label>
                  <Input
                    type="text"
                    name="country"
                    value={input.country}
                    onChange={changeEventHandler}
                    placeholder="Enter your country name"
                    className="mt-1 border-gray-300 focus:border-orange-500 focus:ring-orange-500"
                  />
                  {errors && <span className="text-xs text-red-600 font-medium">{errors.country}</span>}
                </motion.div>

                <motion.div whileHover={{ scale: 1.02 }} transition={{ type: "spring", stiffness: 300 }}>
                  <Label className="flex items-center space-x-2 text-gray-700">
                    <Clock className="w-5 h-5 text-green-500" />
                    <span>Estimated Harvest </span>
                  </Label>
                  <Input
                    type="number"
                    name="deliveryTime"
                    value={input.deliveryTime}
                    onChange={changeEventHandler}
                    placeholder="Enter your delivery time"
                    className="mt-1 border-gray-300 "
                  />
                  {errors && <span className="text-xs font-medium">{errors.deliveryTime}</span>}
                </motion.div>

                <motion.div whileHover={{ scale: 1.02 }} transition={{ type: "spring", stiffness: 300 }}>
                  <Label className="flex items-center space-x-2 text-gray-700">
                    <Wheat className="w-5 h-5 text-green-500" />
                    <span>Crop Kinds</span>
                  </Label>
                  <Input
                    type="text"
                    name="cuisines"
                    value={input.cuisines}
                    onChange={(e) => setInput({ ...input, cuisines: e.target.value.split(",") })}
                    placeholder="e.g. Tomato,Apple"
                    className="mt-1 border-gray-300 focus:border-orange-500 focus:ring-orange-500"
                  />
                  {errors && <span className="text-xs text-red-600 font-medium">{errors.cuisines}</span>}
                </motion.div>

                <motion.div whileHover={{ scale: 1.02 }} transition={{ type: "spring", stiffness: 300 }}>
                  <Label className="flex items-center space-x-2 text-gray-700">
                    <ImageIcon className="w-5 h-5 text-green-500" />
                    <span>Upload Farm/Product Image</span>
                  </Label>
                  <Input
                    onChange={(e) => setInput({ ...input, imageFile: e.target.files?.[0] || undefined })}
                    type="file"
                    accept="image/*"
                    name="imageFile"
                    className="mt-1 border-gray-300 focus:border-orange-500 focus:ring-orange-500"
                  />
                  {errors && (
                    <span className="text-xs text-red-600 font-medium">
                      {errors.imageFile?.name || "Image file is required"}
                    </span>
                  )}
                </motion.div>
              </div>

              <div className="mt-8 flex justify-center">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  {loading ? (
                    <Button disabled className=" bg-green-500 hover:bg-green-600  text-white px-8 py-3 rounded-full">
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Please Wait...
                    </Button>
                  ) : (
                    <Button className=" bg-green-500 hover:bg-green-600  text-white px-8 py-3 rounded-full">
                      {restaurant ? "Update Your Farm" : "Add Your Farm"}
                    </Button>
                  )}
                </motion.div>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default Restaurant

