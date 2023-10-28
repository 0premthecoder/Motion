"use client"

import { Doc } from "@/convex/_generated/dataModel";
import { IconPicker } from "./icon-picker";
import { Button } from "./ui/button";
import { ImageIcon, SmileIcon, X } from "lucide-react";

interface toolbarProps {
    initialData: Doc<"documents">
    preview?: boolean

}

const Toolbar = ({ initialData, preview }: toolbarProps) => {
    return (<div className="pl-[54px] gropu relative"> {!!initialData && !preview &&
        <div className="flex items-center gap-x-2 group/icon pt-6">
            <IconPicker onChange={() => { }}>
                <p className="text-6xl hover:opacity-75 transition"
                >{initialData.icon}</p>
            </IconPicker>
            <Button onClick={() => { }} className="rouded-full opacity-0 group-hover/icon:opacity-100 transition text-muted-foreground text-xs" variant={"outline"} size="icon">
                <X className="h-4 w-4" />

            </Button>
        </div>}
        {!!initialData.icon && preview && (
            <p className="text-6xl pt-6">
                {initialData.icon}
            </p>
        )}

        <div className=" opacity-0 hover:opacity-100 group-hover:opacity-100 flex items-center gap-x-1 py-4">
        {!!initialData && !preview &&
            <IconPicker asChild onChange={()=>{}}>
                <Button className=" text-muted-foreground text-xs" variant={"outline"} size={"sm"}>
                    <SmileIcon className="h-4 w-4 mr-2"/>
                    Add Icon
                </Button>
            </IconPicker>
        }
        {!initialData.coverImage && !preview && (
            <Button className="text-muted-foreground text-xs">
                <ImageIcon className="h-4 m-4 mr-2"/>
            </Button>
        )}

        </div>

    </div>);

}

export default Toolbar;