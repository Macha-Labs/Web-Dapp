import { logger } from "./../../helpers/logger";
import { fetchFollowers, fetchFollowing } from "../../helpers/lens/lens";
import { useEffect, useState } from "react";
import { UserLens$ } from "../../schema/user";

const useLensConnections = (account?: any) => {
  const [following, setFollowing] = useState<any>([]);
  const [followers, setFollowers] = useState<any>([]);

  const getFollowing = account => {
    fetchFollowing({ address: account }).then(data => {
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
  const getFollowers = (profileID: any) => {
    fetchFollowers({ profileId: profileID }).then(data => {
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
      getFollowers(account);
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
