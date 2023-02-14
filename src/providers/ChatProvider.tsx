import React, {createContext, useContext, useState} from "react";
import useStreamChannel from "../hooks/stream/useStreamChannel";
import useStreamChannelMembers from "../hooks/stream/useStreamChannelMembers";
import useStreamChat from "../hooks/stream/useStreamChat";
import {StreamContext, StreamContextType} from "./StreamProvider";

export const ChatContext = createContext({
    hookChannel: null,
    hookChat: null,
    hookMembers: null,
    initiate: (channel, userAddress?, appChannelIndex?) => {},
});

export const ChatProvider = ({children}) => {
    const [channelId, setChannelId] = useState<any>();
    const hookStreamChannel = useStreamChannel(channelId);
    const hookChat = useStreamChat(hookStreamChannel.channel);
    const hookStreamChannelMembers = useStreamChannelMembers(
        hookStreamChannel?.channel?.raw
    );
    const streamContext = useContext(StreamContext) as StreamContextType;

    const initiate = async (channel, userAddress?, appChannelIndex?) => {
        console.log("ChatProvider.initiate called");
        setChannelId(channel.id);
        console.log("Marking all messages read in this channel");
        await channel.raw.markRead(); // setting the unread_count in the api to 0, but it is not setting it in the local state
        let channelList = streamContext.channels;
        console.log("The non-updated channel list is ", channelList);
        channelList[appChannelIndex].unreadCountObject[userAddress].unread_messages = 0;
        console.log("The updated channel list is ", channelList);

        // BUG: Channel unread count not updating in real-time
        streamContext.setChannels(channelList);
    };

    return (
        <ChatContext.Provider
            value={{
                hookChannel: hookStreamChannel,
                hookChat: hookChat,
                hookMembers: hookStreamChannelMembers,
                initiate: initiate,
            }}
        >
            {children}
        </ChatContext.Provider>
    );
};
