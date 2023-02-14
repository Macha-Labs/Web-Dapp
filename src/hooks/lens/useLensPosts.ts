import { explorePublications } from "../../helpers/lens/lens";
import { useEffect, useState } from "react";

const useLensPosts = () => {
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [posts, setPosts] = useState<any>([]);

    const getPosts = async () => {
        setIsLoading(true);
        const res = await explorePublications({
            "sortCriteria": "LATEST",
            "publicationTypes": ["POST"],
            "limit": 50
        })
        if (res) {
            setPosts(res.data.explorePublications.items);
            setIsLoading(false);
        }
    }

    useEffect(() => {
        getPosts();
    }, [])

    return (
        {
            posts: posts, 
            isLoading: isLoading
        }
    )
}

export default useLensPosts;