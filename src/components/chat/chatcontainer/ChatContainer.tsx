import { AuthContext, AuthContextType } from "@/providers/AuthProvider";
import { ChatContext } from "@/providers/ChatProvider";
import { StreamContext } from "@/providers/StreamProvider";
import { useContext } from "react";

import ChatHeader from "./ChatHeader";
import ChatInput from "./ChatInput";
import ChatNonDisplay from "./ChatNonDisplay";
import ChatWindow from "./ChatWindow";

const ChatContainer = (channel: any) => {
  const chatContext = useContext(ChatContext);
  const authContext = useContext(AuthContext) as AuthContextType;

  return (
    <>
      {chatContext?.hookChannel?.channel ? (
        <>
          <ChatHeader
            hookChat={chatContext.hookChat}
            hookChannel={chatContext.hookChannel}
            hookMembers={chatContext.hookMembers}
          />
          <ChatWindow
            chatContext={chatContext}
            authContext={authContext}
          />
          <ChatInput
            hookChat={chatContext.hookChat}
          />
        </>
      ) : (
        <ChatNonDisplay></ChatNonDisplay>
      )}
    </>
  );
};

export default ChatContainer;
