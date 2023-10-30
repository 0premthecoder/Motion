"use client"

import { api } from "@/convex/_generated/api"
import { Doc } from "@/convex/_generated/dataModel"
import { useOrigin } from "@/hooks/use-origin"
import { useMutation } from "convex/react"
import { useState } from "react"

import { Popover, 
    PopoverTrigger,
    PopoverContent,
 } from "@/components/ui/popover";
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { Check, Copy, Divide, Globe } from "lucide-react"


interface PublishProps {
    initialData: Doc<"documents">
}

const Publish = ({initialData}:PublishProps) => {
    const origin = useOrigin()
    const update = useMutation(api.document.update)

    const [copied, setCopied] = useState(false)
    const [isSubmitting, setIsSubmitting] = useState(false)

    const url = `${origin}/preview/${initialData._id}`

    const onPublish = ()=>{
        setIsSubmitting(true)

        const promise = update({id:initialData._id, isPublished: true})
            .finally(()=>setIsSubmitting(false))

        toast.promise(promise,{
            loading:"Publishing...",
            success:"Note Published",
            error:"Failed to Publish note"
        })
    }

    const onUnPublish = ()=>{
        setIsSubmitting(true)

        const promise = update({id:initialData._id, isPublished: false})
            .finally(()=>setIsSubmitting(false))

        toast.promise(promise,{
            loading:"Unpublishing...",
            success:"Note Unpublished",
            error:"Failed to Unpublish note"
        })
    }

    const onCopy = ()=>{
        navigator.clipboard.writeText(url)
        setCopied(true)

        setTimeout(()=>{
            setCopied(false)
        },1000)
    }
    return ( <Popover>
        <PopoverTrigger>
            <Button size={"sm"} variant={"ghost"}>
                Publish
                {initialData.isPublished && <Globe
                className="text-sky-500 w-4 h-4 ml-2"/>}
            </Button>
        </PopoverTrigger>
        <PopoverContent className="w-72" align="end" alignOffset={8} forceMount>
            {initialData.isPublished ? (
            <div className="space-y-4">
                <div className="flex items-center gap-x-2">
                    <Globe className="text-sky-500 animate-pulse h-4 w-4"/>
                    <p className=" text-xs font-medium text-sky-500">This is Live Now</p>
                </div>
                <div className="flex items-center">
                    <input disabled value={url} className="flex-1 rounded-l-md border px-2 bg-muted truncate" />
                    <Button onClick={onCopy} disabled={copied} className="h-8 rounded-l-none">
                        {copied ? (<Check className="h-4 w-4"/>): <Copy className="h-4 w-4"/>}
                    </Button>
                </div>
                <Button size={"sm"} className="w-full text-xs" disabled={isSubmitting} onClick={onUnPublish}>
                    UnPublish
                </Button>
            </div>)
                : (
                    <div className="flex flex-col items-center justify-center">
                        <Globe className="h-8 w-8 text-muted-foreground"/>
                       <p className="text-sm font-medium mb-2"> Publish This Note</p>
                       <span className="text-xs text-muted-foreground mb-4">Share Your Work with Others</span>
                       <Button disabled={isSubmitting} onClick={onPublish} className="w-full text-xs" size={"sm"}>
                        Publish
                       </Button>
                    </div>
                )}

        </PopoverContent>

    </Popover> );
}
 
export default Publish;