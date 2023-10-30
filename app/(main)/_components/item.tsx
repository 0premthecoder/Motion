"use client"

import { Skeleton } from "@/components/ui/skeleton"
import { api } from "@/convex/_generated/api"
import { Id } from "@/convex/_generated/dataModel"
import { cn } from "@/lib/utils"
import { useMutation } from "convex/react"
import { ChevronDown, ChevronRight, LucideIcon, MoreHorizontal, Plus, Trash } from "lucide-react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import {
    DropdownMenu,
    DropdownMenuSeparator,
    DropdownMenuContent,
    DropdownMenuTrigger,
    DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { useUser } from "@clerk/clerk-react"

interface ItemProps {
    id?: Id<"documents">
    documentIcon?: string
    active?: boolean
    expanded?: boolean
    isSearch?: boolean
    level?: number
    onExpand?: () => void

    label: string
    onClick?: () => void
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

    const {user} = useUser()

    const ChevronIcon = expanded ? ChevronDown : ChevronRight
    const router = useRouter()
    const create = useMutation(api.document.create)
    const archive = useMutation(api.document.archive)

    const handleExpand = (
        event: React.MouseEvent<HTMLDivElement, MouseEvent>
    ) => {
        event.stopPropagation()
        onExpand?.()
    }

    const onCreate = (
        event: React.MouseEvent<HTMLDivElement, MouseEvent>
    ) => {
        event.stopPropagation()
        if (!id) return
        const promise = create({ title: "untitled", parentDocument: id })
            .then((documentId) => {
                if (!expanded) {
                    onExpand?.()
                }
                router.push(`/documents/${documentId}`)
            })

        toast.promise(promise, {
            loading: "Creating...",
            success: "New Note created",
            error: "Failed to Create"
        })

    }

    const onArchived = ( event: React.MouseEvent<HTMLDivElement, MouseEvent>
        ) => {
            event.stopPropagation()
            if (!id) return
            const promise = archive({id})
                .then((documentId)=>router.push(`documents/${documentId}`))
            toast.promise(promise,{
                loading:"Moving to trash...",
                error:"Unable to Move",
                success:"Check your trash"
            })
        }

    return (
        <div
            onClick={onClick}
            role="button"
            style={{
                paddingLeft: level ? `${(level * 12) + 12}px` : "12px"
            }}
            className={cn("group min-h-[27px] text-sm py-1 pr-1 w-full hover:bg-primary/5 flex items-center text-muted-foreground font-medium",
                active && "bg-primary/5 text-primary")}>

            {!!id && (
                <div role="button" className="h-full rounded-sm hover:bg-neutral-300 dark:hover:bg-neutral-600 mr-1" onClick={handleExpand}>
                    <ChevronIcon className="h-4 w-4 shrink-0 text-muted-foreground/50" />
                </div>
            )}

            {documentIcon ? (
                <div className="shrink-0 mr-2 text-[18px]">
                    {documentIcon}
                </div>
            ) : (
                <><Icon className="shrink-0 h-[18px] w-[18px] mr-2 text-muted-foreground" /></>)
            }
            <span>  {label} </span>

            {isSearch && (
                <kbd className=" ml-auto pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
                    <span className=" text-xs ">
                        &#8984;
                    </span>K
                </kbd>
            )}
            {!!id && (
                <div className="ml-auto flex items-center gap-x-2">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild onClick={(e)=>e.stopPropagation()}>
                            <div role="button" className="opacity-0 group-hover:opacity-100 h-full ml-auto rounded-sm hover:bg-neutral-300 dark:hover:bg-neutral-600"
                            >
                                <MoreHorizontal className="h-4 w-4 text-muted-foreground"/>
                            </div>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-60" align="start" side="right" forceMount>
                            <DropdownMenuItem onClick={onArchived}>
                                <Trash className="h-4 w-4 mr-2"/>
                                Delete
                            </DropdownMenuItem>
                            <DropdownMenuSeparator/>
                            <div className="text-xs p-2 text-muted-foreground">last edited by: {user?.fullName}</div>
                        </DropdownMenuContent>
                    </DropdownMenu>
                    <div
                        role="button"
                        onClick={onCreate}
                        className="opacity-0 group-hover:opacity-100 h-full ml-auto rounded-sm hover:bg-neutral-300 dark:hover:bg-neutral-600">
                        <Plus className="h-4 w-4 text-muted-foreground" />
                    </div>
                </div>
            )}

        </div>);
}

export default Item;

Item.Skeleton = function ItemSkeleton({ level }: { level?: number }) {
    return (
        <div style={{
            paddingLeft: level ? `${(level * 12) + 25}px` : '12px'
        }}
            className="flex gap-x-2 py-[3px]"
        >
            <Skeleton className="h-4 w-4 " />
            <Skeleton className="h-4 w-[30%] " />
        </div>
    )
}