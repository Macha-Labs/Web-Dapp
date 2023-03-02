import { createContext, useEffect, useState } from "react";
import { logger } from "../helpers/logger";
import useLensAuth from "../hooks/lens/useLensAuth";
import { User$, UserDb$ } from "../schema/user";
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
  authenticated: any | undefined;
  setUser: (param: any) => void;
  isConnected: boolean | undefined;
  isLoadingLens: boolean | undefined;
};

export const AuthContext = createContext<AuthContextType>({
  signer: null,
  address: "",
  connectWallet: () => {},
  connectLens: param => {},
  authenticateWithLens: param => {},
  disconnectWallet: () => {},
  user: null,
  authenticated: null,
  setUser: param => {},
  isConnected: false,
  isLoadingLens: false
});

const AuthProvider = ({ children }: any) => {
  const [signer, setSigner] = useState<any>("");
  const [user, setUser] = useState<any>(new User$(null, null, null));
  const { address, isConnected } = useAccount();
  const { disconnect } = useDisconnect();
  const [isLoadingLens, setLoadingLens] = useState<any>(false);

  /** 
   * @description Initiating Hooks
   * 
   * 
   **/
  const hookLensProfile = useLensProfile();
  const hookLensAuth = useLensAuth();

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
    if (!address) {
      logger("auth", "_fetchUserFromLens", "Address not found", [user]);
      return;
    }
    if (address != user.lens.ownedBy) {
      setLoadingLens(true);
      const lensProfile = await hookLensProfile.getOwnedProfiles(address); // getting user lens profile
      try {
        if (lensProfile) {
          const tokens: any | { accessToken: string; refreshToken: string } = await hookLensAuth.connectToLens(address);
          logger("auth", "_fetchUserFromLens", "Logging the lens auth tokens", [tokens]);
          setLoadingLens(false);
          if (tokens?.accessToken) {
            user.setLensDirect({
              ...lensProfile,
              accessToken: tokens["accessToken"],
              refreshToken: tokens["refreshToken"],
            });
          } else {
            user.setLensDirect(lensProfile);
          }
        } else {
          throw Error(`Couldn't find Lens Profile with address ${address}`);
        }
      } catch (error) {
        logger("auth", "_fetchUserFromLens", "Error in fetching userData from Lens", [error]);
      }
      return;
    }
  };

  const _authenticateUserWithLens = async() => {
    const lensProfile = await hookLensProfile.getOwnedProfiles(address); // getting user lens profile
    console.log("auth card lensprofile ", lensProfile);
    try {
      if (lensProfile) {
        const tokens: any | { accessToken: string; refreshToken: string } = await hookLensAuth.fetchLensToken(address);
        logger("auth", "_fetchUserFromLens", "Logging the lens auth tokens", [tokens]);
        if (tokens?.accessToken) {
          user.setLensDirect({
            ...lensProfile,
            accessToken: tokens["accessToken"],
            refreshToken: tokens["refreshToken"],
          });
          const userDbData: any = await _fetchUserFromDB();
          console.log("Logging the userDbData ",userDbData);
          user.setDb(userDbData);
        }
      } else {
        throw Error(`Couldn't find Lens Profile with address ${address}`);
      }
    } catch (error) {
      logger("auth", "_fetchUserFromLens", "Error in fetching userData from Lens", [error]);
    }
  }

  /** 
   * @description Internal Function to get user from DB
   * 
   * 
   **/
  const _fetchUserFromDB = async () => {
    if (address) {
      // fetching the userData from the Database
      findOrCreateUser({ address: address.toLowerCase() }).then((data: any) => {
        user.setDb(data);
        logger('auth', 'AuthProvider._fetchUserFromDB', 'Response from findOrCreateUser', [data]);
        putStreamToken({ userAddress: address.toLowerCase() }).then(
          (res: any) => {
            logger(
              "auth",
              "useEffect[user.db.id]",
              "response from putStreamToken api",
              [res]
            );
            user.setDb(res);
          }
        );
      });
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
        authenticateWithLens: _authenticateUserWithLens,
        disconnectWallet: disconnectWallet,
        user: user,
        setUser: setUser,
        isConnected: address && user?.lens?.id && user?.db?.id,
        isLoadingLens: isLoadingLens
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
