import ChatHeader from "@/components/chat/ChatHeader";
import ChatInput from "@/components/chat/ChatInput";
import ChatList from "@/components/chat/ChatList";
import ChatWindow from "@/components/chat/ChatWindow";
import useOrgChannels from "@/hooks/portal/useOrgChannels";
import { Row, StyledChat, StyledChatList } from "@/styles/StyledComponents";
import React from "react";

function Chat() {
  const hookOrgChannels = useOrgChannels("6246c7045cc31c36781d668e");

  return (
    <Row>
      <StyledChatList>
        <ChatList channels={hookOrgChannels.channels} />
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
