"use client"

import { Id } from "@/convex/_generated/dataModel";

interface BannerProps {
    documentId: Id<"documents">
}

const Banner = ({documentId}:BannerProps) => {
    return ( <div>banner {documentId}</div> );
}
 
export default Banner;