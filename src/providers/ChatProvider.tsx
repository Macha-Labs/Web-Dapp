import useChat from "@/hooks/chat/useChat";
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
