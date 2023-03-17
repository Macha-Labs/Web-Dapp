import { logger } from "@/helpers/logger";
import useStreamChannel from "@/hooks/stream/useStreamChannel";
import { createContext, useContext, useEffect } from "react";
import useStreamClient from "../hooks/stream/useStreamClient";
import { AuthContext, AuthContextType } from "./AuthProvider";

export type StreamContextType = {
    client: any | undefined;
    hookChannel: any | undefined;
    reloadChannel: () => void;
    initiate: (channel: any) => void;
};

export const StreamContext = createContext<StreamContextType>({
    client: null,
    hookChannel: {},
    reloadChannel: () => {},
    initiate: (channel: any) => {}
});

const StreamProvider = ({children}: any) => {
    console.log('Rendering >>>>> StreamProvider');
    const authContext = useContext(AuthContext) as AuthContextType;
    const hookStreamClient = useStreamClient();
    const hookStreamChannel = useStreamChannel(hookStreamClient.client);
   

    useEffect(() => {
        if (authContext?.isConnected && !hookStreamClient?.client) {
            hookStreamClient.connectToStream();
        }
    }, [authContext?.isConnected]);


    // useEffect(() => {
    //     if (authContext?.isConnected && hookStreamClient.client?.user?.id) {
    //         hookStreamChannels.fetchUserChannels(hookStreamClient.client);
    //     }
    // }, [hookStreamClient.client?.user?.id]);

    const reloadChannel = () => {
        hookStreamChannel.setUpChannel(hookStreamChannel?.channel?.id)
    }

    const initiate = async (channel: any) => {
        logger(
          "channel",
          "ChatProvider.initiate",
          "Getting Channel from Stream",
          [channel]
        );
        hookStreamChannel?.setUpChannel(channel?.id)
      };


    return (
        <StreamContext.Provider
            value={{
                client: hookStreamClient.client,
                hookChannel: hookStreamChannel,
                reloadChannel:  reloadChannel,
                initiate: initiate,
            }}
        >
            {children}
        </StreamContext.Provider>
    );
};
export default StreamProvider;
