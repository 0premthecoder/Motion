"use client"

import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { ChevronsLeftRight } from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuSeparator,
    DropdownMenuContent,
    DropdownMenuTrigger,
    DropdownMenuItem,
    DropdownMenuLabel
} from "@/components/ui/dropdown-menu";
import { SignOutButton, useUser } from "@clerk/clerk-react";
import { ModeToggle } from "@/components/mode-toggle";

const UserItem = () => {
    const { user } = useUser()

    return (<div>
        <DropdownMenu>
            <DropdownMenuTrigger>
                <div role="button" className="flex items-center text-sm p-3 w-full hover:bg-primary/5">
                    <div className="gap-x-2 flex items-center max-w-[150px]">
                        <Avatar className="h-5 w-5">
                            <AvatarImage src={user?.imageUrl} />
                        </Avatar>
                        <span>
                            {user?.fullName}&apos;s Motion
                        </span>
                    </div>
                    <ChevronsLeftRight className="rotate-90 ml-2 text-muted-foreground h-4 w-4" />
                </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent
                className="w-80"
                align="start"
                alignOffset={11}
                forceMount
            >
                <div className="flex flex-col space-y-4 p-2">
                    <p className=" text-xs font-medium leading-none text-muted-foreground">
                        {user?.emailAddresses[0].emailAddress}&apos;s Motion
                    </p>
                    <div className="flex gap-x-2 items-center">
                        <div className="rounded-md bg-secondary p-1">
                            <Avatar className="h-8 w-8">
                                <AvatarImage src={user?.imageUrl} />
                            </Avatar>
                        </div>
                        <div className="space-y-1">
                            <p className="text-sm line-clamp-1">
                                {user?.fullName}&apos;s Motion
                            </p>
                        </div>
                        <ModeToggle/>
                    </div>
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild className="w-full cursor-pointer text-muted-foreground">
                    <SignOutButton />
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
        
    </div>);
}

export default UserItem;