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
            {props.hookChannel?.channel?.raw?.state?.messageSets[0]?.messages?.map((item: any, index: number) => {
              return (
                <ChatMessage
                  message={item}
                  hookChat={props.hookChat}
                  authContext={props.authContext}
                  key={item}
                />
              );
            })}
          </>
        ) : (
          <LayoutChatEmpty channel={props.channel} />
        )}
      </StyledConversationView>
    </StyledConversationContainer>
  );
};

export default ChatWindow;
