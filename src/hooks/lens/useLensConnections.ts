import { logger } from "./../../helpers/logger";
import { fetchFollowers, fetchFollowing } from "../../helpers/lens/lens";
import { useEffect, useState } from "react";
import { UserLens$ } from "../../schema/user";

const useLensConnections = (account?: any, lensId?: any) => {
  const [following, setFollowing] = useState<any>([]);
  const [followers, setFollowers] = useState<any>([]);

  const getFollowing = (account: any) => {
    fetchFollowing({ address: account }).then(data => {
      const followingData = data.data.following.items.map((item: any) => {
        return { db: null, lens: UserLens$(item.profile) };
      });
      logger(
        "lens",
        "useLensConnections.getFollowing",
        "getting following data",
        [followingData, data.data.following]
      );
      setFollowing(followingData);
    });
  };

  // @param: lens id
  const getFollowers = (lensId: any) => {
    fetchFollowers({ profileId: lensId }).then(data => {
      const followersData = data.data.followers.items.map((item: any) => {
        return { db: null, lens: UserLens$(item.wallet.defaultProfile)};
      });
      logger(
        "lens",
        "useLensConnections.getFollowers",
        "getting followers data",
        [data, followersData]
      );
      setFollowers(followersData);
    });
  };

  useEffect(() => {
    if (lensId) {
      getFollowing(account);
      getFollowers(lensId);
    }
  }, [lensId]);

  return {
    following: following,
    followers: followers,
    getFollowers: getFollowers,
  };
};

export default useLensConnections;
