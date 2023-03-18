import useChat from "@/hooks/chat/useChat";
import useChatChannel from "@/hooks/chat/useChatChannel";
import useChatChannels from "@/hooks/chat/useChatChannels";
import useChatMembers from "@/hooks/chat/useChatMembers";
import { createContext, useContext } from "react";
import { StreamContext, StreamContextType } from "./StreamProvider";



export type ChatContextType = {
  hookChat: any | undefined;
  hookChannel: any | undefined;
  hookChannelList: any | undefined;
  hookMembers: any | undefined;
  streamClient: any | undefined;
  streamContext: any | undefined;
};

export const ChatContext = createContext<ChatContextType>({
  hookChat: null,
  hookChannel: null,
  hookChannelList: null,
  hookMembers: null,
  streamClient: null,
  streamContext: null,
});

export const ChatProvider = ({ children }: any) => {
  console.log('Rendering >>>>> ChatProvider');
  const streamContext = useContext(StreamContext) as StreamContextType;
  const hookChat = useChat(streamContext.client, streamContext.hookChannel.channel);
  const hookChatChannel = useChatChannel();
  const hookChatChannels = useChatChannels();
  const hookMembers = useChatMembers();


  return (
    <ChatContext.Provider
      value={{
        hookChat: hookChat,
        hookChannel: hookChatChannel,
        hookChannelList: hookChatChannels,
        hookMembers: hookMembers,
        streamClient: streamContext?.client,
        streamContext: streamContext,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};
