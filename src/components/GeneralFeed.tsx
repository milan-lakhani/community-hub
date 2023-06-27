import { db } from "@/lib/db"
import PostFeed from "./PostFeed"

const GeneralFeed = async () => {
    const posts = await db.post.findMany({
        orderBy: {
            createdAt: 'desc'
        },
        include: {
            votes: true,
            author: true,
            subreddit: true,
            comments: true
        }
    })

    return <PostFeed initialPosts={posts} />
}

export default GeneralFeed