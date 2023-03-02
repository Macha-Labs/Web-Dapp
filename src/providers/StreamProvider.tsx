import { logger } from "@/helpers/logger";
import useStreamChannel from "@/hooks/stream/useStreamChannel";
import useStreamChannelMembers from "@/hooks/stream/useStreamChannelMembers";
import useStreamChat from "@/hooks/stream/useStreamChat";
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
    hookChat: {},
    reloadMembers: () => {},
    reloadChannel: () => {},
    reloadChannelList: () => {},
    initiate: (channel: any, userAddress: any) => {}
});

const StreamProvider = ({children}: any) => {
    const authContext = useContext(AuthContext) as AuthContextType;

    const hookStreamClient = useStreamClient();
    const hookStreamChannels = useStreamUserChannels(hookStreamClient.client);
    const hookStreamChannel = useStreamChannel(hookStreamClient.client);
    const hookStreamChannelMembers = useStreamChannelMembers(hookStreamChannel?.channel);
    const hookStreamChat = useStreamChat(hookStreamClient.client, hookStreamChannel?.channel);

    useEffect(() => {
        if (authContext?.isConnected && !hookStreamClient?.client) {
            hookStreamClient.connectToStream();
        }
    }, [authContext?.isConnected]);


    useEffect(() => {
        if (authContext?.isConnected && hookStreamClient.client?.user?.id) {
            hookStreamChannels.fetchUserChannels();
        }
    }, [hookStreamClient.client?.user?.id]);

    
    const reloadMembers = () => {
        hookStreamChannelMembers.fetchChannelMembers()
    }

    const reloadChannel = () => {
        hookStreamChannel.setUpChannel(hookStreamChannel?.channel?.id)
    }

    const reloadChannelList = () => {
        hookStreamChannels.fetchUserChannels();
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
                hookChat: hookStreamChat,
                reloadMembers: reloadMembers,
                reloadChannel:  reloadChannel,
                reloadChannelList: reloadChannelList,
                initiate: initiate
            }}
        >
            {children}
        </StreamContext.Provider>
    );
};
export default StreamProvider;
