import { logger } from "./../../helpers/logger";
import {
  fetchFollowers,
  fetchFollowing,
  getProfileForHandle,
  getProfiles,
} from "../../helpers/lens/lens";
import { useEffect, useState } from "react";
import { User$} from "../../schema/user";

const useLensConnections = (account?: any, lensId?: any) => {
  const [following, setFollowing] = useState<any>([]);
  const [followers, setFollowers] = useState<any>([]);
  const [profile, setProfile] = useState<any>([]);

  const getFollowing = (account: any) => {
    fetchFollowing({ address: account }).then((data) => {
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
    fetchFollowers({ profileId: lensId }).then((data) => {
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
  const getLensProfile = (lensId: any) => {
    console.log("profilefromlens123", lensId);
    getProfiles({ handles: lensId }).then((data: any) => {      
      const lensProfile = data.data.profiles.items.map((item: any) => {
        return item.ownedBy;
      });
      logger(
        "lens",
        "useLensConnections.getProfile",
        "getting profile data",
        [lensProfile]
      );
      // console.log("profilefromlens", data);
      setProfile(lensProfile);
    },()=>{console.log("notsetprofile")});
  };
  useEffect(() => {
    if (lensId) {
      getFollowing(account);
      getFollowers(lensId);
      // getLensProfile(lensId);
    }
  }, [lensId,account]);

  const _fetch = (userLens: any) => {
    console.log('fetching user followers and following');
    getFollowing(userLens.ownedBy);
    getFollowers(userLens.id)
  }

  return {
    following: following,
    followers: followers,
    profile:profile,
    fetch: _fetch,
    getLensProfile: getLensProfile,
  };
};

export default useLensConnections;
