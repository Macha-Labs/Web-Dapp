import useXmtp from "@/hooks/xmtp/useXmtp";
import { useRouter } from "next/router";
import { createContext, useContext } from "react";
import { AuthContext } from "./AuthProvider";
import { StreamContext, StreamContextType } from "./StreamProvider";
import { XmtpContext } from "./XmtpProvider";

export type ChatContextType = {
  hookChannel: any | undefined;
  hookChat: any | undefined;
  hookMembers: any | undefined;
  hookChannels: any | undefined;
  channels: any | undefined;
  channel: any | undefined;
  streamClient: any | undefined;
  streamContext: any | undefined;
  initiate: (channel: any, userAddress: any) => void;
  // sendMessage: () => void;
};

export const ChatContext = createContext<ChatContextType>({
  hookChannel: null,
  hookChat: null,
  hookMembers: null,
  hookChannels: [],
  channels: [],
  channel: null,
  streamClient: null,
  streamContext: null,
  // sendMessage: () => {},
  initiate: (channel: any, userAddress?: any, appChannelIndex?: any) => {},
});

export const ChatProvider = ({ children }: any) => {
  const streamContext = useContext(StreamContext) as StreamContextType;
  const xmtpContext = useContext(XmtpContext);
  const router = useRouter();
  console.log("streamContext from chatContext", streamContext);

  const _fetchChannels = () => {
    switch (router.pathname) {
      case "/chat":
        return streamContext?.hookChannels.channels;
      case "/chat/dm":
        console.log("all conversations", xmtpContext.allConversations);
        return xmtpContext.allConversations;
    }
  };

  const _fetchChannel = () => {
    switch (router.pathname) {
      case "/chat":
        return streamContext?.hookChannel.channel;
      case "/chat/dm":
        return xmtpContext?.conversation;
    }
  };

  const _initiateChannel = () => {
    switch (router.pathname) {
      case "/chat":
        return streamContext?.initiate;
      case "/chat/dm":
        return xmtpContext.fetchXmtpConversation;
    }
  };

  return (
    <ChatContext.Provider
      value={{
        hookChannel: streamContext?.hookChannel,
        hookChat: streamContext?.hookChat,
        hookMembers: streamContext?.hookMembers,
        hookChannels: streamContext?.hookChannels,
        streamClient: streamContext?.client,
        streamContext: streamContext,
        channels: _fetchChannels(),
        channel: _fetchChannel(),
        initiate: _initiateChannel(),
        // sendMessage: _sendMessage(),
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};
