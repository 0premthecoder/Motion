"use client"

import {useState, useEffect} from 'react'
import { File } from 'lucide-react'
import {useQuery} from 'convex/react'
import { useRouter } from 'next/navigation'
import { useUser } from '@clerk/clerk-react'

import {
    CommandDialog,
    CommandEmpty,
    CommandGroup,
    CommandItem,
    CommandInput,
    CommandList
} from '@/components/ui/command'
import { useSearch } from '@/hooks/use-search'
import { api } from '@/convex/_generated/api'

export const SearchCommand = ()=>{
    const { user} = useUser();
    const router = useRouter();
    const documents = useQuery(api.document.getSearch);
    const [isMounted, setIsMounted] = useState(false)

    const toggle = useSearch((store) => store.toggle)
    const isOpen = useSearch((store) => store.isOpen)
    const onClose = useSearch((store) => store.onClose)

    useEffect(() => {
      setIsMounted(true)
    }, [])

    if(!isMounted){
        return null
    }

    return (
        <CommandDialog open={isOpen} onOpenChange={onClose}>
            <CommandInput placeholder={`Search${user?.fullName}'s Motion...`}/>

        </CommandDialog>
    )
    

}
