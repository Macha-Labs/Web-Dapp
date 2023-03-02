import { createContext, useEffect, useState } from "react";
import { logger } from "../helpers/logger";
import useLensAuth from "../hooks/lens/useLensAuth";
import { UserDb$ } from "../schema/user";
// import { removeAsyncData } from "../service/AsyncStorageService";
import { useAccount, useDisconnect } from "wagmi";
import { putStreamToken } from "../service/StreamService";
import { findOrCreateUser } from "../service/UserService";
import useLensProfile from "@/hooks/lens/useLensProfile";
import { fetchSigner } from "@wagmi/core";

export type AuthContextType = {
  signer: any | undefined;
  address: any | undefined;
  connectWallet: () => void;
  connectLens: (param?: any) => void;
  authenticateWithLens: (param?: any) => void;
  disconnectWallet: () => void;
  user: any | undefined;
  setUser: (param: any) => void;
  updateUser: (...params: any) => void;
  isConnected: boolean | undefined;
};

export const AuthContext = createContext<AuthContextType>({
  signer: null,
  address: "",
  connectWallet: () => {},
  connectLens: param => {},
  authenticateWithLens: param => {},
  disconnectWallet: () => {},
  user: null,
  setUser: param => {},
  updateUser: (...params) => {},
  isConnected: false,
});

const AuthProvider = ({ children }: any) => {
  const [signer, setSigner] = useState<any>("");
  const [user, setUser] = useState<any>({});
  const { address, isConnected } = useAccount();
  const { disconnect } = useDisconnect();
  const [authenticated, setAuthenticated] = useState<any>();

  /** 
   * @description Initiating Hooks
   * 
   * 
   **/
  const hookLensProfile = useLensProfile();
  const hookLensAuth = useLensAuth();

  useEffect(() => {
    if (address && isConnected) {
      let accessToken = window.localStorage.getItem("accessToken");
      if (accessToken) {
        setAuthenticated(true);
        _fetchUserFromDB();
        // keep the authCard modal close and proceed to Chat page

      }
      else {
        setAuthenticated(false);
        // open the authCard modal and show connect to lens button.
      } 
    }
  },[address, isConnected]);



  /** 
   * @description Internal function to store user in provider
   * 
   * 
   **/
  const _updateUser = (key: any, data: any) => {
    logger("auth", "updateUser", "Updating user data", [key, data]);
    const newData: any = {};
    newData[key] = data;
    setUser({ ...user, ...newData });
  };
  

  /** 
   * @description Internal Function to get user from lens
   * 
   * 
   **/
  const _fetchUserFromLens = async () => {
    const lensProfile = await hookLensProfile.getOwnedProfiles(address); // getting user lens profile
    console.log("auth card lensprofile ", lensProfile);
    try {
      if (lensProfile) {
        const tokens: any | { accessToken: string; refreshToken: string } = hookLensAuth.getLensTokens();
        logger("auth", "_fetchUserFromLens", "Logging the lens auth tokens", [tokens]);
        if (tokens?.accessToken) {
          _updateUser("lens", {
            ...lensProfile,
            accessToken: tokens["accessToken"],
            refreshToken: tokens["refreshToken"],
          });
          setAuthenticated(true);
        }
      } else {
        throw Error(`Couldn't find Lens Profile with address ${address}`);
      }
    } catch (error) {
      logger("auth", "_fetchUserFromLens", "Error in fetching userData from Lens", [error]);
    }
  };

  /** 
   * @description Internal Function to get user from DB
   * 
   * 
   **/
  const _fetchUserFromDB = async () => {
    logger("auth", "useEffect[user.lens]", "User is", [user]);
    if (address) {
      // fetching the userData from the Database
      const promise = new Promise(async resolve => {
        let userData = await findOrCreateUser({address: address.toLowerCase()});
        userData = UserDb$(userData);
        const streamToken = await putStreamToken({userAddress: address.toLowerCase()});
        console.log("Getting the stream token", streamToken);
        resolve(_updateUser("db", UserDb$(streamToken)));
      });
      return promise;
      // findOrCreateUser({ address: address.toLowerCase() }).then((data: any) => {
      //   const userData = UserDb$(data);
      //   _updateUser("db", userData);
      //   putStreamToken({ userAddress: address.toLowerCase() }).then(
      //     (res: any) => {
      //       logger(
      //         "auth",
      //         "useEffect[user.db.id]",
      //         "response from putStreamToken api",
      //         [res]
      //       );
      //       _updateUser("db", UserDb$(res));
      //     }
      //   );
      // });
    }
  };

  /** 
   * @description Internal Function to get address from WAGMI
   * 
   * 
   **/
  const _fetchSignerFromWagmi = async () => {
    setSigner(await fetchSigner())
  } 

  
  /** 
   * @description Function to connect to wallet
   * 
   * 
   **/
  const connectWallet = async () => {
    logger("auth", "connectWallet", "Trigger connectWallet", []);
  };

  /** 
   * @description Function to disconnect from wallet
   * 
   * 
   **/
  const disconnectWallet = async () => {
    disconnect();
  };

  useEffect(() => {
    if (user) 
      logger("auth", "useEffect", "Logging user object", [user]);
  }, [user]);

  return (
    <AuthContext.Provider
      value={{
        signer: signer,
        address: address?.toLowerCase(),
        connectWallet: connectWallet,
        connectLens: _fetchUserFromLens,
        authenticateWithLens: hookLensAuth.fetchLensToken,
        disconnectWallet: disconnectWallet,
        user: user,
        setUser: setUser,
        updateUser: _updateUser,
        isConnected: isConnected,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
