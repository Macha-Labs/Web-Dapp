import ChatList from "@/components/chat/ChatList";
import { Row, StyledChat, StyledChatList } from "@/styles/StyledComponents";
import React, { useState } from "react";
import ChatContainer from "@/components/chat/chatcontainer/ChatContainer";

function Chat() {
  return (
    <Row>
      <StyledChatList>
        <ChatList />
      </StyledChatList>
      <StyledChat>
        <ChatContainer />
      </StyledChat>
    </Row>
  );
}

export default Chat;
