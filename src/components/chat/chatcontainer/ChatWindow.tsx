import LayoutChatConversation from "@/layouts/chat/LayoutChatConversation";
import LayoutChatEmpty from "@/layouts/chat/LayoutChatEmpty";
import {
  StyledConversationContainer,
  StyledConversationView,
} from "@/styles/StyledComponents";
import ChatMessage from "./ChatMessage";

const ChatWindow = (props: any) => {
  return (
    <StyledConversationContainer>
      <StyledConversationView>
        {props.hookChannel?.messages?.length ? (
          <>
            {props.hookChannel?.messages?.map(
              (item: any, index: number) => 
                <ChatMessage message={item} hookChat={props.hookChat}/>
              
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
