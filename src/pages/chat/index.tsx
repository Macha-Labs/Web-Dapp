import ChatList from "@/components/chat/ChatList";
import {
  Row,
  StyledChat,
  StyledChatList,
  StyledWindow,
} from "@/styles/StyledComponents";
import React, { useState } from "react";
import ChatContainer from "@/components/chat/chatcontainer/ChatContainer";
import Nav from "@/components/nav/Nav";

function Chat() {
  return (
    <StyledWindow>
      <div className="left">
        <Nav />
      </div>

      <div className="right">
        <StyledChatList>
          <ChatList />
        </StyledChatList>
        <StyledChat>
          <ChatContainer />
        </StyledChat>
      </div>
    </StyledWindow>
  );
}

export default Chat;
