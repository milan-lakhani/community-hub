import Link from "next/link"
import { Icons } from "./Icons"
import { buttonVariants } from "./ui/Button"
import { cn } from "@/lib/utils"

const Navbar = () => {
    return (
        <>
            <div className="fixed top-0 inset-x-0 h-fit bg-zinc-100 border-b border-zinc-300 z-[10] py-2">
                <div className="container max-w-7xl h-hull mx-auto flex items-center justify-between gap-2">
                    {/* Logo */}
                    <Link href="/" className="flex gap-2 items-center">
                        <Icons.logo className="h-8 w-8 md:h-6 md:w-6 text-zinc-700" />
                        <p className="hidden text-zinc-700 text-sm font-medium md:block">CommunityHUB</p>
                    </Link>

                    {/* Searchbar */}

                    {/* Auth */}
                    <Link className={cn(buttonVariants())} href="/sign-in">
                        Login
                    </Link>
                </div>
            </div>
        </>
    )
}

export default Navbar