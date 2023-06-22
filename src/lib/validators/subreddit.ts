import { z } from 'zod';
 
export const subredditValidator = z.object({
    name: z.string().min(3).max(21),
    // subreddit: z.string().min(3).max(21).regex(/^[a-zA-Z0-9_]+$/),
})

export const subredditSubscriptionValidator = z.object({
    subreddit: z.string()
})

export type CreateSubredditPayload = z.infer<typeof subredditValidator>;
export type SubscribeToSubredditPayload = z.infer<typeof subredditSubscriptionValidator>;