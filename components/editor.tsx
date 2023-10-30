"use client"

import { PartialBlock, BlockNoteEditor } from "@blocknote/core"
import { BlockNoteView, useBlockNote } from "@blocknote/react"
import "@blocknote/core/style.css"
import { useTheme } from "next-themes"
import { useEdgeStore } from "@/lib/edgestore"

interface editorProps {
    onChange:(value: string)=> void
    initialContent?:string
    editable?: boolean
}

const Editor = ({onChange,initialContent,editable}:editorProps) => {

    const {resolvedTheme} = useTheme()
    const {edgestore} = useEdgeStore()

    const handleUpload = async (file: File)=>{
        const res = await edgestore.publicFiles.upload({
            file
        })

        return res.url
    }

    const editor: BlockNoteEditor = useBlockNote({
        editable,
        initialContent: initialContent ? JSON.parse(initialContent) as PartialBlock[] : undefined,
        onEditorContentChange(editor) {
            onChange(JSON.stringify(editor.topLevelBlocks, null, 2))
        },
        uploadFile: handleUpload
    })

    return ( <>
        <BlockNoteView 
            editor={editor}
            theme={resolvedTheme === "dark" ? "dark" : "light"}
        />
    </> );
}
 
export default Editor;