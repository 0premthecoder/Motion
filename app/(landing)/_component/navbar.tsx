"use client"

import { UseScrollTop } from "@/hooks/use-scroll-top";
import { cn } from "@/lib/utils";
import { Logo } from "./logo";
import { ModeToggle } from "@/components/mode-toggle";
import { useConvexAuth } from "convex/react"
import {SignInButton} from "@clerk/clerk-react"
import { Button } from "@/components/ui/button";

const Navbar = () => {
    const {isAuthenticated, isLoading}  = useConvexAuth()
    const scrolled = UseScrollTop()
    return ( <div className={cn("z-50 bg-background dark:bg-[#1F1F1F] fixed top-0 flex items-center w-full p-6", scrolled && " border-b shadow-sm")}>
        <Logo/>
        <div className="md:ml-auto md:justify-end justify-between w-full flex items-center gap-x-2">
            {isLoading && (<p> is loading </p>)}
            {!isAuthenticated && !isLoading && (<>
                <SignInButton mode="modal">
                    <Button variant={"link"}>
                        Sign In
                    </Button>
                </SignInButton>
                <SignInButton mode="modal">
                    <Button >
                        Get for Free
                    </Button>
                </SignInButton>
            </>)}
            <ModeToggle/> </div>
        
    </div> );
}
 
export default Navbar;