import useChat from "@/hooks/chat/useChat";
import useChatChannel from "@/hooks/chat/useChatChannel";
import useChatChannelStore from "@/store/useChatChannelStore";
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
});

export const ChatProvider = ({ children }: any) => {
  console.log('Rendering >>>>> ChatProvider');
  const streamContext = useContext(StreamContext) as StreamContextType;
  const hookChat = useChat(streamContext.client, streamContext.hookChannel.channel);
  const storeChannel = useChatChannelStore((state: any) => state.channel)


  return (
    <ChatContext.Provider
      value={{
        hookChat: hookChat,
        streamClient: streamContext?.client,
        streamContext: streamContext,
        channel: storeChannel
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};
