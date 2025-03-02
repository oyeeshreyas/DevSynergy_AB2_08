import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { SignInputState, userSignupSchema } from "@/schema/userSchema";
import { useUserStore } from "@/store/useUserStore";
import { Loader2, LockKeyhole, Mail, PhoneOutgoing, User } from "lucide-react";
import { ChangeEvent, FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";



const Signup = () => {
    const [input, setInput] = useState<SignInputState>({
        fullname: "",
        email: "",
        password: "",
        contact: "",
    });
    const [error, setError] = useState<Partial<SignInputState>>({});
    const {signup , loading} = useUserStore();
    const navigate = useNavigate();

    const changeEventHandler = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setInput({ ...input, [name]: value });
    }
    const loginSubmitHandler = async (e: FormEvent) => {
        e.preventDefault();
         // Prevent default form submission
         // form validation check start
         const result = userSignupSchema.safeParse(input);
         if (!result.success) {
            const fieldErrors = result.error.formErrors.fieldErrors;
            setError(fieldErrors as Partial<SignInputState>);
            return;
         }
         //login API Implementation start here here
         try {
            await signup(input);
            navigate("/verify-email");
         } catch (error) {
            console.log(error);
            
         }
       

    }
   

    return (
        <div className="flex items-center justify-center min-h-screen">
            <form onSubmit={loginSubmitHandler} className="md:p-8 w-full max-w-md rounded-lg md:border border-gray-200 mx-4">
                <div className="mb-9">
                    <h1 className="font-bold text-2xl">FarmDirect</h1>
                </div>
                <div className="mb-4">
                    <div className="relative">
                        <Input
                            type="text"
                            placeholder="Full Name"
                            name="fullname"
                            value={input.fullname}
                            onChange={changeEventHandler}
                            className="pl-10 focus-visible:ring-1"
                        />
                        <User className="absolute inset-y-2 left-2 text-gray-500 pointer-events-none" />
                        {error && <span className="test-xm text-red-500">{error.fullname}</span>}
                    </div>
                </div>
                <div className="mb-4">
                    <div className="relative">
                        <Input
                            type="email"
                            placeholder="Email"
                            name="email"
                            value={input.email}
                            onChange={changeEventHandler}
                            className="pl-10 focus-visible:ring-1"
                        />
                        <Mail className="absolute inset-y-2 left-2 text-gray-500 pointer-events-none" />
                        {error && <span className="test-xm text-red-500">{error.email}</span>}
                    </div>
                </div>
                <div className="mb-4">
                    <div className="relative">
                        <Input
                            type="password"
                            placeholder="Password"
                            name="password"
                            value={input.password}
                            onChange={changeEventHandler}
                            className="pl-10 focus-visible:ring-1"
                        />
                        <LockKeyhole className="absolute inset-y-2 left-2 text-gray-500 pointer-events-none" />
                        {error && <span className="test-xm text-red-500">{error.password}</span>}
                    </div>
                </div>
                <div className="mb-4">
                    <div className="relative">
                        <Input
                            type="text"
                            placeholder="Contact"
                            name="contact"
                            value={input.contact}
                            onChange={changeEventHandler}
                            className="pl-10 focus-visible:ring-1"
                        />

                        <PhoneOutgoing className="absolute inset-y-2 left-2 text-gray-500 pointer-events-none" />
                        {error && <span className="test-xm text-red-500">{error.contact}</span>}
                    </div>
                </div>
                <div className="mb-10">
                    {
                        loading ? <Button disabled className="w-full   bg-green-500 hover:bg-green-600 "><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please Wait</Button> : (
                            <Button type="submit" className="w-full   bg-green-500 hover:bg-green-600 ">Signup</Button>
                        )
                    }

                </div>
                <Separator />
                <p className="mt-4">
                    Already have an account?   {""}
                    <Link to="/login" className="text-blue-500">Login</Link>
                
                
                </p>

            </form>
        </div>
    );
};
export default Signup;