"use client"

import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { api } from "@/convex/_generated/api";
import { Doc } from "@/convex/_generated/dataModel";
import { useMutation } from "convex/react";
import { useRef, useState } from "react";

interface TitleProps {
    initialData: Doc<"documents">

}

const Title = ({ initialData }: TitleProps) => {
    const update = useMutation(api.document.update)
    const [isEditing, setisEditing] = useState(false)

    const inputRef = useRef<HTMLInputElement>(null)

    const [title, setTitle] = useState(initialData.title || "Untitled")

    const enableInput = ()=>{
        setTitle(initialData.title)
        setisEditing(true)
        setTimeout(()=>{
            inputRef.current?.focus()
            inputRef.current?.setSelectionRange(0, inputRef.current.value.length)
        }, 0)
    }

    const disableInput =()=>{
        setisEditing(false)
    }

    const onChange = (e:React.ChangeEvent<HTMLInputElement>)=>{
        setTitle(e.target.value)
        update({
            id: initialData._id,
            title: e.target.value || "Untitled"
        })
    }

    const onKeyDown =(e:React.KeyboardEvent<HTMLInputElement>)=>{
        if(e.key==="Enter"){
            disableInput()
        }
    }

    return (<div className="flex items-center gap-x-1">
        {!!initialData.icon && <p> {initialData.icon}</p>}
        {isEditing ? <input ref={inputRef}
            onClick={enableInput}
            onBlur={disableInput}
            onChange={onChange}
            onKeyDown={onKeyDown}
            value={title}
            className="h-7 px-2 focus-visible:ring-transparent "
        />: <Button onClick={enableInput} variant={"ghost"} size={"sm"} className="font-normal h-auto p-1">  <span>
                {initialData?.title}</span>
            </Button>}
    </div>);
}

export default Title;


Title.Skeleton = function TitleSkeleton(){
    return (
        <Skeleton className="h-9 w-24 rounded-md"/>
    )
}