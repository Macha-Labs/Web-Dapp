import { logger } from "@/helpers/logger";
import React, { createContext, useContext, useState } from "react";
import useStreamChannel from "../hooks/stream/useStreamChannel";
import useStreamChannelMembers from "../hooks/stream/useStreamChannelMembers";
import useStreamChat from "../hooks/stream/useStreamChat";
import { StreamContext, StreamContextType } from "./StreamProvider";

type ChatContextType = {
  hookChannel: any | undefined;
  hookChat: any | undefined;
  hookMembers: any | undefined;
  hookChannels: any;
  initiate: (channel: any, userAddress: any) => void;
};

export const ChatContext = createContext<ChatContextType>({
  hookChannel: null,
  hookChat: null,
  hookMembers: null,
  hookChannels: [],
  initiate: (channel: any, userAddress?: any, appChannelIndex?: any) => {},
});

export const ChatProvider = ({children}: any) => {
    const [channelId, setChannelId] = useState<any>();
    const hookStreamChannel = useStreamChannel(channelId);
    const hookChat = useStreamChat(hookStreamChannel.channel);
    const hookStreamChannelMembers = useStreamChannelMembers(hookStreamChannel?.channel?.raw);
    const streamContext = useContext(StreamContext) as StreamContextType;

  const initiate = async (channel: any, userAddress?: any) => {
    logger(
      "channel",
      "ChatProvider.initiate",
      "Getting Channel from Stream",
      []
    );
    setChannelId(channel.id);
    clearUnreadCount(channel);
  };

  const clearUnreadCount = async (channel: any) => {
    // console.log("Marking all messages read in this channel");
    // await channel.raw?.markRead(); // setting the unread_count in the api to 0, but it is not setting it in the local state
    // let channelList = streamContext.channels;
    // console.log("The non-updated channel list is ", channelList);
    // channelList[appChannelIndex].unreadCountObject[userAddress].unread_messages = 0;
    // console.log("The updated channel list is ", channelList);
    // BUG: Channel unread count not updating in real-time
    // streamContext.setChannels(channelList);
  };

  return (
    <ChatContext.Provider
      value={{
        hookChannel: hookStreamChannel,
        hookChat: hookChat,
        hookMembers: hookStreamChannelMembers,
        hookChannels: streamContext?.hookChannels,
        initiate: initiate,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};
