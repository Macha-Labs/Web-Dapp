import ChatHeader from "@/components/chat/ChatHeader";
import ChatInput from "@/components/chat/ChatInput";
import ChatList from "@/components/chat/ChatList";
import ChatWindow from "@/components/chat/ChatWindow";
import { Row, StyledChat, StyledChatList } from "@/styles/StyledComponents";
import React from "react";

function Chat() {
  return (
    <Row>
      <StyledChatList>
        <ChatList />
      </StyledChatList>
        <StyledChat>
          <ChatHeader />
          <ChatWindow />
          <ChatInput />
        </StyledChat>
    </Row>
  );
}

export default Chat;
