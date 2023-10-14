"use client"

import Image from "next/image";
import { SignOutButton, UserButton, useUser } from "@clerk/clerk-react";
import { Button } from "@/components/ui/button";
import { PlusSquareIcon } from "lucide-react";
import { useMutation } from "convex/react"
import { api } from "@/convex/_generated/api";

const DocumentsPage = () => {

    const { user } = useUser()
    const create = useMutation(api.documet.create)
    
    const 

    return ( <div className="h-full flex flex-col items-center justify-center space-y-4">
        <Image 
            src={"/write-light.png"}
            height={300}
            width={300}
            alt="brain"
            className="dark:hidden"
        />
        <Image 
            src={"/write-dark.png"}
            height={300}
            width={300}
            alt="brain"
            className="hidden dark:block"
            />
        <h2 className="text-lg font-medium">
            Welcome to {user?.firstName}&apos; Motion
        </h2>
        <Button>
            Create New Note
            <PlusSquareIcon className="h-4 w-4 ml-2"/>
        </Button>

    </div> );
}
 
export default DocumentsPage;