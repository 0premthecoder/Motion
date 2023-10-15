"use client"

import { Id } from "@/convex/_generated/dataModel"
import { LucideIcon } from "lucide-react"

interface ItemProps {
    id?: Id<"documents">
    documentIcon?: string
    active?: boolean
    expanded?: boolean
    isSearch?: boolean
    level?: number
    onExpand?: () => void

    label: string
    onClick: () => void
    icon: LucideIcon
}

const Item = ({ id,
    documentIcon,
    active,
    expanded,
    isSearch,
    level = 0,
    onExpand,
    label,
    onClick,
    icon:
    Icon }: ItemProps) => {

    return (
        <div onClick={onClick} role="button" style={{ paddingLeft: "12px" }} className="group min-h-[27px] text-sm py-1 pr-1 w-full hover:bg-primary/5 flex items-center text-muted-foreground font-medium">
            <Icon className="shrink-0 h-[18px] mr-2 text-muted-foreground" />
            <span>  {label} </span>

        </div>);
}

export default Item;