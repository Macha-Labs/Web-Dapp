import { logger } from "@/helpers/logger";
import {createContext, useContext, useEffect, useRef, useState} from "react";
import useStreamClient from "../hooks/stream/useStreamClient";
import useStreamUserChannels from "../hooks/stream/useStreamUserChannels";
import {AuthContext, AuthContextType} from "./AuthProvider";

export type StreamContextType = {
    client: any | undefined;
    hookChannels: any | undefined;
};

export const StreamContext = createContext<StreamContextType>({
    client: null,
    hookChannels: [],
});

const StreamProvider = ({children}: any) => {
    const [client, setClient] = useState<any>();    
    const authContext = useContext(AuthContext) as AuthContextType;
    const hookStreamClient = useStreamClient();
    const hookChannels = useStreamUserChannels();

    

    useEffect(() => {
        hookStreamClient.connectToStream();
    }, [authContext?.user?.db?.tokens?.stream]);

    useEffect(() => {
        if (hookStreamClient.client?.user?.id) {
            setClient(hookStreamClient.client);
            console.log("The stream client is set", hookStreamClient.client);

            //sending a callback function with this
            hookChannels.fetchUserChannels(
                hookStreamClient.client,
            );
        }
    }, [hookStreamClient.client]);


    return (
        <StreamContext.Provider
            value={{
                client: client,
                hookChannels: hookChannels,
            }}
        >
            {children}
        </StreamContext.Provider>
    );
};
export default StreamProvider;
