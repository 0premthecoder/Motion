"use client"

import { AlertDialog, 
    AlertDialogAction, 
    AlertDialogCancel, 
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger
    
     } from "@/components/ui/alert-dialog"

interface ConfirmModalProps{
    children: React.ReactNode;
    onConfirm:()=> void
}

export const ConfirmModal = ({
    children,
    onConfirm
}: ConfirmModalProps)=>{
    const handleConfirm = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>)=>{
        e.stopPropagation()
        onConfirm()

    }
    return(
    <AlertDialog>
        <AlertDialogTrigger onClick={(e)=> e.stopPropagation()} asChild>
            {children}
        </AlertDialogTrigger>
        <AlertDialogContent>
            <AlertDialogHeader>
                <AlertDialogTitle>
                    Sure?
                </AlertDialogTitle>
                <AlertDialogDescription>
                    This Action Cannot be undone.🫦
                </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
                <AlertDialogCancel onClick={e => e.stopPropagation()}>
                    Cancel
                </AlertDialogCancel>
                <AlertDialogAction onClick={onConfirm}>
                    Yup I am Sure🤏
                </AlertDialogAction>
            </AlertDialogFooter>
        </AlertDialogContent>
    </AlertDialog>)
}