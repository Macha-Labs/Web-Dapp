import { AuthContext, AuthContextType } from "@/providers/AuthProvider";
import { ChatContext } from "@/providers/ChatProvider";
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
      {chatContext?.channel ? (
        <>
          <ChatHeader
            chatContext={chatContext}
          />
          <ChatWindow
            chatContext={chatContext}
            authContext={authContext} />
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
