import { AuthContext, AuthContextType } from "@/providers/AuthProvider";
import { ChatContext } from "@/providers/ChatProvider";
import useChatChannelStore from "@/store/useChatChannelStore";
import { useContext } from "react";

import ChatHeader from "./ChatHeader";
import ChatInput from "./ChatInput";
import ChatNonDisplay from "./ChatNonDisplay";
import ChatWindow from "./ChatWindow";

const ChatContainer = (channel: any) => {
  const chatContext = useContext(ChatContext);
  const authContext = useContext(AuthContext) as AuthContextType;
  const $channel = useChatChannelStore((state: any) => state.channel);

  return (
    <>
      {$channel ? (
        <>
          <ChatHeader/>
          <ChatWindow/>
          <ChatInput
            chatContext={chatContext}
            authContext={authContext}
          />
        </>
      ) : (
        <ChatNonDisplay></ChatNonDisplay>
      )}
    </>
  );
};

export default ChatContainer;
