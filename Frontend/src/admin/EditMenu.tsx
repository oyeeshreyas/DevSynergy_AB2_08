import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { MenuFormSchema, menuSchema } from "@/schema/menuSchema";
import { useMenuStore } from "@/store/useMenuStore";
import { MenuItem } from "@/types/restaurantType";
import { Loader2 } from "lucide-react";
import { Dispatch, FormEvent, SetStateAction, useEffect, useState } from "react"


const EditMenu = ({selectedMenu , editOpen, setEditOpen}:{selectedMenu:MenuItem, editOpen:boolean, setEditOpen:Dispatch<SetStateAction<boolean>>}) => {
    const [input , setInput] = useState<MenuFormSchema>({
            name:"",
            description:"",
            price:0,
            image:undefined
        });
        const [,setError] = useState<Partial<MenuFormSchema>>({});
        
        const {loading, editMenu} = useMenuStore();
        const changeEventHandler = (e: React.ChangeEvent<HTMLInputElement>)=> {
            const {name , value , type} = e.target;
            setInput({...input , [name]: type == 'number' ? Number(value):value})
        };
    

    const submitHandler = async (e:FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const result = menuSchema.safeParse(input);
               if(!result.success){
                   const fieldErrors = result.error.formErrors.fieldErrors;
                   setError(fieldErrors as Partial<MenuFormSchema>);
                   return;
               }
               
        //API 
        try {
            const formData = new FormData();
            formData.append("name", input.name);
            formData.append("description", input.description);
            formData.append("price", input.price.toString());
            if(input.image){
              formData.append("image", input.image);
            }
            await editMenu(selectedMenu._id, formData);
          } catch (error) {
            console.log(error);
          }
    }

    useEffect(() => {
        setInput({
            name:selectedMenu?.name || "",
            description:selectedMenu?.description || "",
            price:selectedMenu?.price || 0,
            image:undefined
        })
    },[selectedMenu]);
    return (
        <Dialog open={editOpen} onOpenChange={setEditOpen}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Edit Menu</DialogTitle>
                    <DialogDescription>
                        Update your menu to keep your offering freash and exciting!
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={submitHandler}>
                            <div>
                                <Label>Name</Label>
                                <Input
                                type="text"
                                name="name"
                                value={input.name}
                                onChange={changeEventHandler}
                                placeholder="Enter Menu Name"
                                />
                            </div>
                            <div>
                                <Label>Description</Label>
                                <Input
                                type="text"
                                name="description"
                                value={input.description}
                                onChange={changeEventHandler}
                                placeholder="Enter Menu Description"
                                />
                            </div>
                            <div>
                                <Label>Price(₹)</Label>
                                <Input
                                type="number"
                                name="price"
                                value={input.price}
                                onChange={changeEventHandler}
                                placeholder="Enter Menu Price"
                                />
                            </div>
                            <div>
                                <Label>Upload Menu Image</Label>
                                <Input
                                type="file"
                                name="image"
                                onChange={(e) => setInput({...input, image:e.target.files?.[0] || undefined})}
                                />
                            </div>
                            <DialogFooter className="mt-5">
                                {
                                    loading ? (
                                        <Button disabled className=" bg-green-500 hover:bg-green-600 ">Sumbit
                                            <Loader2 className="mr-2 w-4 h-4 animate-spin"/>
                                            Please wait
                                            </Button>
                                    ) : (
                                        <Button className=" bg-green-500 hover:bg-green-600 ">Sumbit</Button>
                                    )
                                }
                                
                            </DialogFooter>
                        </form>
            </DialogContent>

        </Dialog>
    )
}

export default EditMenu