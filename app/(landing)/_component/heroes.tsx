"use client"

import Image from "next/image";

export const Heroes=() =>{
    return(
        <div className="flex flex-col items-center justify-start max-w-5xl">
            <div className="flex items-center">
                <div className="relative w-[300px] h-[300px] sm:w-[350px] sm:h-[350px] md:w-[400px] md:h-[400px]">
                    <Image 
                    src={"/back.png"}
                    fill
                    alt="brain"
                    className=" object-contain"
                    />
                </div>
            
            </div>
            
        </div>
    )
}