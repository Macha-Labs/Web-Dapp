import ChatList from "@/components/chat/ChatList";
import { Row, StyledChat, StyledChatList, StyledWindow } from "@/styles/StyledComponents";
import React, { useState } from "react";
import ChatContainer from "@/components/chat/chatcontainer/ChatContainer";
import Nav from "@/components/nav/Nav";
import { ChakraProvider } from "@chakra-ui/react";

function Chat() {
  const Template = () => {
    return (
        <Row>
        <StyledChatList>
          <ChatList />
        </StyledChatList>
        <StyledChat>
          <ChatContainer />
        </StyledChat>
      </Row>
    )
  }
  return (
    <ChakraProvider>
      
    </ChakraProvider>
    <StyledWindow>
      <div className="left">
          <Nav />
      </div>

      <div className="right">
          <Template />
      </div>
  </StyledWindow>
  );
}

export default Chat;
