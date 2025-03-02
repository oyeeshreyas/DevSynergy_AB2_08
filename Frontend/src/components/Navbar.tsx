import { Link } from "react-router-dom";
import { Menubar, MenubarContent, MenubarTrigger } from "./ui/menubar";
import { MenubarItem, MenubarMenu } from "@radix-ui/react-menubar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu";
import { Button } from "./ui/button";
import { HandPlatter, Leaf, Loader2, Menu, Moon, PackageCheck, ShoppingBag, ShoppingCart, SquareMenu, Sun, User, UtensilsCrossed } from "lucide-react";
import { Avatar } from "@radix-ui/react-avatar";
import { AvatarFallback, AvatarImage } from "./ui/avatar";
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "./ui/sheet";
import { useUserStore } from "@/store/useUserStore";
import { useCartStore } from "@/store/useCartStore";
import { useThemeStore } from "@/store/useThemeStore";

const Navbar = () => {
    const { user, loading, logout } = useUserStore();
    const { cart } = useCartStore();
    const {setTheme,}= useThemeStore();
    return (
        <div className="max-w-7xl mx-auto">
            <div className="flex justify-between items-center h-14 px-4 md:px-8">
                {/* Left - FarmDirect */}
                <div className="absolute top-0 left-0 p-4 z-50 max-w-7xl mx-auto">
                <Link to="/" className="flex items-center space-x-2">
  <Leaf className="w-8 h-8 text-green-400" /> {/* Adjust size if needed */}
  <h1 className="font-bold md:font-extrabold text-3xl text-white hover:text-green-400">
    FarmDirect
  </h1>
</Link>
                </div>

                {/* Right - Navigation Links */}
                <div className="absolute top-0 right-0 p-4 flex items-center gap-6 hidden md:flex  z-50 max-w-7xl mx-auto">
                    <Link to="/" className="hover:underline text-white font-bold hover:text-green-400 ">Home</Link>
                    <Link to="/profile" className="hover:underline text-white font-bold hover:text-green-400">Profile</Link>
                    <Link to="/order/status" className="hover:underline text-white font-bold hover:text-green-400">Order</Link>
                    {
                        user?.admin && (
                            <Menubar>
                                <MenubarMenu>
                                    <MenubarTrigger className="bg-transparent text-black hover:bg-green-500">
                                        Dashboard
                                    </MenubarTrigger>
                                    <MenubarContent className="text-sm text-font-2" >
                                        <Link to="/admin/restaurant">
                                            <MenubarItem className=" hover:text-green-500">Farm</MenubarItem>
                                        </Link>
                                        <Link to="/admin/menu">
                                            <MenubarItem className=" hover:text-green-500">Product</MenubarItem>
                                        </Link>
                                        <Link to="/admin/orders">
                                            <MenubarItem className=" hover:text-green-500">Order</MenubarItem>
                                        </Link>
                                    </MenubarContent>
                                </MenubarMenu>

                            </Menubar>
                        )
                    }
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline" size="icon">
                                <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                                <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                                <span className="sr-only">Toggle theme</span>
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={()=> setTheme('light')}>
                                Light
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={()=> setTheme('dark')}>
                                Dark
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                    <Link to="/cart" className="relative cursor-pointer text-white rounded-full">
                        <ShoppingBag className=" text-white" />

                        {cart.length > 0 && (
                            <Button
                                className="absolute top-0 right-0 -mt-4 ml-2 flex items-center justify-center rounded-full bg-green-500 h-5 w-5 text-xs text-white"

                            >

                                {cart.length}
                            </Button>
                        )
                        }

                    </Link>
                    <Avatar className="h-9 w-9">
                        <AvatarImage src={user?.profilePicture} alt="profilephoto" className="rounded-full"/>
                        <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                    {
                        loading ? (
                            <Button className="bg-red hover:hoverOrange">
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Please wait...
                            </Button>
                        ) : (
                            <Button onClick={logout} className="bg-[#4CAF50]">Logout
                            </Button>
                        )
                    }

                </div>
                <div className="md:hidden lg:hidden absolute top-0 right-0 p-4 flex items-center gap-6">
                    <MobileNavbar />
                </div>
            </div>
        </div>
    );
};

