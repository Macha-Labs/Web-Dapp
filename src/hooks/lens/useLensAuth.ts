import { useState } from "react";
import {
  authenticate_user,
  generateChallenge,
  newRefreshToken,
} from "../../helpers/lens/lens";
import { ethers } from "ethers";
import { signMessage } from "@wagmi/core";
import { logger } from "@/helpers/logger";
import { addTokenCookie, getCookie } from "@/helpers/storage/browserStorage";

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
    logger(
      "lens",
      "useLensAuth.fetchLensToken",
      "Getting Lens Token from Lens and updating user lens data",
      []
    );
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
          addTokenCookie("accessToken", data["accessToken"], 30);
          window.localStorage.setItem("refreshToken", data["refreshToken"]);

          resolve({
            accessToken: data["accessToken"],
            refreshToken: data["refreshToken"],
          });
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
  const getLensTokens = () => {
    const accessToken = getCookie("accessToken");
    const refreshToken = window.localStorage.getItem("refreshToken");
    if (accessToken)
        return { accessToken: accessToken, refreshToken: refreshToken };
    return { refreshToken: refreshToken };
  };

  const getNewAccessToken = (refreshToken:any) => {
    newRefreshToken(refreshToken).then((data) => {
      console.log("refreshtokens",data);
      setRefreshToken(data["refreshToken"]);
      addTokenCookie("accessToken",data["accessToken"]);
    });
    return true;
  };

  const connectToLens = async (address: any) => {
    let tokens = getLensTokens();
    console.log("logging tokens ", tokens);
    if (tokens?.accessToken)
        return tokens;
    else if(tokens?.refreshToken){
      return getNewAccessToken(tokens?.refreshToken);
    }

    return fetchLensToken(address);
  };

  return {
    accessToken: token,
    refreshToken: refreshToken,
    isLoading: isLoading,
    signButtonText: signButtonText,
    connectToLens: connectToLens,
  };
};

export default useLensAuth;
