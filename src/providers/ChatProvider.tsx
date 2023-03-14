import useChat from "@/hooks/chat/useChat";
import { useRouter } from "next/router";
import { createContext, useContext } from "react";
import { StreamContext, StreamContextType } from "./StreamProvider";
import { XmtpContext } from "./XmtpProvider";


export type ChatContextType = {
  hookChannel: any | undefined;
  hookChat: any | undefined;
  hookMembers: any | undefined;
  channel: any | undefined;
  streamClient: any | undefined;
  streamContext: any | undefined;
};

export const ChatContext = createContext<ChatContextType>({
  hookChannel: null,
  hookChat: null,
  hookMembers: null,
  channel: null,
  streamClient: null,
  streamContext: null,
  // sendMessage: () => {},
});

export const ChatProvider = ({ children }: any) => {
  console.log('Checking for ChatProvider re-rendering');
  const streamContext = useContext(StreamContext) as StreamContextType;
  const xmtpContext = useContext(XmtpContext);
  const router = useRouter();
  const hookChat = useChat(streamContext.client, streamContext.hookChannel.channel);

  const _fetchChannel = () => {
    console.log('fetch channel');
    switch (router.pathname) {
      case "/chat":
        return streamContext?.hookChannel.channel;
      case "/chat/dm":
        return xmtpContext?.conversation;
    }
  };

  return (
    <ChatContext.Provider
      value={{
        hookChannel: streamContext?.hookChannel,
        hookChat: hookChat,
        hookMembers: streamContext?.hookMembers,
        streamClient: streamContext?.client,
        streamContext: streamContext,
        channel: _fetchChannel(),
        // sendMessage: _sendMessage(),
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};
