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

    const setChannelsCallback = (channels: any) => {
        setChannels(channels);
    };

    useEffect(() => {
        if (hookStreamClient.client?.user?.id) {
            setClient(hookStreamClient.client);
            console.log("The stream client is set", hookStreamClient.client);

            //sending a callback function with this
            hookChannels.fetchUserChannels(
                hookStreamClient.client,
                setChannelsCallback
            );
        }
    }, [hookStreamClient.client]);

    useEffect(() => {
        console.log("The channels data was just updated");
        console.log(channels);
    }, [channels]);

    // const [providerState, setProviderState] = useState<StreamContextType>({
    //   client,
    //   channels,
    //   messages,
    //   loadingMessages,
    // });

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
