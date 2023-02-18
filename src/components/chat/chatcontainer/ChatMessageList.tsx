import { truncateAddress } from "@/helpers";
import {
  Col,
  StyledIcon,
  Row,
  StyledMessageCard,
} from "@/styles/StyledComponents";
import { Avatar, Heading, Text } from "@chakra-ui/react";
import React from "react";
import ChatMessage from "./ChatMessage";

function ChatMessageList(props: any) {

  return (
    <div>
      <Heading as="h4" size="md" className="m-b-1">
        Pinned Messages
      </Heading>
      {props.pinnedMessageList?.map((message: any, index: number) => {
        return (
          <StyledMessageCard key={index}>
            <ChatMessage message={message} />
          </StyledMessageCard>
        );
      })}
    </div>
  );
}

export default ChatMessageList;
