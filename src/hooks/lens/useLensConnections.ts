import { logger } from "./../../helpers/logger";
import { fetchFollowers, fetchFollowing } from "../../helpers/lens/lens";
import { useContext, useEffect, useState } from "react";
import { UserLens$ } from "../../schema/user";
import { AuthContext, AuthContextType } from "@/providers/AuthProvider";

const useLensConnections = (account?: any) => {
  const [following, setFollowing] = useState<any>([]);
  const [followers, setFollowers] = useState<any>([]);
  const authContext = useContext(AuthContext) as AuthContextType;

  const getFollowing = lensId => {
    fetchFollowing({ address: lensId }).then(data => {
      const followingData = data.data.following.items.map(item => {
        return { db: null, lens: UserLens$(item.profile) };
      });
      logger(
        "lens",
        "useLensConnections.getFollowing",
        "getting following data",
        [followingData]
      );
      setFollowing(followingData);
    });
  };

  // @param: lens id
  const getFollowers = (lensId: any) => {
    fetchFollowers({ profileId: lensId }).then(data => {
      logger(
        "lens",
        "useLensConnections.getFollowers",
        "getting followers data",
        [data]
      );
      setFollowers(data?.data?.followers?.items);
    });
  };

  useEffect(() => {
    if (account) {
      getFollowing(account);
      getFollowers(authContext.user?.lens?.id);
    } else {
      // throw new Error("Not getting user account");
      console.log("Not getting user account");
    }
  }, [account]);

  return {
    following: following,
    followers: followers,
    getFollowers: getFollowers,
  };
};

export default useLensConnections;
