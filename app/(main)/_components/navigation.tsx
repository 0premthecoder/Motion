"use client"

import { cn } from "@/lib/utils";
import { ChevronLeftIcon, MenuIcon } from "lucide-react";
import { usePathname } from "next/navigation";
import { ElementRef, useRef, useState } from "react";
import { useMediaQuery } from "usehooks-ts";

const Navigation = () => {
    const pathName = usePathname()
    const isMobile = useMediaQuery("(max-width: 768px)")

    const isResizingRef = useRef(false)
    const sidebarRef = useRef<ElementRef<"aside">>(null)
    const navbarRef = useRef<ElementRef<"div">>(null)

    const [isResetting, setIsResetting] = useState(false)
    const [isCollapsed, setIsCollapsed] = useState(isMobile)

    const handleMouseDown = (event: React.MouseEvent<HTMLDivElement, MouseEvent>)=>{
        event.preventDefault()
        event.stopPropagation()

        isResizingRef.current = true
        document.addEventListener("mousemove", handleMouseMove)
        document.addEventListener("mouseup", handleMouseUp)
    }

    const handleMouseMove = (e:MouseEvent)=>{
        if(!isResizingRef.current)return;
        let newWidth = e.clientX
        if (newWidth > 480)  newWidth=480
        if(newWidth<240) newWidth = 240

        if(sidebarRef.current && navbarRef.current){
            sidebarRef.current.style.width = `${newWidth}px`
            navbarRef.current.style.setProperty("left",`${newWidth}px`)
            navbarRef.current.style.setProperty("width",`calc(100%-${newWidth}px)`)
        }
    }

    const handleMouseUp = ()=>{
        isResizingRef.current = false
        document.removeEventListener("mousemove", handleMouseMove)
        document.removeEventListener("mouseup", handleMouseUp)
        
    }

    const resetWidth=()=>{
        if (sidebarRef.current && navbarRef.current){
            setIsCollapsed(false)
            setIsResetting(true)

            sidebarRef.current.style.width = isMobile ? "100px": "240px"
            navbarRef.current.style.setProperty("width",isMobile ? "0" : "calc(100%-240px");

            navbarRef.current.style.setProperty("left", isMobile ? "100%" : "240px");
            setTimeout(()=>{
                setIsResetting(false)
            }, 300)
        }
    }

    const collapse = ()=>{
        if (sidebarRef.current && navbarRef.current){
            setIsCollapsed(true)
            setIsResetting(true)

            sidebarRef.current.style.width = "0"
            navbarRef.current.style.setProperty("width", "100%")
            navbarRef.current.style.setProperty("left", "0")
        }
    }


    return (<>
        <aside className={cn("group/sidebar h-full overflow-y-auto relative flex w-60 flex-col bg-secondary z-[99999]", isResetting && "transition-all ease-in-out duration-300", isMobile && "w-0")}
            ref={sidebarRef}
        >
            <div role="button" className={cn(" h-6 w-6 text-muted-foreground rounded-sm hover:bg-neutral-300 dark:hover:bg-neutral-600 absolute top-3 right-2 opacity-0 group-hover/sidebar:opacity-100 transition", isMobile && "opacity-100")}>
                <ChevronLeftIcon className="h-6 w-6" />
            </div>
            <div>
                <p>Actoin Items</p>
            </div>
            <div className=" mt-4">
                <p>Documets</p>
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
            <nav className=" bg-transparent px-3 py-4 w-full">
                {isCollapsed && <MenuIcon className="h-6 w-6 text-muted-foreground" role="button"/>}
            </nav>
        </div>
    </>);
}

export default Navigation;