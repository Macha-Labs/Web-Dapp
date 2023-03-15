import { logger } from "@/helpers/logger";
import useStreamChannel from "@/hooks/stream/useStreamChannel";
import useStreamChannelMembers from "@/hooks/stream/useStreamChannelMembers";
import useChat from "@/hooks/chat/useChat";
import { createContext, useContext, useEffect } from "react";
import useStreamClient from "../hooks/stream/useStreamClient";
import useStreamUserChannels from "../hooks/stream/useStreamUserChannels";
import { AuthContext, AuthContextType } from "./AuthProvider";

export type StreamContextType = {
    client: any | undefined;
    hookChannels: any | undefined;
    hookChannel: any | undefined;
    hookMembers: any | undefined;
    reloadMembers: () => void;
    reloadChannel: () => void;
    reloadChannelList: () => void;
    initiate: (channel: any, userAddress: any) => void;
};

export const StreamContext = createContext<StreamContextType>({
    client: null,
    hookChannels: [],
    hookChannel: {},
    hookMembers: {},
    reloadMembers: () => {},
    reloadChannel: () => {},
    reloadChannelList: () => {},
    initiate: (channel: any, userAddress: any) => {}
});

const StreamProvider = ({children}: any) => {
    console.log("Checking for StreamProvider re-rendering")
    const authContext = useContext(AuthContext) as AuthContextType;
    const hookStreamClient = useStreamClient();
    const hookStreamChannels = useStreamUserChannels(hookStreamClient.client);
    const hookStreamChannel = useStreamChannel(hookStreamClient.client);
    const hookStreamChannelMembers = useStreamChannelMembers(hookStreamChannel?.channel);
   

    useEffect(() => {
        if (authContext?.isConnected && !hookStreamClient?.client) {
            hookStreamClient.connectToStream();
        }
    }, [authContext?.isConnected]);


    useEffect(() => {
        if (authContext?.isConnected && hookStreamClient.client?.user?.id) {
            hookStreamChannels.fetchUserChannels(hookStreamClient.client);
        }
    }, [hookStreamClient.client?.user?.id]);


    const _fetchMessages = () => {
        return [];
    }

    
    const reloadMembers = () => {
        hookStreamChannelMembers.fetchChannelMembers()
    }

    const reloadChannel = () => {
        hookStreamChannel.setUpChannel(hookStreamChannel?.channel?.id)
    }

    const reloadChannelList = () => {
        setTimeout(() => {
            hookStreamChannels.fetchUserChannels(hookStreamClient.client);
        }, 100);
    }

    const initiate = async (channel: any, userAddress?: any) => {
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
                hookChannels: hookStreamChannels,
                hookChannel: hookStreamChannel,
                hookMembers: hookStreamChannelMembers,
                reloadMembers: reloadMembers,
                reloadChannel:  reloadChannel,
                reloadChannelList: reloadChannelList,
                initiate: initiate,
            }}
        >
            {children}
        </StreamContext.Provider>
    );
};
export default StreamProvider;
