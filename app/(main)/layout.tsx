"use client"

import { useConvexAuth } from "convex/react";

const MainLayout = ({children}:{
    children: React.ReactNode
}) => {
    const {isLoading, isAuthenticated} = useConvexAuth()
    return ( <>{children}</> );
}
 
export default MainLayout;