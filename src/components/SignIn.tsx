import { FC } from 'react'
import { Icons } from './Icons'
import Link from 'next/link'
import UserAuthform from './UserAuthform'

const SignIn: FC = () => {
    return <div className='container mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[400px]'>
        <div className="flex flex-col space-y-2 text-center">
            <Icons.logo className="h-8 w-8 mx-auto" />
            <h1 className="text-2xl font-semibold tracking-tight">
                Welcome Back!
            </h1>
            <p className="text-sm font-normal max-w-xs mx-auto">
                By continuing, you agree to our User Agreement and Privacy Policy and setting up a CommunityHUB account.
            </p>

            {/* Sign-in Form  */}
            <UserAuthform />

            <p className="px-8 text-center text-sm text-zinc-700">
                New to CommunityHUB? <Link href="/sign-up" className="hover:text-zinc-800 text-zinc-500 text-sm font-semibold underline underline-offset-4 ">Sign Up</Link>
            </p>
        </div>
    </div>
}

export default SignIn