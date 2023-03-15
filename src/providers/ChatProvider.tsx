import useChat from "@/hooks/chat/useChat";
import { useRouter } from "next/router";
import { createContext, useContext } from "react";
import { StreamContext, StreamContextType } from "./StreamProvider";
import { XmtpContext } from "./XmtpProvider";


export type ChatContextType = {
  hookChat: any | undefined;
  channel: any | undefined;
  streamClient: any | undefined;
  streamContext: any | undefined;
};

export const ChatContext = createContext<ChatContextType>({
  hookChat: null,
  channel: null,
  streamClient: null,
  streamContext: null,
  // sendMessage: () => {},
});

export const ChatProvider = ({ children }: any) => {
  console.log('Rendering >>>>> ChatProvider');
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
        hookChat: hookChat,
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
