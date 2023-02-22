import LayoutChatConversation from "@/layouts/chat/LayoutChatConversation";
import LayoutChatEmpty from "@/layouts/chat/LayoutChatEmpty";
import {
  StyledConversationContainer,
  StyledConversationView,
} from "@/styles/StyledComponents";
import { useEffect } from "react";
import ChatMessage from "./ChatMessage";
import { useChannelStateContext } from "stream-chat-react";


const ChatWindow = (props: any) => {
  // const {messages} = useChannelStateContext();

  return (
    <StyledConversationContainer>
      <StyledConversationView>
        {props.hookChannel?.messages?.length ? (
          <>
            {props.hookChannel?.messages?.map(
              (item: any, index: number) => (
                <ChatMessage
                  message={item}
                  hookChat={props.hookChat}
                  authContext={props.authContext}
                  key={index}
                />
              )

              // {item.text}
            )}
          </>
        ) : (
          <LayoutChatEmpty channel={props.channel} />
        )}
      </StyledConversationView>
    </StyledConversationContainer>
  );
};

export default ChatWindow;
