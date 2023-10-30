"use client"

import { Spinner } from "@/components/spinner";


const MainLayout = ({ children }: {
    children: React.ReactNode
}) => {
    
    return (<div className="h-full flex dark:bg-[#1f1f1f]}">
        <main className="flex-1 h-full overflow-y-auto dark:bg-[#1f1f1f]">

            {children}
        </main>
    </div>);
}

export default MainLayout;