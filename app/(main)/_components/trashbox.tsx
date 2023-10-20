"use client"

import { Spinner } from "@/components/spinner";
import { Input } from "@/components/ui/input";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useQuery, useMutation } from "convex/react";
import { Search, Trash, Trash2, Undo, Undo2 } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

const TrashBox = () => {
    const router = useRouter()
    const params = useParams()

    const documents = useQuery(api.document.getTrash)
    const restore = useMutation(api.document.restore)

    const remove = useMutation(api.document.remove)

    const [search, setSearch] = useState("")

    const filteredDocuments = documents?.filter((document) => {
        return document.title.toLowerCase().includes(search.toLowerCase())
    })

    const onClick = (documentId: string) => {
        router.push(`/documents/${documentId}`)

    }

    const onRestore = (
        event: React.MouseEvent<HTMLDivElement, MouseEvent>,
        documentId: Id<"documents">) => {
        event.stopPropagation()
        const promise = restore({ id: documentId })
        toast.promise(promise, {
            loading: "Restoring",
            error: "Failed",
            success: "Restored!"
        })
    }

    const onRemove = (documentId: Id<"documents">) => {
        const promise = remove({ id: documentId })
        toast.promise(promise, {
            loading: "Removing",
            error: "Failed",
            success: "Removed!"
        })

        if(params.documentId === documentId){
            router.push("/doucments")
        }
    }

    if(documents === undefined){
        return(
            <div className="h-full flex items-center justify-center p-4 "><Spinner size={"lg"}/></div>
        )
    }

    return (
        <div className="text-sm">
            <div className=" flex items-center gap-x-1 p-1">
                <Search className="h-4 w-4"/>
                <Input value={search} onChange={(e)=> setSearch(e.target.value)} className="h-7 px-2 focus-visible:ring-transparent " placeholder="Filter by page title..."/>
            </div>
            <div className="mt-2 px-1 pb-1">
                <p className="hidden last:block text-xs text-center text-muted-foreground pb-2">
                    No documents Found
                </p>
                {filteredDocuments?.map((document)=>(
                    <div
                    key={document._id}
                    role="button"
                    onClick={()=> onClick(document._id)}
                    className="text-sm rounded-sm w-full hover:bg-primary/5 flex items-center text-primary justify-between"
                    >
                        <span className="truncate pl-2">{document.title}</span>
                        <div className="flex items-center">
                            <div onClick={(e)=> onRestore(e, document._id)} role="button" 
                            className="rounded-sm hover:bg-neutral-200"
                            >
                                <Undo className="h-4 w-4 text-muted-foreground"/>
                            </div>
                            <div  className="rounded-sm hover:bg-neutral-200 p-2" role="button" onClick={()=>{onRemove(document._id)}}>
                                <Trash className="h-4 w-4 text-muted-foreground"/>
                            </div>

                        </div>
                    </div>
                ))}
            </div>
        </div>);
}

export default TrashBox;