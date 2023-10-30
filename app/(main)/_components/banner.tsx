"use client"

import { Button } from "@/components/ui/button";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useMutation } from "convex/react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { ConfirmModal } from "@/components/modals/confirm-modal";

interface BannerProps {
    documentId: Id<"documents">
}

const Banner = ({ documentId }: BannerProps) => {

    const router = useRouter()
    const remove = useMutation(api.document.remove)
    const restore = useMutation(api.document.restore)

    const onRemove = () => {
        const promise = remove({ id: documentId })
    
        toast.promise(promise, {
            "loading": "Deleting Note..",
            "success": "Note deleted",
            "error": "Failed to delete the note"
        })

        router.push("/documents")
    }

    const onRestore = () => {
        const promise = restore({ id: documentId })
        toast.promise(promise, {
            "loading": "Restoring Note..",
            "success": "Note Restored",
            "error": "Failed to Restore the note"
        })
    }

    return (
        <div className="w-full bg-rose-500 text-center text-lg p-2 text-white flex item-center justify-center gap-x-2"><p>This page in thrash</p>
            <Button onClick={onRestore} className="border-white bg-transparent
                hover:bg-primery/5 text-white hover:text-white
                p-1 px-2 h-auto font-normal" variant={"outline"}>  Restore Page  </Button>
            <ConfirmModal onConfirm={onRemove}>
                <Button className="border-white bg-transparent
    hover:bg-primery/5 text-white hover:text-white
    p-1 px-2 h-auto font-normal
     " variant={"outline"}> Delete Forever </Button></ConfirmModal>
        </div>
    );
}

export default Banner;