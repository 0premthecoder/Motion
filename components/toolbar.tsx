"use client"

import { Doc } from "@/convex/_generated/dataModel";

interface toolbarProps {
    initialData: Doc<"documents">
    preview?: boolean

}

const Toolbar = ({ initialData, preview }: toolbarProps) => {
    return (<div className="pl-[54px] gropu relative"> {!!initialData && !preview && 
    <div className="flex items-center gap-x-2 group/icon pt-6">
        
    </div>}</div>);
}

export default Toolbar;