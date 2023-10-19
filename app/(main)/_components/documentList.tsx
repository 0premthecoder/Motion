"use client"

import { Doc, Id } from "@/convex/_generated/dataModel";
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

    const onExpand

    return ( <div className="">
        
    </div> );
}
 
export default DocumentList;