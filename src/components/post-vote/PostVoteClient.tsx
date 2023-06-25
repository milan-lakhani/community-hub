'use client'

import { useCustomToast } from '@/hooks/use-custom-toast'
import { usePrevious } from '@mantine/hooks'
import { VoteType } from '@prisma/client'
import { FC, useEffect, useState } from 'react'
import { Button } from '../ui/Button'
import { ArrowBigDown, ArrowBigUp } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useMutation } from '@tanstack/react-query'
import { PostVoteRequest } from '@/lib/validators/vote'
import axios, { AxiosError } from 'axios'
import { toast } from '@/hooks/use-toast'

interface PostVoteClientProps {
    postId: string,
    initialVote?: VoteType | null,
    initialVotesAmt?: number
}

const PostVoteClient: FC<PostVoteClientProps> = ({ postId, initialVote, initialVotesAmt }) => {
    const { loginToast } = useCustomToast()
    const [votesAmt, setVotesAmt] = useState<number>(initialVotesAmt ?? 0)
    const [currentVote, setCurrentVote] = useState(initialVote)
    const previousVote = usePrevious(currentVote)

    useEffect(() => {
        setCurrentVote(initialVote)
    }, [initialVote])

    const { mutate: vote } = useMutation({
        mutationFn: async (voteType: VoteType) => {
            const payload: PostVoteRequest = {
                postId,
                voteType
            }

            const { data } = await axios.patch('/api/subreddit/post/vote', payload)

            return data
        },
        onError: (err, voteType) => {
            if (voteType === 'UP') {
                setVotesAmt((prev) => prev - 1)
            } else {
                setVotesAmt((prev) => prev + 1)
            }

            //reset the current vote
            setCurrentVote(previousVote)

            if (err instanceof AxiosError) {
                if (err?.response?.status === 401) {
                    return loginToast()
                }

                toast({
                    title: 'Something went wrong',
                    description: 'Please try again later. Cannot register your vote.',
                    variant: 'destructive'
                })
            }

            return toast({
                title: 'Something went wrong',
                description: 'Please try again later. Cannot register your vote.',
                variant: 'destructive'
            })
        },
        onMutate: (type: VoteType) => {
            if (currentVote === type) {
                // User is voting the same way again, so remove their vote
                setCurrentVote(undefined)
                if (type === 'UP') setVotesAmt((prev) => prev - 1)
                else if (type === 'DOWN') setVotesAmt((prev) => prev + 1)
            } else {
                // User is voting in the opposite direction, so subtract 2
                setCurrentVote(type)
                if (type === 'UP') setVotesAmt((prev) => prev + (currentVote ? 2 : 1))
                else if (type === 'DOWN')
                    setVotesAmt((prev) => prev - (currentVote ? 2 : 1))
            }
        },
    })

    return <div className='flex sm:flex-col gap-4 sm:gap-0 pr-6 sm:w-20 pb-4 sm:-b-0'>
        <Button onClick={() => vote('UP')} variant={'ghost'} size={'sm'} aria-label='upvote'>
            <ArrowBigUp className={cn('w-5 h-5 text-zinc-700', {
                'text-emarald-500 fill-emerald-500': currentVote === 'UP',
            })} />
        </Button>

        <p className="text-center py-2 font-medium text-sm text-zinc-900">
            {votesAmt}
        </p>
        <Button onClick={() => vote('DOWN')} variant={'ghost'} size={'sm'} aria-label='upvote'>
            <ArrowBigDown className={cn('w-5 h-5 text-zinc-700', {
                'text-red-500 fill-red-500': currentVote === 'DOWN',
            })} />
        </Button>

    </div>
}

export default PostVoteClient