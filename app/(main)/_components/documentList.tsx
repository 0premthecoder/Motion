"use client"

import { api } from "@/convex/_generated/api";
import { Doc, Id } from "@/convex/_generated/dataModel";
import { useQuery } from "convex/react";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";

interface DocumentListProps{
    parentDocumentId?: Id<"documents">
    level?:Number
    data?:Doc<"documents">[]

}

const DocumentList = ({
    parentDocumentId,
    level = 0,

}: DocumentListProps) => {
    const params = useParams()
    const router = useRouter()
    const [expand, setExpand] = useState<Record<string,boolean>>({})

    const onExpand = (documentId: string) =>{
        setExpand(prevExpanded=>({
            ...prevExpanded,
            [documentId]:  !prevExpanded[documentId]

        }))
    }

    const documents = useQuery(api.document.getSidebar,{
        parenDocument: parentDocumentId
    })

    const onReDirect = (documentId: string)=>{
        router.push(`/documests/${documentId}`)
    }

    return ( <div className="">
        
    </div> );
}
 
export default DocumentList;