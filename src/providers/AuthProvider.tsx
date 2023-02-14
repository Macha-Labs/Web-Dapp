import { useWalletConnect } from "@walletconnect/react-native-dapp";
import { ethers } from "ethers";
import { createContext, useEffect, useMemo, useState } from "react";
import { logger } from "../helpers/logger";
import useLensAuth from "../hooks/lens/useLensAuth";
import useStreamClient from "../hooks/stream/useStreamClient";
import { UserDb$ } from "../schema/user";
import { removeAsyncData } from "../service/AsyncStorageService";
import { putStreamToken } from "../service/StreamService";
import { findOrCreateUser } from "../service/UserService";


export type AuthContextType = {
    signer: any | undefined;
    address: any | undefined;
    connectWallet: () => void;
    disconnectWallet: () => void;
    connector: any;
    user: any | undefined;
    setUser: (param) => void;
    updateUser: (...params) => void;
    testingFunction: () => void;
    streamClient: any | undefined;
    connectLens: () => void;
    authToken: any | undefined;
};

export const AuthContext = createContext<AuthContextType>({
    signer: null,
    address: "",
    connectWallet: () => {},
    disconnectWallet: () => {},
    connector: null,
    user: null,
    setUser: (param) => {},
    updateUser: (...params) => {},
    testingFunction: () => {},
    streamClient: null,
    connectLens: () => {},
    authToken: null,
});

const AuthProvider = ({children}) => {
    const connector = useWalletConnect();
    const [signer, setSigner] = useState<any>("");
    const [address, setAddress] = useState<any>();
    const [user, setUser] = useState<any>();
    const [streamClient, setStreamClient] = useState<any>();


    // const provider = new ethers.providers.JsonRpcProvider(
    //   "https://polygon-mainnet.g.alchemy.com/v2/mVc4fkR9Ie98VuFA0EeRgGVM3LYLBfHh",
    //   "matic"
    // );

    // const provider = new ethers.providers.JsonRpcProvider(
    //   "https://polygon-mumbai.g.alchemy.com/v2/rOwXJQfWxqJtdoT9jlVFnj-g_M4nuu8J",
    //   "maticmum"
    // )

    const provider = new ethers.providers.JsonRpcProvider(
        "https://rpc-mumbai.maticvigil.com"
    );

    const updateUser = (key, data) => {
        logger('auth', 'updateUser', "Updating user data", [key, data]);
        const newData = {};
        newData[key] = data;
        setUser({...user, ...newData});
    };

    const hookLensAuth = useLensAuth(address, updateUser);
    const authToken = hookLensAuth.accessToken;
    const hookStreamClient = useStreamClient();

    // connecting user wallet
    const connectWallet = async () => {
        logger('auth', 'connectWallet', 'Trigger connectWallet', []);
        const promise = new Promise(async (resolve, reject) => {
            if (connector && !connector.connected) {
                resolve(await connector.connect());
                logger('auth', 'connectWallet','Wallet is not connected', [connector.accounts]);
            } else {
                resolve(null);
                logger('auth', 'connectWallet','Wallet is connected', [connector.accounts]);
            }
            //TODO: resolving promise issue
        });
        return promise;
    };

    // Disconnecting user Wallet
    const disconnectWallet = async () => {
        logger('auth', 'disconnectWallet', 'Trigger disconnectWallet', []);
        removeAsyncData("accessToken");
        await connector.killSession();
        resetToDefault();        
    };

    const resetToDefault = () => {
        // the lens data in the useLensProfile should also be set to default
        setAddress(null);
        setUser(null);
        hookLensAuth.setLensProfile(null);
    };

    const testingFunction = async () => {
        hookStreamClient.connectToStream();
    };

    const connectLens = () => {
        hookLensAuth.connect();
    };

    // setting the address in context
    useEffect(() => {
        logger('auth', 'useEffect[connect.accounts]', 'run', [])
        if (connector.connected) {
            logger('auth', 'useEffect[connect.accounts]', 'connector is connected', [ provider.connection])
            setAddress(connector.accounts[0]);
            console.log("Re-connecting address ", connector.accounts[0]);
            const balance = provider.getBalance(connector.accounts[0]);
            const signer = provider.getSigner(connector.accounts[0]);
            setSigner(signer);
        }
    }, [connector.accounts]);

    useEffect(() => {
        logger('auth', 'useEffect[user]', 'User is', [user])
    }, [user]);

    // fetch the lens account when the wallet is connected

    useEffect(() => {
        if (address) {
            logger('auth', 'useEffect[address]', "Address is ", [address]);
        }
    }, [address])

    useMemo(() => {
        logger('auth', 'useMemo[user.lens]', 'User is',  [user])
        if (address) {
            logger('auth', 'useMemo[user.lens]','requesting user from DB with address', [address])
            findOrCreateUser({
                address: address.toLowerCase(),
            }).then((data) => {
                logger('auth', 'useMemo[user.lens]', 'response of user from DB', [JSON.stringify(data)]);
                updateUser("db", UserDb$(data));
            });
        }
    }, [user?.lens])

    // useEffect(() => {
    //     console.log("User profile in AuthProvider ", user);
    //     if (address) {
    //         console.log("calling the findorCreateUser service function");
    //         findOrCreateUser({
    //             address: address.toLowerCase(),
    //         }).then((data) => {
    //             console.log("Find or create user", JSON.stringify(data));
    //             updateUser("db", UserDb$(data));
    //         });
    //     }
    // }, [address]);

    useEffect(() => {
        logger('auth', 'useEffect[user.db.id]', 'run', [])
        if (user?.db?.id && !user?.db?.tokens?.stream) {
            putStreamToken({userAddress: address}).then((res) => {
                logger('auth', 'useEffect[user.db.id]', 'response from putStreamToken api', [res])
                updateUser("db", UserDb$(res));
            });
        }
        // hookStreamClient.connectStreamClient();
    }, [user?.db?.id]);

    return (
        <AuthContext.Provider
            value={{
                signer,
                address,
                connectWallet,
                disconnectWallet,
                connector,
                user,
                setUser,
                updateUser,
                testingFunction,
                streamClient,
                connectLens,
                authToken,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
