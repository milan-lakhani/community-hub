"use client"

import { FC, useState } from 'react'
import { Button } from './ui/Button'
import { cn } from '@/lib/utils'
import { signIn } from 'next-auth/react'
import { Icons } from './Icons'

interface UserAuthformProps extends React.HTMLAttributes<HTMLDivElement> {

}

const UserAuthform: FC<UserAuthformProps> = ({ className, ...props }) => {
    
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const loginWithGoogle = async () => {

        try {
            setIsLoading(true)

            await signIn('google')
        } catch (error) {
            // Toast error
        } finally {
            setIsLoading(false)
        }
    }

    return <div className={cn(className, 'flex justify-center')} {...props}>
        <Button onClick={loginWithGoogle} isLoading={isLoading} size='sm' className='w-full'>
            {isLoading ? null : <Icons.google className='h-4 w-4 mr-2' />}
            Sign In with Google
        </Button>
    </div>
}

export default UserAuthform