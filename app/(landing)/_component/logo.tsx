import Image from "next/image";
import { Puppies_Play } from "next/font/google";
import { cn } from "@/lib/utils";

const font = Puppies_Play(
    {
        subsets: ["vietnamese"],
        weight: ["400", "400"]
    }
)

export const Logo = () => {
    return (<div className="hidden md:flex items-center gap-x-2">
        <Image
            src={"/dark/favicon.ico"}
            width={"20"}
            height={"20"}
            alt="Logo" />

        <p className={cn(" font-semibold", font.className)}> Motion</p>
    </div>)
}