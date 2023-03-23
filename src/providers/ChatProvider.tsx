import useChat from "@/hooks/chat/useChat";
import useChatChannel from "@/hooks/chat/useChatChannel";
import useChatChannels from "@/hooks/chat/useChatChannels";
import useChatMembers from "@/hooks/chat/useChatMembers";
import useChatMessage from "@/hooks/chat/useChatMessage";
import useChatMessages from "@/hooks/chat/useChatMessages";
import { createContext} from "react";


export type ChatContextType = {
  hookChat: any | undefined;
  hookChannel: any | undefined;
  hookChannelList: any | undefined;
  hookMembers: any | undefined;
  hookMessages: any | undefined;
  hookMessage: any | undefined;
};

export const ChatContext = createContext<ChatContextType>({
  hookChat: null,
  hookChannel: null,
  hookChannelList: null,
  hookMembers: null,
  hookMessages: null,
  hookMessage: null,
});

export const ChatProvider = ({ children }: any) => {
  console.log('Rendering >>>>> ChatProvider');
  const hookChat = useChat();
  const hookChatChannel = useChatChannel();
  const hookChatChannels = useChatChannels();
  const hookMessages = useChatMessages();
  const hookMessage = useChatMessage();
  const hookMembers = useChatMembers();

  return (
    <ChatContext.Provider
      value={{
        hookChat: hookChat,
        hookChannel: hookChatChannel,
        hookChannelList: hookChatChannels,
        hookMembers: hookMembers,
        hookMessages: hookMessages,
        hookMessage: hookMessage,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};
