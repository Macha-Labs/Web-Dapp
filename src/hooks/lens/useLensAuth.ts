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
        setIsLoading(true);
        if (hookLensProfile?.userLens) {
            try {
                const challenge = await generateChallenge(address);
                const signature = await signText(challenge);
                // const authRequest = await authenticate_user(signerAddress, signature);

                authenticate_user(address, signature).then((data) => {
                    setToken(data["accessToken"]);
                    setRefreshToken(data["refreshToken"]);
                    // storing in async data
                    window.localStorage.setItem("accessToken", data["accessToken"]);
                    window.localStorage.setItem("refreshToken", data["refreshToken"]);
                    updateUser("lens", {
                        ...hookLensProfile.userLens,
                        accessToken: data["accessToken"],
                        refreshToken: data["refreshToken"],
                    });
                });
            } catch (error) {
                setSignButtonText("Couldn't sign request");
                setIsLoading(false);
            }
        } else {
        }
        // setIsLoading(false);
    };

    // Get lens tokens from local storage or new tokens
    const getLensTokens = async () => {
        let refreshToken;
        // const accessToken = await getAsyncData("accessToken");
        const accessToken = window.localStorage.getItem("accessToken");
        updateUser("lens", {
                ...hookLensProfile.userLens,
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
        if (window.localStorage.getItem("accessToken")) {
            getLensTokens();
        } else {
            fetchLensToken();
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
