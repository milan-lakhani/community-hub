import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { subredditSubscriptionValidator } from "@/lib/validators/subreddit";
import { z } from "zod";

export async function POST(req: Request) {
    try {
        const session = await getAuthSession();
        if (!session?.user) {
            return new Response('Unauthorized', { status: 401 })
        }

        const body = await req.json();

        const { subredditId } = subredditSubscriptionValidator.parse(body);

        const subscriptionExists = await db.subscription.findFirst({
            where: {
                subredditId,
                userId: session.user.id
            }
        })

        if (!subscriptionExists) {
            return new Response('You are not subscribed to the Community', { status: 400 })
        }

        //check if the user of the subreddit is the same as the user who is trying to unsubscribe
        const subreddit = await db.subreddit.findFirst({
            where: {
                id: subredditId,
                userId: session.user.id
            }
        })

        if(subreddit){
            return new Response('You cannot unsubscribe from your own Community, Duh!', { status: 400 })
        }

        await db.subscription.delete({
            where: {
                userId_subredditId: {
                    subredditId,
                    userId: session.user.id
                }
            }
        })

        return new Response(subredditId)

    } catch (error) {
        if (error instanceof z.ZodError) {
            return new Response('Invalid data provided', { status: 422 })
        }

        return new Response('Internal Server Error. Cannot unsubscribe. Please try again later', { status: 500 })
    }
}