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
          addTokenCookie("lens_access_token", data["accessToken"], 30);
          window.localStorage.setItem("lens_refresh_token", data["refreshToken"]);

          resolve({
            lens_access_token: data["accessToken"],
            lens_refresh_token: data["refreshToken"],
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
    const lens_access_token = getCookie("lens_access_token");
    const lens_refresh_token = window.localStorage.getItem("lens_refresh_token");
    if (lens_access_token)
        return { lens_access_token: lens_access_token, lens_refresh_token: lens_refresh_token };
    return {lens_refresh_token: lens_refresh_token};
  };

  const getNewAccessToken = (lens_refresh_token: string) => {
    newRefreshToken(lens_refresh_token).then((data) => {
      console.log("Data access token", data);
      addTokenCookie("lens_access_token", data["accessToken"]);
      window.localStorage.setItem("lens_refresh_token", data["refreshToken"]);
    });
    return true;
  };

  const connectToLens = async (address: any) => {
    let tokens: any = getLensTokens();
    console.log("logging tokens ", tokens);
    if (tokens?.lens_access_token && tokens?.lens_refresh_token)
        return tokens;
    else if(tokens?.lens_refresh_token) { // if no accessToken, but have refreshToken
      return getNewAccessToken(tokens?.lens_refresh_token);
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
