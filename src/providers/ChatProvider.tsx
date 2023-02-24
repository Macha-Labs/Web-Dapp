import { logger } from "@/helpers/logger";
import React, { createContext, useContext, useState } from "react";
import useStreamChannel from "../hooks/stream/useStreamChannel";
import useStreamChannelMembers from "../hooks/stream/useStreamChannelMembers";
import useStreamChat from "../hooks/stream/useStreamChat";
import { StreamContext, StreamContextType } from "./StreamProvider";

export type ChatContextType = {
  hookChannel: any | undefined;
  hookChat: any | undefined;
  hookMembers: any | undefined;
  hookChannels: any | undefined;
  streamClient: any | undefined;
  initiate: (channel: any, userAddress: any) => void;
};

export const ChatContext = createContext<ChatContextType>({
  hookChannel: null,
  hookChat: null,
  hookMembers: null,
  hookChannels: [],
  streamClient: null,
  initiate: (channel: any, userAddress?: any, appChannelIndex?: any) => {},
});

export const ChatProvider = ({ children }: any) => {
  const streamContext = useContext(StreamContext) as StreamContextType;  

  const clearUnreadCount = async (channel: any) => {
    // await channel.raw?.markRead(); // setting the unread_count in the api to 0, but it is not setting it in the local state
    // let channelList = streamContext.channels;
    // channelList[appChannelIndex].unreadCountObject[userAddress].unread_messages = 0;
    // BUG: Channel unread count not updating in real-time
    // streamContext.setChannels(channelList);
  };

  return (
    <ChatContext.Provider
      value={{
        hookChannel: streamContext?.hookChannel,
        hookChat: streamContext?.hookChat,
        hookMembers: streamContext?.hookMembers,
        hookChannels: streamContext?.hookChannels,
        streamClient: streamContext?.client,
        initiate: streamContext?.initiate,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};
