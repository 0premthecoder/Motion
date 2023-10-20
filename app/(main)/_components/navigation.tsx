"use client"

import { cn } from "@/lib/utils";
import { ChevronLeftIcon, MenuIcon, Plus, PlusCircle, Search, Settings2, Trash2 } from "lucide-react";
import { usePathname } from "next/navigation";
import { ElementRef, useRef, useState, useEffect } from "react";
import { useMediaQuery } from "usehooks-ts";
import UserItem from "./userItem";
import { useMutation } from "convex/react"
import { api } from "@/convex/_generated/api";
import Item from "./item";
import { toast } from "sonner";
import DocumentList from "./documentList";
import { Popover, 
    PopoverTrigger,
    PopoverContent,
 } from "@radix-ui/react-popover";
import TrashBox from "./trashbox";

const Navigation = () => {
    const pathName = usePathname()
    const isMobile = useMediaQuery("(max-width: 768px)")
    // const documents = useQuery(api.document.get)
    const create = useMutation(api.document.create)
    
    

    const isResizingRef = useRef(false)
    const sidebarRef = useRef<ElementRef<"aside">>(null)
    const navbarRef = useRef<ElementRef<"div">>(null)

    const [isResetting, setIsResetting] = useState(false)
    const [isCollapsed, setIsCollapsed] = useState(isMobile)

    useEffect(() => {
      if(isMobile){
        collapse()
      }else{
        resetWidth()
      }
    }, [isMobile])

    useEffect(()=>{
        if(isMobile){
            collapse()
          }
    }, [isMobile, pathName])
    

    const handleMouseDown = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        event.preventDefault()
        event.stopPropagation()

        isResizingRef.current = true
        document.addEventListener("mousemove", handleMouseMove)
        document.addEventListener("mouseup", handleMouseUp)
    }

    const handleMouseMove = (e: MouseEvent) => {
        if (!isResizingRef.current) return;
        let newWidth = e.clientX
        if (newWidth > 480) newWidth = 480
        if (newWidth < 240) newWidth = 240

        if (sidebarRef.current && navbarRef.current) {
            sidebarRef.current.style.width = `${newWidth}px`
            navbarRef.current.style.setProperty("left", `${newWidth}px`)
            navbarRef.current.style.setProperty("width", `calc(100%-${newWidth}px)`)
        }
    }

    const handleMouseUp = () => {
        isResizingRef.current = false
        document.removeEventListener("mousemove", handleMouseMove)
        document.removeEventListener("mouseup", handleMouseUp)

    }

    const resetWidth = () => {
        if (sidebarRef.current && navbarRef.current) {
            setIsCollapsed(false)
            setIsResetting(true)

            sidebarRef.current.style.width = isMobile ? "100%" : "240px"
            navbarRef.current.style.setProperty("width", isMobile ? "0" : "calc(100%-240px");

            navbarRef.current.style.setProperty("left", isMobile ? "100%" : "240px");
            setTimeout(() => {
                setIsResetting(false)
            }, 300)
        }
    }

    const collapse = () => {
        if (sidebarRef.current && navbarRef.current) {
            setIsCollapsed(true)
            setIsResetting(true)

            sidebarRef.current.style.width = "0"
            navbarRef.current.style.setProperty("width", "100%")
            navbarRef.current.style.setProperty("left", "0")
            setTimeout(() => {
                setIsResetting(false)
            }, 300);
        }
    }

    const handleCreate = ()=>{
        const promise = create({ title: "Untitled"})
        toast.promise(promise,{
            loading: "Creating a new note...",
            success: "New note created!",
            error:"Failed to create a new note "
        })
    }


    return (<>
        <aside className={cn("group/sidebar h-full overflow-y-auto relative flex w-60 flex-col bg-secondary z-[99999]", isResetting && "transition-all ease-in-out duration-300", isMobile && "w-0")}
            ref={sidebarRef}
        >
            
            <div onClick={collapse} role="button" className={cn(" h-6 w-6 text-muted-foreground rounded-sm hover:bg-neutral-300 dark:hover:bg-neutral-600 absolute top-3 right-2 opacity-0 group-hover/sidebar:opacity-100 transition", isMobile && "opacity-100")}>
                <ChevronLeftIcon className="h-6 w-6" />
            </div>
            <div>
                <UserItem/>
                <Item label="Search" icon={Search} isSearch onClick={()=>{}}/>
                <Item label="Setting" icon={ Settings2}  onClick={()=>{}}/>
                <Item onClick={handleCreate} icon={PlusCircle} label="New Page" />
            </div>
            <div className="mt-4">
                <DocumentList/>
                <Item onClick={handleCreate} icon={Plus} label="Add a page"/>
                <Popover>
                    <PopoverTrigger className="w-full mt-4">
                        <Item label="trash" icon={Trash2}/>
                    </PopoverTrigger>
                    <PopoverContent side={isMobile ? "bottom" : "right"} className="p-0 w-72">
                        <TrashBox/>
                    </PopoverContent>
                </Popover>
            </div>
            <div className=" opacity-0 group-hover/sidebar:opacity-100 transition cursor-ew-resize absolute w-1 h-full bg-primary/10 right-0 top-0"
                onMouseDown={handleMouseDown}
                onClick={resetWidth}
            />
            
        </aside>
        <div
            ref={navbarRef}
            className={cn("absolute top-0 z-[99999] left-60 w-[calc(100%-240px)]", isResetting && "transition-all ease-in-out duration-300", isMobile && "left-0 w-full")}
        >
            <nav className=" bg-transparent px-3 py-4 w-full"  >
                {isCollapsed && <MenuIcon onClick={resetWidth} className="h-6 w-6 text-muted-foreground" role="button" />}
            </nav>
            
        </div>
    </>);
}

export default Navigation;