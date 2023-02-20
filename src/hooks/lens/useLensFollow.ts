import { AuthContext, AuthContextType } from "../../providers/AuthProvider";
import { ethers } from "ethers";
import { splitSignature } from "ethers/lib/utils";
import { followUser, unfollowUser } from "../../helpers/lens/lens";
import { config } from "../../config";
import { signedTypeData } from "../../helpers/lens/lensApiService";
import { useContext, useState } from "react";
import { lensHubAbi } from "../../abi/lensHubAbi";
import { lensFollowAbi } from "../../abi/lensFollowAbi";
import { fetchSigner } from "@wagmi/core";

const useLensFollows = (profileID: any) => {
  const authContext = useContext(AuthContext) as AuthContextType;
  const [isFollowing, setIsFollowing] = useState<any>();
  const [isFollowingByMe, setIsFollowingYou] = useState<any>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [loadingText, setLoadingText] = useState<string>("");

  const TEST_LENS_HUB_CONTRACT = "0x60Ae865ee4C725cd04353b5AAb364553f56ceF82";

  const getVRS = async (typedData: any) => {
    const signature: any = await signedTypeData(
      typedData.domain,
      typedData.types,
      typedData.value
    );

    const { v, r, s } = splitSignature(signature);

    const sig = {
      v,
      r,
      s,
      deadline: typedData.value.deadline,
    };
    console.log("The sig we got is ", sig);
    return [typedData, sig];
  };

  const triggerFollow = async () => {
    if (profileID) {
      try {
        setIsLoading(true);
        setLoadingText("Following");

        const result = await followUser({
          follow: [
            {
              profile: profileID,
            },
          ],
        });

        const [typedData, sig] = await getVRS(
          result.data!.createFollowTypedData.typedData
        );

        const signer: any = await fetchSigner();
        const lensHub = new ethers.Contract(
          config.TESTNET_LENS_HUB_CONTRACT,
          lensHubAbi,
          signer
        );

        const tx = await lensHub.followWithSig({
          follower: authContext.address,
          profileIds: typedData.value.profileIds,
          datas: typedData.value.datas,
          sig: sig,
        });

        setIsLoading(false);
        setLoadingText("Following");

        // await updateLens.updateLensState();
        return tx.hash;
      } catch (error) {
        setIsLoading(false);
      }
    } else {
      throw new Error("Profile ID to follow is not provided");
    }
  };

  const triggerUnFollow = async () => {
    if (profileID) {
      try {
        setIsLoading(true);
        setLoadingText("UnFollowing");

        const result = await unfollowUser({ profile: profileID });
        const [typedData, sig] = await getVRS(
          result.data!.createUnfollowTypedData.typedData
        );
        const signer: any = await fetchSigner();
        // load up the follower nft contract
        const followNftContract = new ethers.Contract(
          typedData.domain.verifyingContract,
          lensFollowAbi,
          signer
        );

        const tx = await followNftContract.burnWithSig(
          typedData.value.tokenId,
          sig
        );
        setIsLoading(false);
        setLoadingText("");
        // await updateLens.updateLensState();
        return tx.hash;
      } catch (error: any) {
        setIsLoading(false);
        setLoadingText("");
        throw new Error("Error in Unfollowing profile ", error);
      }
    } else {
      throw new Error("Not getting profile ID to Unfollow");
    }
  };

  return {
    isFollowing: isFollowing,
    isFollowingByMe: isFollowingByMe,
    triggerFollow: triggerFollow,
    triggerUnFollow: triggerUnFollow,
    isLoading: isLoading,
    loadingText: loadingText,
  };
};

export default useLensFollows;
