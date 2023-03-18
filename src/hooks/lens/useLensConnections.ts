import { logger } from "./../../helpers/logger";
import { fetchFollowers, fetchFollowing } from "../../helpers/lens/lens";
import { useEffect, useState } from "react";
import { User$, UserLens$ } from "../../schema/user";

const useLensConnections = (account?: any, lensId?: any) => {
  const [following, setFollowing] = useState<any>([]);
  const [followers, setFollowers] = useState<any>([]);

  const getFollowing = (account: any) => {
    fetchFollowing({ address: account }).then(data => {
      const followingData = data.data.following.items.map((item: any) => {
        return new User$(null, item?.profile, null);
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
      const followersData = data.data.followers.items.map((item: any) => {
        return new User$(null, item?.wallet?.defaultProfile, null);
      });
      logger(
        "lens",
        "useLensConnections.getFollowers",
        "getting followers data",
        [followersData]
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

  const _fetch = (userLens: any) => {
    getFollowing(userLens.ownedBy);
    getFollowers(userLens.id)
  }

  return {
    following: following,
    followers: followers,
    fetch: _fetch
  };
};

export default useLensConnections;
