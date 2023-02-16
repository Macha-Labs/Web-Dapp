import { getPublications } from "../../helpers/lens/lens";
import { useEffect, useState } from "react";
import { Post$ } from "../../schema/post";
import { logger } from "@/helpers/logger";

const useLensPostsForUser = (lensId: any) => {
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [posts, setPosts] = useState<any>([]);

    const getPosts = async () => {
        setIsLoading(true);
        try {
            const res = await getPublications({
                "profileId": lensId,
                "publicationTypes": ["POST"]
            });
            logger('lens', 'useLensPostsForUser.getPosts', 'PostsByHandle', [res.data.publications.items[0]]);
            const result = res.data.publications.items.map((item: any) => {
                return (
                    Post$(item)
                )
            })
            setPosts(result);
            setIsLoading(false);
        } catch (err) {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        if (lensId)
            getPosts();
    }, [lensId])

    return (
        {posts: posts, isLoading: isLoading}
    )
}

export default useLensPostsForUser;
