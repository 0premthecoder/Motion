"use client"

import Image from "next/image";
import {  useUser } from "@clerk/clerk-react";
import { Button } from "@/components/ui/button";
import { PlusSquareIcon } from "lucide-react";
import { toast } from "sonner";

import { useMutation } from "convex/react"
import { api } from "@/convex/_generated/api";
import { useRouter } from "next/navigation";


const DocumentsPage = () => {
    const { user } = useUser()
    const create = useMutation(api.document.create)
    const router = useRouter()

    const onCreate = ()=>{
        const promise = create({ title: "Untitled"})
            .then((documentId)=>router.push(`/documents/${documentId}`))
            
        toast.promise(promise,{
            loading: "Creating a new note...",
            success: "New note created!",
            error:"Failed to create a new note "
        })
    }
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
            Welcome to {user?.firstName}&apos;s Motion
        </h2>
        <Button onClick={onCreate}>
            Create New Note
            <PlusSquareIcon className="h-4 w-4 ml-2"/>
        </Button>

    </div> );
}
 
export default DocumentsPage;