import { AuthContext, AuthContextType } from "@/providers/AuthProvider";
import { ChatContext } from "@/providers/ChatProvider";
import { DataContext } from "@/providers/DataProvider";
import { useContext } from "react";

import ChatHeader from "./ChatHeader";
import ChatInput from "./ChatInput";
import ChatNonDisplay from "./ChatNonDisplay";
import ChatWindow from "./ChatWindow";

const ChatContainer = (channel: any) => {
  const chatContext = useContext(ChatContext);
  const dataContext = useContext(DataContext);
  const authContext = useContext(AuthContext) as AuthContextType;

  return (
    <>
      {dataContext?.channel ? (
        <>
          <ChatHeader/>
          {/* <ChatWindow/> */}
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
