import { z } from 'zod';

export const PostValidator = z.object({
    title: z.string().min(3, 'Title must be longer than 3 characters').max(255, 'Title must be shorter than 255 characters'),
    subredditId: z.string(),
    content: z.any()
})

export type PostCreationRequest = z.infer<typeof PostValidator>;