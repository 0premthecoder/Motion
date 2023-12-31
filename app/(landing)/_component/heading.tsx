"use client";

import { Button } from "@/components/ui/button";
import { ArrowRightCircle } from "lucide-react";
import { useConvexAuth } from "convex/react"
import { Spinner } from "@/components/spinner";
import Link from "next/link";
import { SignInButton } from "@clerk/clerk-react";
export const Heading = () => {

    const { isAuthenticated, isLoading } = useConvexAuth()
    return (
        <div className=" max-w-3xl space-y-4">
            <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold">Your Second Brain Where you write your ideas Make your Brain to think creativity. Welcome to the <span className="underline">Motion</span> World</h1>
            <h3 className=" text-base sm:text-xl md:text-2xl font-medium">Motion is the place where much <br />
                Better and faster work happens
            </h3>
            {isLoading && (
            <div className="flex w-full justify-center items-center">
                <Spinner size="lg" /></div>
            )}
            {isAuthenticated && !isLoading && (
                <Button variant={"default"} asChild>
                    <Link href={"/documents"}>
                    Enter <ArrowRightCircle className="h-4 w-4 ml-2" /></Link>
                </Button>
            )}
            {!isAuthenticated && !isLoading && (
            <SignInButton mode="modal">
                <Button variant={"default"} >
                    Get Started <ArrowRightCircle className="h-4 w-4 ml-2" />
                </Button></SignInButton>
            )}

        </div>
    )
}