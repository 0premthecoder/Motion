"use client"

import { useEffect, useState } from "react"
import { SettingsModal } from "../modals/settings-modal"

export const ModelProvider = ()=>{
    
    const [isMounted, setIsMounted] = useState(false)
    useEffect(() => {
        setIsMounted(true)
    }, [])

    if(!isMounted){
        return null
    }
    return (
        <>
            <SettingsModal/>
        </>
    )
}