export default Navbar;

const MobileNavbar = () => {
    const { user, logout, } = useUserStore();
    const {setTheme,}= useThemeStore();
    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button
                    size={'icon'}
                    className="rounded-full bg-gray-200 text-black hover:bg-gray-200 z-50"
                    variant="outline"
                >
                    <Menu size={'18'} />
                </Button>
            </SheetTrigger>
            <SheetContent className="flex flex-col justify-between h-full">
                {/* Header Section */}
                <SheetHeader className="flex flex-row items-center justify-between mt-2">
                    <SheetTitle className="text-lg font-bold text-2xl">FarmDirect</SheetTitle>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline" size="icon">
                                <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                                <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                                <span className="sr-only">Toggle theme</span>
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={()=> setTheme('light')}>Light</DropdownMenuItem>
                            <DropdownMenuItem onClick={()=> setTheme('dark')}>Dark</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </SheetHeader>
                <div className="border-b border-gray-300 my-2"></div>

                {/* Navigation Links */}

                <SheetDescription className="flex-1">
                    <Link
                        to="/profile"
                        className="flex items-center gap-4 hover:bg-gray-200 px-3 py-2 rounded-lg cursor-pointer hover:text-gray-900 font-medium"
                    >
                        <User />
                        <span>Profile</span>
                    </Link>
                    <Link
                        to="/order/status"
                        className="flex items-center gap-4 hover:bg-gray-200 px-3 py-2 rounded-lg cursor-pointer hover:text-gray-900 font-medium"
                    >
                        <HandPlatter />
                        <span>Order</span>
                    </Link>
                    <Link
                        to="/cart"
                        className="flex items-center gap-4 hover:bg-gray-200 px-3 py-2 rounded-lg cursor-pointer hover:text-gray-900 font-medium"
                    >
                        <ShoppingCart />
                        <span>Cart (0)</span>
                    </Link>
                    {
                        user?.admin && (
                            <><Link
                                to="/admin/restaurant"
                                className="flex items-center gap-4 hover:bg-gray-200 px-3 py-2 rounded-lg cursor-pointer hover:text-gray-900 font-medium"
                            >
                                <UtensilsCrossed />
                                <span>Restaurant</span>
                            </Link>
                                <Link
                                    to="/admin/menu"
                                    className="flex items-center gap-4 hover:bg-gray-200 px-3 py-2 rounded-lg cursor-pointer hover:text-gray-900 font-medium"
                                >
                                    <SquareMenu />
                                    <span>Menu</span>
                                </Link>
                                <Link
                                    to="/admin/orders"
                                    className="flex items-center gap-4 hover:bg-gray-200 px-3 py-2 rounded-lg cursor-pointer hover:text-gray-900 font-medium"
                                >
                                    <PackageCheck />
                                    <span>Restaurant Orders</span>
                                </Link></>
                        )
                    }

                </SheetDescription>


                {/* Footer Section */}
                <SheetFooter className="flex flex-col items-center gap-4 mb-4">
                    <div className="flex items-center gap-2">
                        <Avatar className="h-10 w-10">
                            <AvatarImage src={user?.profilePicture} alt="profilephoto" className="rounded-full" />
                            <AvatarFallback>CN</AvatarFallback>
                        </Avatar>
                        <h1 className="font-bold text-base">Dev Synergy</h1>
                    </div>
                    <SheetClose asChild>
                        <Button onClick={logout} type="submit" className="bg-green-500 hover:bg-green-600 w-full">
                            Logout
                        </Button>
                    </SheetClose>
                </SheetFooter>
            </SheetContent>
        </Sheet>
    );
};