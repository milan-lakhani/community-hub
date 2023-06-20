import SignUp from '@/components/SignUp'
import { buttonVariants } from '@/components/ui/Button'
import { cn } from '@/lib/utils'
import { ChevronLeft } from 'lucide-react'
import Link from 'next/link'
import { FC } from 'react'

const page: FC = () => {
    return <div className='absolute inset-0'>
        <div className='flex flex-col items-center justify-center h-full max-w-2xl gap-20 mx-auto'>
            <Link href='/' className={cn(buttonVariants({ variant: 'ghost' }))}>
                <ChevronLeft className='h-4 w-4 mr-2' />
                Home
            </Link>


            <SignUp />

        </div>
    </div>
}

export default page