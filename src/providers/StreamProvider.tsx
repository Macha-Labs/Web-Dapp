import { logger } from "@/helpers/logger";
import useStreamChannel from "@/hooks/stream/useStreamChannel";
import useStreamChannelMembers from "@/hooks/stream/useStreamChannelMembers";
import useStreamChat from "@/hooks/stream/useStreamChat";
import { channel } from "diagnostics_channel";
import {createContext, useContext, useEffect, useState} from "react";
import useStreamClient from "../hooks/stream/useStreamClient";
import useStreamUserChannels from "../hooks/stream/useStreamUserChannels";
import {AuthContext, AuthContextType} from "./AuthProvider";

export type StreamContextType = {
    client: any | undefined;
    hookChannels: any | undefined;
    hookChannel: any | undefined;
    hookMembers: any | undefined;
    hookChat: any | undefined;
    initiate: (channel: any, userAddress: any) => void;
};

export const StreamContext = createContext<StreamContextType>({
    client: null,
    hookChannels: [],
    hookChannel: {},
    hookMembers: {},
    hookChat: {},
    initiate: (channel: any, userAddress: any) => {}
});

const StreamProvider = ({children}: any) => {
    const [client, setClient] = useState<any>();    
    const authContext = useContext(AuthContext) as AuthContextType;
    const hookStreamClient = useStreamClient();
    const hookStreamChannels = useStreamUserChannels();
    const hookStreamChannel = useStreamChannel(hookStreamClient.client);
    const hookStreamChannelMembers = useStreamChannelMembers(hookStreamChannel?.channel?.raw);
    const hookStreamChat = useStreamChat(hookStreamChannel?.channel);

    

    useEffect(() => {
        if (authContext?.user?.lens?.id) {
            hookStreamClient.connectToStream();
        }
    }, [authContext?.user?.lens?.id]);

    useEffect(() => {
        if (hookStreamClient.client?.user?.id) {
            setClient(hookStreamClient.client);
            hookStreamChannels.fetchUserChannels(
                hookStreamClient.client,
            );
        }
    }, [hookStreamClient.client?.user?.id]);

    useEffect(() => {
        if (hookStreamChannels?.channels?.length) {
            initiate(hookStreamChannels?.channels[0]);
        }
    }, [hookStreamChannels?.channels])

    const initiate = async (channel: any, userAddress?: any) => {
        logger(
          "channel",
          "ChatProvider.initiate",
          "Getting Channel from Stream",
          [channel]
        );
        hookStreamChannel?.setUpChannel(channel?.id)
      };

    const reload = () => {
        
    }

    return (
        <StreamContext.Provider
            value={{
                client: client,
                hookChannels: hookStreamChannels,
                hookChannel: hookStreamChannel,
                hookMembers: hookStreamChannelMembers,
                hookChat: hookStreamChat,
                initiate: initiate
            }}
        >
            {children}
        </StreamContext.Provider>
    );
};
export default StreamProvider;
