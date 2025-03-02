import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input"
import {  Loader2, LockKeyhole } from "lucide-react";
import { useState } from "react"
import { NavLink } from "react-router-dom";

const ResetPassword = () => {
    const [newPassword , setNewPassword] = useState<string>("");
    const loading = false;

    return (
        <div className="flex items-center justify-center min-h-screen w-full">
            <form className="flex flex-col gap-5 md:p-8 w-full max-w-md rounded-lg">
                <div className="text-center">
                    <h1 className="font-extrabold text-2xl mb-2">Reset Password</h1>
                    <p className="text-gray-500">Enter your new password</p>
                    

                </div>
                <div className="relative w-full">
                    <Input
                    type="password"
                    value={newPassword}
                    onChange={(e)=> setNewPassword(e.target.value) }
                    placeholder="New Password"
                    className="pl-10"
                    />
                    <LockKeyhole className="absolute inset-y-2 left-2 text-gray-600 pointer-events-none"/>
                </div>
                {
                    loading ? (
                        <Button disabled className="bg-orange hover:bg-Orange"><Loader2 className="mr-2 h-4 w-4 animate-spin" />Please wait...</Button>
                    ) : (
                        <Button className="bg-orange hover:bg-Orange">Reset</Button>
                    )
                }
                <span>
                    Back to{" "}
                    <NavLink to="/login" className="text-blue-500">Login</NavLink>
                </span>
           
            </form>
        </div>
    )
}

export default ResetPassword;