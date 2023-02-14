import { getPublications } from "../../helpers/lens/lens";
import { useEffect, useState } from "react";
import { Post$ } from "../../schema/post";

const useLensPostsForUser = (lensId: any) => {
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [posts, setPosts] = useState<any>([]);

    const getPosts = async () => {
        setIsLoading(true);
        console.log(lensId);
        try {
            const res = await getPublications({
                "profileId": lensId,
                "publicationTypes": ["POST"]
            });
            console.log('PostsByHandle', res.data.publications.items[0]);
            const result = res.data.publications.items.map((item: any) => {
                return (
                    Post$(item)
                )
            })
            setPosts(result);
            setIsLoading(false);
        } catch (err) {
            console.log('error searching profiles...', err)
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
