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
  hookMessages: any | undefined;
  streamClient: any | undefined;
  streamContext: any | undefined;
  initiate: (channel: any, userAddress: any) => void;
};

export const ChatContext = createContext<ChatContextType>({
  hookChannel: null,
  hookChat: null,
  hookMembers: null,
  hookChannels: [],
  hookMessages: {},
  streamClient: null,
  streamContext: null,
  initiate: (channel: any, userAddress?: any, appChannelIndex?: any) => {},
});

export const ChatProvider = ({ children }: any) => {
  const streamContext = useContext(StreamContext) as StreamContextType;  

  return (
    <ChatContext.Provider
      value={{
        hookChannel: streamContext?.hookChannel,
        hookChat: streamContext?.hookChat,
        hookMembers: streamContext?.hookMembers,
        hookChannels: streamContext?.hookChannels,
        hookMessages: streamContext?.hookMessages,
        streamClient: streamContext?.client,
        streamContext: streamContext,
        initiate: streamContext?.initiate,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};
