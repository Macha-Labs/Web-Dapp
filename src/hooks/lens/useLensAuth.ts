import { logger } from "@/helpers/logger";
import { ethers } from "ethers";
import { useState } from "react";
import { useSignMessage } from 'wagmi';
import {
    authenticate_user,
    generateChallenge,
    newRefreshToken
} from "../../helpers/lens/lens";

const useLensAuth = () => {
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
        const { data, isError, isLoading, isSuccess, signMessage } = useSignMessage({
            message: msg
        });
        return data;
    };

    const fetchLensToken = async (address: any) => {
        setIsLoading(true);
        if (address) {
            try {
                const challenge = await generateChallenge(address);
                const signature = await signText(challenge);
                // const authRequest = await authenticate_user(address, signature);

                authenticate_user(address, signature).then((data) => {
                    logger("auth", "fetchLensToken", "Calling authenticate_user", [data]);
                    setToken(data["accessToken"]);
                    setRefreshToken(data["refreshToken"]);
                    // storing in localstorage data
                    window.localStorage.setItem("accessToken", data["accessToken"]);
                    window.localStorage.setItem("refreshToken", data["refreshToken"]);

                    return {accessToken: data["accessToken"], refreshToken: data["refreshToken"]}
                });
            } catch (error) {
                setSignButtonText("Couldn't sign request");
                setIsLoading(false);
            }
        } else {
            throw Error("User address was not provided");
        }
        // setIsLoading(false);
    };

    // Get lens tokens from local storage
    const getLensTokens = async () => {
        const accessToken = window.localStorage.getItem("accessToken");
        const refreshToken = window.localStorage.getItem("refreshToken");
        return {accessToken: accessToken, refreshToken: refreshToken};
    };

    const getNewAccessToken = () => {
        newRefreshToken(refreshToken).then((data) => {
            setRefreshToken(data["refreshToken"]);
        });
    };

    const connectToLens = async (address: any) => {
        if (window.localStorage.getItem("accessToken")) {
            return getLensTokens();
        } else {
            return fetchLensToken(address);
        }
    }

    return {
        accessToken: token,
        refreshToken: refreshToken,
        isLoading: isLoading,
        signButtonText: signButtonText,
        connectToLens: connectToLens
    };
};

export default useLensAuth;
