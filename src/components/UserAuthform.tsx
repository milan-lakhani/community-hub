import { FC } from 'react'
import { Button } from './ui/Button'
import { cn } from '@/lib/utils'

interface UserAuthformProps extends React.HTMLAttributes<HTMLDivElement> {

}

const UserAuthform: FC<UserAuthformProps> = ({ className, ...props }) => {
    
    

    return <div className={cn(className, 'flex justify-center')} {...props}>
        <Button size='sm' className='w-full'>
            Sign In with Google
        </Button>
    </div>
}

export default UserAuthform