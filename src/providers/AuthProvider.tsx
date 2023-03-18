import { createContext, useEffect, useState } from "react";
import { logger } from "../helpers/logger";
import useLensAuth from "../hooks/lens/useLensAuth";
import { User$ } from "../schema/user";
// import { removeAsyncData } from "../service/AsyncStorageService";
import { useAccount, useDisconnect } from "wagmi";
import { putStreamToken } from "../service/StreamService";
import { findOrCreateUser } from "../service/UserService";
import useLensProfile from "@/hooks/lens/useLensProfile";
import { fetchSigner } from "@wagmi/core";
import useXmtpAuth from "@/hooks/xmtp/useXmtpAuth";
import useUserStore from "@/store/useUserStore";

export type AuthContextType = {
  signer: any | undefined;
  address: any | undefined;
  connectWallet: () => void;
  connectLens: (param?: any) => void;
  connectXmtp: (param?: any) => void;
  disconnectWallet: () => void;
  user: any | undefined;
  setUser: (param: any) => void;
  isConnected: any | undefined;
  isLoadingLens: boolean | undefined;
  xmtpClient: any;
  xmtpClientAddress: string;
};

export const AuthContext = createContext<AuthContextType>({
  signer: null,
  address: "",
  connectWallet: () => {},
  connectLens: param => {},
  connectXmtp: param => {},
  disconnectWallet: () => {},
  user: null,
  setUser: param => {},
  isConnected: () => {},
  isLoadingLens: false,
  xmtpClient: undefined,
  xmtpClientAddress: "",
});

const AuthProvider = ({ children }: any) => {
  console.log('Rendering >>>>> AuthProvider');
  const [signer, setSigner] = useState<any>("");
  const [user, setUser] = useState<any>(new User$(null, null, null));
  const { address, isConnected } = useAccount();
  const { disconnect } = useDisconnect();
  const [isLoadingLens, setLoadingLens] = useState<any>(false);
  //
  const $address = useUserStore((state: any) => state.address);
  const $loadAddress = useUserStore(((state: any) => state.loadAddress))
  const $connected = useUserStore((state: any) => state.connected);
  const $loadConnected = useUserStore(((state: any) => state.loadConnected))

  /**
   * @description Initiating Hooks
   *
   *
   **/
  const hookLensProfile = useLensProfile();
  const hookLensAuth = useLensAuth();
  const hookXmtpAuth = useXmtpAuth();

  /**
   * @description Internal Function to get user from lens
   *
   *
   **/
  const _fetchUserFromLens = async (callBacks?: any) => {
    if (!address) {
      logger("auth", "_fetchUserFromLens", "Address not found", [user]);
      return;
    }
    if (address != user.lens.ownedBy) {
      setLoadingLens(true);
      const lensProfile = await hookLensProfile.getOwnedProfiles(address);
      try {
        if (lensProfile?.id) {
          const tokens: any | { accessToken: string; refreshToken: string } = await hookLensAuth.connectToLens(address);
          logger("auth", "_fetchUserFromLens", "Logging the lens auth tokens", [tokens]);
          
          if (tokens?.accessToken) {
            user.setLensDirect({
              ...lensProfile,
              accessToken: tokens["accessToken"],
              refreshToken: tokens["refreshToken"],
            });
          } else {
            user.setLensDirect(lensProfile);
          }
          setLoadingLens(false);
        } else {
          callBacks.noLensProfile();
          setLoadingLens(false);
        }
      } catch (error) {
        logger(
          "auth",
          "_fetchUserFromLens",
          "Error in fetching userData from Lens",
          [error]
        );
      }
    }
  };

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
        logger(
          "auth",
          "AuthProvider._fetchUserFromDB",
          "Response from findOrCreateUser",
          [data]
        );
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
    setSigner(await fetchSigner());
  };

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
    logger("auth", "useEffect[address]", "address", [address]);
    if (address) {
      $loadAddress(address.toLowerCase());
      _fetchSignerFromWagmi();
      _fetchUserFromDB();
    }
  }, [address]);

  useEffect(() => {
    if (user) logger("auth", "useEffect", "Logging user object", [user]);
  }, [user]);


  useEffect(() => {
    $loadConnected(isConnected && address && user?.lens?.id && user?.db?.id && hookXmtpAuth.xmtpClientAddress ? true : false)
  }, [address, isConnected, user?.lens?.id, user?.db?.id, hookXmtpAuth.xmtpClientAddress])

  const _connected = () => {
    return $connected;
  }

  return (
    <AuthContext.Provider
      value={{
        signer: signer,
        address: $address,
        connectWallet: connectWallet,
        connectLens: _fetchUserFromLens,
        connectXmtp: hookXmtpAuth.connectXmtp,
        disconnectWallet: disconnectWallet,
        user: user,
        setUser: setUser,
        isConnected: $connected,
        isLoadingLens: isLoadingLens,
        xmtpClient: hookXmtpAuth.xmtpClient,
        xmtpClientAddress: hookXmtpAuth.xmtpClientAddress,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
