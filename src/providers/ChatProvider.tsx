import useChat from "@/hooks/chat/useChat";
import useChatChannel from "@/hooks/chat/useChatChannel";
import useChatChannels from "@/hooks/chat/useChatChannels";
import { createContext, useContext } from "react";
import { StreamContext, StreamContextType } from "./StreamProvider";



export type ChatContextType = {
  hookChat: any | undefined;
  streamClient: any | undefined;
  streamContext: any | undefined;
};

export const ChatContext = createContext<ChatContextType>({
  hookChat: null,
  streamClient: null,
  streamContext: null,
});

export const ChatProvider = ({ children }: any) => {
  console.log('Rendering >>>>> ChatProvider');
  const streamContext = useContext(StreamContext) as StreamContextType;
  const hookChat = useChat(streamContext.client, streamContext.hookChannel.channel);
  // const hookChatChannel = useChatChannel();
  // const hookChatChannels = useChatChannels();

  // const _loadChannel = () => {
  //   hookChatChannel.reload()
  // }

  // const _removeChannel = () => {
  //   hookChatChannel.remove();
  // }

  // const _loadChannels = () => {
  //   hookChatChannels?.load();
  // }


  return (
    <ChatContext.Provider
      value={{
        hookChat: hookChat,
        streamClient: streamContext?.client,
        streamContext: streamContext,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};
