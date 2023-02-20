import { createContext, useEffect, useState } from "react";
import { logger } from "../helpers/logger";
import useLensAuth from "../hooks/lens/useLensAuth";
import { UserDb$ } from "../schema/user";
// import { removeAsyncData } from "../service/AsyncStorageService";
import { useAccount, useDisconnect } from 'wagmi';
import { putStreamToken } from "../service/StreamService";
import { findOrCreateUser } from "../service/UserService";
import useLensProfile from "@/hooks/lens/useLensProfile";

export type AuthContextType = {
    signer: any | undefined;
    address: any | undefined;
    connectWallet: () => void;
    connectLens: (param: any) => void;
    disconnectWallet: () => void;
    user: any | undefined;
    setUser: (param: any) => void;
    updateUser: (...params: any) => void;
    isConnected: boolean | undefined;
};

export const AuthContext = createContext<AuthContextType>({
    signer: null,
    address: "",
    connectWallet: () => { },
    connectLens: (param) => {},
    disconnectWallet: () => { },
    user: null,
    setUser: (param) => { },
    updateUser: (...params) => { },
    isConnected: false
});

const AuthProvider = ({ children }: any) => {
    const [signer, setSigner] = useState<any>("");
    const [user, setUser] = useState<any>();
    const { address, isConnected } = useAccount();
    const { disconnect } = useDisconnect();

    // callback for useLensAuth
    const updateUser = (key: any, data: any) => {
        logger('auth', 'updateUser', "Updating user data", [key, data]);
        const newData: any = {};
        newData[key] = data;
        setUser({ ...user, ...newData });
    };

    // custom hooks
    const hookLensAuth = useLensAuth();
    const hookLensProfile = useLensProfile();

    // connecting user wallet
    const connectWallet = async () => {
        logger('auth', 'connectWallet', 'Trigger connectWallet', []);
    };

    // Disconnecting user Wallet
    const disconnectWallet = async () => {
        disconnect();
    };

    const userDataFromDB = async () => {
        logger('auth', 'useEffect[user.lens]', 'User is', [user])
        if (address) {
            // fetching the userData from the Database
            findOrCreateUser({ address: address.toLowerCase() }).then((data: any) => {
                const userData = UserDb$(data);
                console.log("Presenting the userData from findOrCreateUser ", userData);
                updateUser("db", userData);
                putStreamToken({ userAddress: address.toLowerCase() }).then((res: any) => {
                    logger('auth', 'useEffect[user.db.id]', 'response from putStreamToken api', [res])
                    updateUser("db", UserDb$(res));
                });
                // if (userData?.id && !userData.tokens?.stream) {
                //     putStreamToken({userAddress: address}).then((res: any) => {
                //         logger('auth', 'useEffect[user.db.id]', 'response from putStreamToken api', [res])
                //         updateUser("db", UserDb$(res));
                //     });
                // }
            });
        }
    }

    useEffect(() => {
        logger("auth", "useEffect", "Current user address", [address]);
        const lensAuthenticate = async () => {
            const lensProfile = await hookLensProfile.getOwnedProfiles(address);
            console.log("Fetched lens profile = ", lensProfile);
            if (lensProfile) {
                const tokens: any | { accessToken: string, refreshToken: string } = await hookLensAuth.connectToLens(address);
                if (tokens?.accessToken) {
                    updateUser("lens", {
                        ...lensProfile,
                        accessToken: tokens['accessToken'],
                        refreshToken: tokens['refreshToken']
                    });
                } else {
                    updateUser("lens", lensProfile);
                }
            } else {
                throw Error(`Couldn't find Lens Profile with address ${address}`);
            }
        }

        if (address) {
            lensAuthenticate();
            userDataFromDB();
            console.log("Updated the userData ", user);
        }
    }, [address]);

    useEffect(() => {
        if (user)
        logger("auth", "useEffect", "Logging the userData", [user]);
    }, [user]);

    return (
        <AuthContext.Provider
            value={{
                signer: signer,
                address: address?.toLowerCase(),
                connectWallet: connectWallet,
                connectLens: hookLensAuth.connectToLens,
                disconnectWallet: disconnectWallet,
                user: user,
                setUser: setUser,
                updateUser: updateUser,
                isConnected: isConnected,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
