import { useState, useRef, type FormEvent,  } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Mail, Phone, MapPin, Globe, Camera, Loader2 } from "lucide-react"
import { motion } from "framer-motion"
import { useUserStore } from "@/store/useUserStore"

const Profile = () => {
  const {user,updateProfile} = useUserStore();
  const [profileData, setProfileData] = useState({
    name: user?.fullname || "",
    email: user?.email || "", 
    address: user?.address || "",
    phone:user?.contact || "",
    city: user?.city || "",
    country: user?.country || "",
    profilePicture: user?.profilePicture || "",
  });
  const [isLoading, setIsLoading] = useState(false)
  const imageRef = useRef<HTMLInputElement | null>(null)
  const [selectedProfilePicture, setSelectedProfilePicture] = useState<string>(profileData?.profilePicture || "");

  const fileChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = () => {
        const result = reader.result as string
        setSelectedProfilePicture(result)
        setProfileData((prevData) => ({
          ...prevData,
          profilePicture: result,
        }))
      }
      reader.readAsDataURL(file)
    }
  }

  const changeHandler = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setProfileData({ ...profileData, [event.target.name]: event.target.value })
  }

  const updateProfileHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      await updateProfile(profileData);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-4xl mx-auto my-10 p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-xl"
    >
      <form onSubmit={updateProfileHandler} className="space-y-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <Avatar className="w-24 h-24 relative">
              <AvatarImage src={selectedProfilePicture || undefined} />
              <AvatarFallback>{profileData.name.charAt(0)}</AvatarFallback>
              <input ref={imageRef} className="hidden" type="file" accept="image/*" onChange={fileChangeHandler} />
              <div
                onClick={() => imageRef.current?.click()}
                className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300 bg-black bg-opacity-50 rounded-full cursor-pointer"
              >
                <Camera className="text-white w-8 h-8" />
              </div>
            </Avatar>
            <div>
              <Input
                type="text"
                name="name"
                value={profileData.name}
                onChange={changeHandler}
                className="text-2xl font-bold border-none focus:ring-0 p-0 bg-transparent"
              />
              <p className="text-sm text-gray-500 dark:text-gray-400">{profileData.email}</p>
            </div>
          </div>
          <Button type="submit" className="w-full md:w-auto" disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Updating...
              </>
            ) : (
              "Save Changes"
            )}
          </Button>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <div className="flex items-center gap-2 bg-gray-100 dark:bg-gray-700 p-2 rounded-md">
              <Mail className="text-gray-500 dark:text-gray-400" />
              <Input
              disabled
                id="email"
                name="email"
                value={profileData.email}
                onChange={changeHandler}
                className="border-none bg-transparent focus:ring-0"
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone">Phone</Label>
            <div className="flex items-center gap-2 bg-gray-100 dark:bg-gray-700 p-2 rounded-md">
              <Phone className="text-gray-500 dark:text-gray-400" />
              <Input
                id="phone"
                name="phone"
                value={profileData.phone}
                onChange={changeHandler}
                className="border-none bg-transparent focus:ring-0"
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="address">Address</Label>
            <div className="flex items-center gap-2 bg-gray-100 dark:bg-gray-700 p-2 rounded-md">
              <MapPin className="text-gray-500 dark:text-gray-400" />
              <Input
                id="address"
                name="address"
                value={profileData.address}
                onChange={changeHandler}
                className="border-none bg-transparent focus:ring-0"
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="city">City</Label>
            <div className="flex items-center gap-2 bg-gray-100 dark:bg-gray-700 p-2 rounded-md">
              <MapPin className="text-gray-500 dark:text-gray-400" />
              <Input
                id="city"
                name="city"
                value={profileData.city}
                onChange={changeHandler}
                className="border-none bg-transparent focus:ring-0"
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="country">Country</Label>
            <div className="flex items-center gap-2 bg-gray-100 dark:bg-gray-700 p-2 rounded-md">
              <Globe className="text-gray-500 dark:text-gray-400" />
              <Input
                id="country"
                name="country"
                value={profileData.country}
                onChange={changeHandler}
                className="border-none bg-transparent focus:ring-0"
              />
            </div>
          </div>
        </div>

        
      </form>
    </motion.div>
  )
}

export default Profile

