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
    
}
