import { buttonVariants } from "@/components/ui/Button"
import { toast } from "./use-toast"
import Link from "next/link"

export const useCustomToast = () => {
    
    const loginToast = () => {
        const {dismiss} = toast({
            title: 'You are not logged in!',
            description: 'Please login to continue.',
            variant: 'destructive',
            action: (
                <Link href='/sign-in' onClick={()=>{dismiss()}} className={buttonVariants({variant: 'outline'})} >Login</Link>
            )
        })
    }

    return {loginToast}
}