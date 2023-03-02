import { useState } from "react";
import {
    authenticate_user,
    generateChallenge,
    newRefreshToken
} from "../../helpers/lens/lens";
import { ethers } from "ethers";
import { signMessage } from '@wagmi/core';
import { logger } from "@/helpers/logger";

const useLensAuth = () => {
    const [token, setToken] = useState<any>(null);
    const [refreshToken, setRefreshToken] = useState<any>(null);
    const [isLoading, setIsLoading] = useState<any>();
    const [signButtonText, setSignButtonText] =
        useState<any>("Sign-In with Lens");

    const signText = async (text: any) => {
        var message = ethers.utils.toUtf8Bytes(text);
        const signature = await signMessage({ message: message });
        return signature;
    };

    const fetchLensToken = async (address: any) => {
        logger('lens', 'useLensAuth.fetchLensToken', 'Getting Lens Token from Lens and updating user lens data', [])
        setIsLoading(true);
        const promise = new Promise(async (resolve) => {
            try {
                const challenge = await generateChallenge(address);
                const signature = await signText(challenge);
                // const authRequest = await authenticate_user(signerAddress, signature);
    
                authenticate_user(address, signature).then((data) => {
                    logger("auth", "fetchLensToken", "Calling authenticate_user", [data]);
                    setToken(data["accessToken"]);
                    setRefreshToken(data["refreshToken"]);
    
                    // storing in async data
                    window.localStorage.setItem("accessToken", data["accessToken"]);
                    window.localStorage.setItem("refreshToken", data["refreshToken"]);
    
                    resolve({ accessToken: data["accessToken"], refreshToken: data["refreshToken"] })
                });
            } catch (error) {
                setSignButtonText("Couldn't sign request");
                setIsLoading(false);
            }
        });
        return promise;
        

        // setIsLoading(false);
    };

    // Get lens tokens from local storage
    const getLensTokens = async () => {
        const accessToken = window.localStorage.getItem("accessToken");
        const refreshToken = window.localStorage.getItem("refreshToken");
        return { accessToken: accessToken, refreshToken: refreshToken };
    };

    const getNewAccessToken = () => {
        newRefreshToken(refreshToken).then((data) => {
            setRefreshToken(data["refreshToken"]);
        });
    };

    const connectToLens = async (address: any) => {
        if (window.localStorage.getItem("accessToken")) {
            return getLensTokens();
        }
        return fetchLensToken(address);
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
