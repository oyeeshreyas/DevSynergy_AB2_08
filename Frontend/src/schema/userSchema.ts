import {z} from "zod";

export const userSignupSchema = z.object({
fullname:z.string().min(1,"Fullname is required"),
email:z.string().email("Invaild email address"),
password:z.string().min(8,"Password must be at least 8 characters"),
contact:z.string().min(10,"Contact number must be 10 digits")
});

export type SignInputState =z.infer<typeof userSignupSchema> ;  // infer the type of the schema

export const userLoginSchema = z.object({
    email:z.string().email("Invaild email address"),
    password:z.string().min(8,"Password Required"),
    });
    
    export type LoginInputState =z.infer<typeof userLoginSchema> ;  // infer the type of the schema