import { createContext, useEffect, useState } from "react";
import { logger } from "../helpers/logger";
import { User$ } from "../schema/user";
// import { removeAsyncData } from "../service/AsyncStorageService";
import useUserStore from "@/store/useUserStore";
import useAuthStore from "@/store/useAuthStore";
import { fetchSigner, watchAccount } from "@wagmi/core";
import { useAccount, useDisconnect } from "wagmi";
import { putStreamToken } from "../service/StreamService";
import { findOrCreateUser } from "../service/UserService";
import useMachaAuth from "@/hooks/studio/useMachaAuth";

export type AuthContextType = {
  signer: any | undefined;
  address: any | undefined;
  connectWallet: () => void;
  disconnectWallet: () => void;
  user: any | undefined;
  setUser: (param: any) => void;
  isConnected: any | undefined;
};

export const AuthContext = createContext<AuthContextType>({
  signer: null,
  address: null,
  connectWallet: () => {},
  disconnectWallet: () => {},
  user: null,
  setUser: param => {},
  isConnected: () => {},
});

const AuthProvider = ({ children }: any) => {
  const hookMachaAuth = useMachaAuth();
  
  const unwatch = watchAccount((account) => {if($address!=account){
    console.log(account, " . ", $address, "asdf")
    // window.location.href="https://metaworkhq.com"
  }})


  console.log('Rendering >>>>> AuthProvider');
  const [user, setUser] = useState<any>(new User$(null, null, null));
  const { address, isConnected } = useAccount();
  const { disconnect } = useDisconnect();

  //
  const $address = useAuthStore((state: any) => state.address);
  const $loadAddress = useAuthStore(((state: any) => state.loadAddress));
  const $signer = useAuthStore((state: any) => state.signer);
  const $loadSigner = useAuthStore(((state: any) => state.loadSigner));
  const $isConnected = useAuthStore((state: any) => state.connected);
  const $loadIsConnected = useAuthStore(((state: any) => state.loadIsConnected))

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
    const signer = await fetchSigner();
    $loadSigner(signer);
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
    logger('auth', 'useEffect[connected]', 'values', [address, isConnected, user?.db?.id])
    $loadIsConnected(isConnected && address && user?.db?.id  ? true : false)
  }, [address, isConnected, user?.db?.id]);


  return (
    <AuthContext.Provider
      value={{
        signer: $signer,
        address: $address,
        connectWallet: connectWallet,
        disconnectWallet: disconnectWallet,
        user: user,
        setUser: setUser,
        isConnected: $isConnected,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;