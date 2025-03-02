
import { Dispatch, FormEvent,  SetStateAction,  useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogTitle } from "./ui/dialog"
import { Label } from "./ui/label"
import { Input } from "./ui/input"
import { Button } from "./ui/button"
import { useUserStore } from "@/store/useUserStore"
import { CheckoutSessionRequest } from "@/types/orderType"
import { useCartStore } from "@/store/useCartStore"
import { useRestaurantStore } from "@/store/useRestaurantStore"
import { useOrderStore } from "@/store/useOrderStore"
import { Loader2 } from "lucide-react"

const CheckoutConfirmPage = ({
    open,
    setOpen,
  }: {
    open: boolean;
    setOpen: Dispatch<SetStateAction<boolean>>;
  }) => {
    const { user } = useUserStore();
    const [input, setInput] = useState({
      name: user?.fullname || "",
      email: user?.email || "",
      contact: user?.contact.toString() || "",
      address: user?.address || "",
      city: user?.city || "",
      country: user?.country || "",
    });
    const { cart } = useCartStore();
    const { restaurant } = useRestaurantStore();
    const { createCheckoutSession, loading } = useOrderStore();
    const changeEventHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setInput({ ...input, [name]: value });
    };
    const checkoutHandler = async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      // api implementation start from here
      try {
        const checkoutData: CheckoutSessionRequest = {
          cartItems: cart.map((cartItem) => ({
            menuId: cartItem._id,
            name: cartItem.name,
            image: cartItem.image,
            price: cartItem.price.toString(),
            quantity: cartItem.quantity.toString(),
          })),
          deliveryDetails: input,
          restaurantId: restaurant?._id as string,
        };
        await createCheckoutSession(checkoutData);
      } catch (error) {
        console.log(error);
      }
    };
    return ( 
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent>
                <DialogTitle className="font-bold">Review Your Order</DialogTitle>
                <DialogDescription>Double check your order delivery details and ensure everything in order. When you are ready. hit confrim button to finalize your order</DialogDescription>
                <form onSubmit={checkoutHandler} className="md:grid grid-cols-2 gap-2 space-y-1 md::space-y-0">
                    <div>
                        <Label>Name</Label>
                        <Input 
                    
                        type="text"
                        name="name"
                        value={input.name}
                        onChange={changeEventHandler}
                        />
                    </div>
                    <div>
                        <Label>Email</Label>
                        <Input 
                        disabled
                        type="email"
                        name="email"
                        value={input.email}
                        onChange={changeEventHandler}
                        />
                    </div>
                    <div>
                        <Label>Contact</Label>
                        <Input 
                    
                        type="text"
                        name="contact"
                        value={input.contact}
                        onChange={changeEventHandler}
                        />
                    </div>
                    <div>
                        <Label>Address</Label>
                        <Input 
                    
                        type="text"
                        name="address"
                        value={input.address}
                        onChange={changeEventHandler}
                        />
                    </div>
                    <DialogFooter className="col-span-2 pt-5">
                        {
                            loading ? (
                                <Button disabled className="  bg-green-500 hover:bg-green-600 ">
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin"/>
                                    Please Wait...</Button>
                            ): (
                                <Button className="  bg-green-500 hover:bg-green-600 ">
                                Continue To Payment
                              </Button>
                            )
                        }
                
            </DialogFooter>

                </form>
            </DialogContent>
            
        </Dialog>
    
       
    )
}

export default CheckoutConfirmPage