import { haveILikedPost } from "./../../helpers/lens/lens";
import { explorePublications } from "../../helpers/lens/lens";
import { useContext, useEffect, useState } from "react";
import { AuthContext, AuthContextType } from "@/providers/AuthProvider";

const useLensPosts = () => {
  const authContext = useContext(AuthContext) as AuthContextType;
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [posts, setPosts] = useState<any>([]);
  const [haveILiked, setHaveILiked] = useState<boolean>(false);

  const getPosts = async () => {
    setIsLoading(true);
    const res = await explorePublications({
      sortCriteria: "LATEST",
      publicationTypes: ["POST"],
      limit: 50,
    });
    if (res) {
      setPosts(res.data.explorePublications.items);
      setIsLoading(false);
    }
  };
  const getHaveILikedPost = async (postID: string) => {
    const res = await haveILikedPost({
      publicationId: postID,
    });
    const haveIliked = res.items.some(
      (item: any) =>
        item.profile.ownedBy.toLowerCase() == authContext.address.toLowerCase()
    );
    if (haveIliked) {
      setHaveILiked(true);
    }
    console.log("The haveIliked is ", haveIliked);
  };

  useEffect(() => {
    getPosts();
  }, []);

  return {
    posts: posts,
    isLoading: isLoading,
    haveILiked: haveILiked,
    getHaveILikedPost: getHaveILikedPost,
  };
};

export default useLensPosts;
