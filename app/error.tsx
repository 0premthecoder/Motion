"use client"

import { ModeToggle } from "@/components/mode-toggle";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

const Error = () => {
    const router = useRouter()
    return ( <div className="h-full flex flex-col items-center justify-center space-y-4">
        
        <h1 className="font-bold text-9xl">404!</h1>
        <h1 className="font-bold text-9xl">X﹏X</h1>
        <p className="text-4xl">This Page is Not Available</p>
    <div className="w-full flex items-center justify-center space-x-4 h-[14vh]">
        <Button className="space-y-4" onClick={()=>router.back()} variant={"secondary"}>Go Back</Button>
        <ModeToggle/>
    </div>
    </div> );
}
 
export default Error;