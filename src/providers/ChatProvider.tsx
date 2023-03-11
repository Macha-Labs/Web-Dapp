import useXmtp from "@/hooks/xmtp/useXmtp";
import { createContext, useContext } from "react";
import { AuthContext } from "./AuthProvider";
import { StreamContext, StreamContextType } from "./StreamProvider";

export type ChatContextType = {
  hookChannel: any | undefined;
  hookChat: any | undefined;
  hookMembers: any | undefined;
  hookChannels: any | undefined;
  channels: any | undefined;
  streamClient: any | undefined;
  streamContext: any | undefined;
  initiate: (channel: any, userAddress: any) => void;
};

export const ChatContext = createContext<ChatContextType>({
  hookChannel: null,
  hookChat: null,
  hookMembers: null,
  hookChannels: [],
  channels: [],
  streamClient: null,
  streamContext: null,
  initiate: (channel: any, userAddress?: any, appChannelIndex?: any) => {},
});

export const ChatProvider = ({ children }: any) => {
  const streamContext = useContext(StreamContext) as StreamContextType;
  const xmtpContext = useXmtp();
  
  const _fetchChannels = (val: any) => {
    switch (val) {
      case 'stream':
        return streamContext?.hookChannels.channels;
      case 'xmtp':
        console.log('all conversations', xmtpContext.allConversations)
        return xmtpContext.allConversations;
    }
  }

  return (
    <ChatContext.Provider
      value={{
        hookChannel: streamContext?.hookChannel,
        hookChat: streamContext?.hookChat,
        hookMembers: streamContext?.hookMembers,
        hookChannels: streamContext?.hookChannels,
        streamClient: streamContext?.client,
        streamContext: streamContext,
        channels: _fetchChannels('xmtp'),
        initiate: streamContext?.initiate,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};
