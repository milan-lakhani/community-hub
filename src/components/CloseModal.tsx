"use client"
import { X } from "lucide-react"
import { Button } from "./ui/Button"
import { useRouter } from "next/navigation"

const CloseModal = ({ }) => {
    const router = useRouter()
    return (
        <Button onClick={() => router?.back()} className="h-6 w-6 p-0 rounded-md" aria-label="close modal" variant={"subtle"}>
            <X className="h-6 w-6 text-zinc-700" />
        </Button>
    )
}

export default CloseModal