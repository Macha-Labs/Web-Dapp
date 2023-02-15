import {AuthContext, AuthContextType} from "../../providers/AuthProvider";
import {ethers} from "ethers";
import {splitSignature} from "ethers/lib/utils";
import {followUser, unfollowUser} from "../../helpers/lens/lens";
import {config} from "../../config";
import {signedTypeData} from "../../helpers/lens/lensApiService";
import {useContext, useState} from "react";
import {lensHubAbi} from "../../abi/lensHubAbi";
import {lensFollowAbi} from "../../abi/lensFollowAbi";
import { useWalletConnect } from "@walletconnect/react-native-dapp";

const useLensFollows = (profileID: any) => {
    const authContext = useContext(AuthContext) as AuthContextType;
    const [isFollowing, setIsFollowing] = useState<any>();
    const [isFollowingByMe, setIsFollowingYou] = useState<any>();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [loadingText, setLoadingText] = useState<string>("");
    const connector = useWalletConnect();

    const TEST_LENS_HUB_CONTRACT = "0x60Ae865ee4C725cd04353b5AAb364553f56ceF82";

    const getVRS = async (typedData) => {
        const signature = await signedTypeData(
            typedData.domain,
            typedData.types,
            typedData.value,
            connector.accounts[0],
            connector
        );
        console.log("Signature", signature);
        const {v, r, s} = splitSignature(signature);

        const sig = {
            v,
            r,
            s,
            deadline: typedData.value.deadline,
        };
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
                console.log("get vrs:", result.data!.createFollowTypedData);
                console.log("Typed data:", typedData);

                const lensHub = new ethers.Contract(
                    config.TESTNET_LENS_HUB_CONTRACT,
                    lensHubAbi,
                    authContext.signer
                );

                console.log("This is the sig ", sig);
                console.log("This is the typedData ", typedData);

                // const tx = await connector.sendTransaction(
                //     {
                //         from: authContext.address,
                //         to: TEST_LENS_HUB_CONTRACT,
                //         data: lensHub.followWithSig({
                //             follower: authContext.address,
                //             profileIds: typedData.value.profileIds,
                //             datas: typedData.value.datas,
                //             sig: sig,
                //         }, {gasLimit: 100000}),
                //         gasLimit: 100000
                //     }
                // )

                const tx = await lensHub.followWithSig({
                    follower: authContext.address,
                    profileIds: typedData.value.profileIds,
                    datas: typedData.value.datas,
                    sig: sig,
                }, {gasLimit: 100000})
                    
                    

                console.log("follow: tx hash", tx.hash);
                setIsLoading(false);
                setLoadingText("Following");
                // await updateLens.updateLensState();
                console.log(
                    "Updated the lens state, returning transaction hash"
                );
                return tx.hash;
            } catch (error) {
                console.log("Error in following profile", error);
                setIsLoading(false);
            }
        } else {
            console.log("Not getting profile ID to follow");
        }
    };

    const triggerUnFollow = async () => {
        if (profileID) {
            try {
                setIsLoading(true);
                setLoadingText("UnFollowing");

                const result = await unfollowUser({profile: profileID});
                console.log("Resulr:", result);
                const [typedData, sig] = await getVRS(
                    result.data!.createUnfollowTypedData.typedData
                );
                console.log("TYped data", typedData);
                console.log("Sig:", sig);

                // load up the follower nft contract
                const followNftContract = new ethers.Contract(
                    typedData.domain.verifyingContract,
                    lensFollowAbi,
                    authContext.signer
                );

                const tx = await followNftContract.burnWithSig(
                    typedData.value.tokenId,
                    sig
                );
                console.log("follow: tx hash", tx.hash);
                setIsLoading(false);
                setLoadingText("");
                // await updateLens.updateLensState();
                console.log(
                    "Updated the lens state, returning transaction hash"
                );
                return tx.hash;
            } catch (error) {
                console.log("Error in Unfollowing profile", error);
                setIsLoading(false);
                setLoadingText("");
            }
        } else {
            console.log("Not getting profile ID to Unfollow");
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
