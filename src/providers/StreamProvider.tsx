import { logger } from "@/helpers/logger";
import {createContext, useContext, useEffect, useRef, useState} from "react";
import useStreamClient from "../hooks/stream/useStreamClient";
import useStreamUserChannels from "../hooks/stream/useStreamUserChannels";
import {AuthContext, AuthContextType} from "./AuthProvider";

export type StreamContextType = {
    client: any | undefined;
    channels: any | undefined;
    setChannels: (params: any) => void;
};

export const StreamContext = createContext<StreamContextType>({
    client: null,
    channels: [],
    setChannels: (params) => {},
});

const StreamProvider = ({children}: any) => {
    const [client, setClient] = useState<any>();
    const [channels, setChannels] = useState<any>([]);
    
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
                setChannels(channels)
            );
        }
    }, [hookStreamClient.client]);

    useEffect(() => {
        logger('channel', 'StreamProvider.useEffect[channels]', 'The channel Data was just updated', [channels])
    }, [channels]);



    return (
        <StreamContext.Provider
            value={{
                client,
                channels,
                setChannels,
            }}
        >
            {children}
        </StreamContext.Provider>
    );
};
export default StreamProvider;
