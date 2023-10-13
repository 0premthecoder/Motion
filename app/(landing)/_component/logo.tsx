"use client"

import Image from "next/image";
import { Poppins } from "next/font/google";
import { cn } from "@/lib/utils";

const font = Poppins(
    {
        subsets: ["latin-ext"],
        weight: ["400", "600"]
    }
)

export const Logo = () => {
    return (<div className="hidden md:flex items-center gap-x-2">
        <Image
            src={"/light/favicon.ico"}
            width={"20"}
            height={"20"}
            alt="Logo"
            className="dark:hidden"
        />

        <Image
            src={"/dark/favicon.ico"}
            width={"20"}
            height={"20"}
            alt="Logo"
            className="hidden dark:block"
        />

        <p className={cn(" font-semibold", font.className)}> Motion</p>
    </div>)
}