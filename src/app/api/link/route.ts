import axios from "axios";

export async function GET(req: Request) {
    const url = new URL(req.url);
    const href = url.searchParams.get('url');


    if (!href) {
        return new Response('Invalid href', { status: 400 })
    }

    const res = await axios.get(href);

    // const titlematch = res.data.match(/<title[^>]*>([^<]+)<\/title>/);
    const titlematch = res.data.match(/<title>(.*?)<\/title>/);
    const title = titlematch ? titlematch[1] : '';

    // const descriptionmatch = res.data.match(/<meta[^>]*name="description"[^>]*content="([^"]*)"[^>]*>/);
    const descriptionmatch = res.data.match(/<meta name="description" content="(.*?)"/);
    const description = descriptionmatch ? descriptionmatch[1] : '';

    // const imagematch = res.data.match(/<meta[^>]*property="og:image"[^>]*content="([^"]*)"[^>]*>/);
    const imagematch = res.data.match(/<meta property="og:image"content="(.*?)" >/);
    const imageUrl = imagematch ? imagematch[1] : '';

    return new Response(JSON.stringify({
        success: 1,
        meta: {
            title,
            description,
            image:{
                url: imageUrl
            }
        }
    }))

}