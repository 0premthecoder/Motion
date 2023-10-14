"use client"

import { ChevronLeftIcon } from "lucide-react";
import { ElementRef, useRef, useState } from "react";
import { useMediaQuery } from "usehooks-ts";

const Navigation = () => {

    const isMobile = useMediaQuery("(max-width: 768px)")

    const isResizingRef = useRef(false)
    const sidebarRef = useRef<ElementRef<"aside">>(null)
    const navbarRef = useRef<ElementRef<"div">>(null)

    const [isResizing, setIsResizing] = useState(false)
    const [isCollapsed, setIsCollapsed] = useState(isMobile)


    return (<>
        <aside className="group/sidebar h-full overflow-y-auto relative flex w-60 flex-col bg-secondary z-[99999]"
        >
            <div role="button" className=" h-6 w-6 text-muted-foreground rounded-sm hover:bg-neutral-300 dark:hover:bg-neutral-600 absolute top-3 right-2 opacity-0 group-hover/sidebar:opacity-100 transition">
                <ChevronLeftIcon className="h-6 w-6"/>
            </div>
            <div>
                <p>Actoin Items</p>
            </div>
            <div className=" mt-4">
                <p>Documets</p>
            </div>
            <div className=" opacity-0 group-hover/sidebar:opacity-100 transition cursor-ew-resize absolute w-1 h-full bg-primary/10 right-0 top-0"/>
        </aside>
    </>);
}

export default Navigation;