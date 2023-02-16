import ChatList from "@/components/chat/ChatList";
import { Row, StyledChat, StyledChatList, StyledWindow } from "@/styles/StyledComponents";
import React, { useState } from "react";
import ChatContainer from "@/components/chat/chatcontainer/ChatContainer";
import Nav from "@/components/nav/Nav";
import { ChakraProvider } from "@chakra-ui/react";
import theme from "@/styles/StyledChakraTheme";

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
    <ChakraProvider theme={theme}>
        <StyledWindow>
        <div className="left">
            <Nav />
        </div>

        <div className="right">
            <Template />
        </div>
    </StyledWindow>
    </ChakraProvider>
    
  );
}

export default Chat;
