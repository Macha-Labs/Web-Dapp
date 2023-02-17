import {useEffect, useState} from "react";
import {
    authenticate_user,
    generateChallenge,
    newRefreshToken,
} from "../../helpers/lens/lens";
import {ethers} from "ethers";
import useLensProfile from "./useLensProfile";
import { useSignMessage } from 'wagmi'

const useLensAuth = (address: any, updateUser: any) => {
    const hookLensProfile = useLensProfile(address);
    const [token, setToken] = useState<any>(null);
    const [refreshToken, setRefreshToken] = useState<any>(null);
    const [isLoading, setIsLoading] = useState<any>();
    const [signButtonText, setSignButtonText] =
        useState<any>("Sign-In with Lens");

    const signText = async (text: any) => {
        console.log("Signing the message");
        var message = ethers.utils.toUtf8Bytes(
            "\x19Ethereum Signed Message:\n" + text.length + text
        );
        let msg = ethers.utils.keccak256(message);
        // const params = [address, msg];
        const {data, isError, isLoading, isSuccess, signMessage} = useSignMessage({
            message: msg
        });
        return data;
    };

    const fetchLensToken = async () => {
        console.log("signerAddress", address);
        setIsLoading(true);
        if (hookLensProfile?.lensData) {
            try {
                console.log("enter try");
                const challenge = await generateChallenge(address);
                console.log("Challenge generated ", challenge);
                const signature = await signText(challenge);
                // const authRequest = await authenticate_user(signerAddress, signature);
                console.log("Got signature", signature);

                authenticate_user(address, signature).then((data) => {
                    console.log("Lens Tokens", data);
                    setToken(data["accessToken"]);
                    setRefreshToken(data["refreshToken"]);
                    // storing in async data
                    //
                    updateUser("lens", {
                        ...hookLensProfile.lensData,
                        accessToken: data["accessToken"],
                        refreshToken: data["refreshToken"],
                    });
                });
            } catch (error) {
                console.log("Couldn't Sign request");
                console.log(error);
                setSignButtonText("Couldn't sign request");
                setIsLoading(false);
            }
        } else {
            console.log("Couldn't find any Lens profile with this address");
        }
        // setIsLoading(false);
    };

    // Get lens tokens from local storage or new tokens
    const getLensTokens = async () => {
        let refreshToken;
        console.log("Getting the lens data ", hookLensProfile.lensData);
        // const accessToken = await getAsyncData("accessToken");
        const accessToken = "";
        console.log("accessToken from Async storage ", accessToken);
        updateUser("lens", {
                ...hookLensProfile.lensData,
                accessToken: accessToken,
                refreshToken: refreshToken,
            });
    };

    const connect = () => {
        fetchLensToken();
    };

    const getNewAccessToken = () => {
        newRefreshToken(refreshToken).then((data) => {
            setRefreshToken(data["refreshToken"]);
        });
    };

    useEffect(() => {
        if (address) {
            console.log("Checking connected address", address);
            getLensTokens();
        }
    }, [hookLensProfile.userLens?.id]);

    return {
        accessToken: token,
        refreshToken: refreshToken,
        isLoading: isLoading,
        signButtonText: signButtonText,
        connect: connect,
        setLensProfile: hookLensProfile.setLensProfile
    };
};

export default useLensAuth;
