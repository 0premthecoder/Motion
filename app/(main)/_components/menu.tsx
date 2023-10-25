import { Id } from "@/convex/_generated/dataModel";
import {
    DropdownMenu,
    DropdownMenuSeparator,
    DropdownMenuContent,
    DropdownMenuTrigger,
    DropdownMenuItem,
    DropdownMenuLabel
} from "@/components/ui/dropdown-menu";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/clerk-react";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { MoreHorizontalIcon, Trash } from "lucide-react";

interface MenuProps {
    documentId: Id<"documents">
}

const Menu = ({documentId}:MenuProps) => {

    const router = useRouter()
    const user = useUser()
    
    const archive = useMutation(api.document.archive)
    const onArchive = ()=>{
        const promise = archive({id: documentId})

        toast.promise(promise,{
            loading:"Moving to trash...",
            error:"Unable to Move",
            success:"Check your trash"
        })

        router.push("/documents")
    }

    return ( 

        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button size={"sm"} variant={"ghost"}>
                    <MoreHorizontalIcon className="h-4 w-4"/>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-60" align="end" alignOffset={8} forceMount>
                <DropdownMenuItem onClick={onArchive}><Trash className="h-4 w-4"/> Delete</DropdownMenuItem>
                <DropdownMenuSeparator/>
                <div className="text-xs text-muted-foreground">
                    Last Edited by : {user.user?.fullName}
                </div>
            </DropdownMenuContent>
        </DropdownMenu>
    
        );
}
 
export default Menu;