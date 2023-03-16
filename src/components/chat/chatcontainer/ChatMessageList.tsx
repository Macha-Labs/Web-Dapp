import { truncateAddress } from "@/helpers";
import {
  Col,
  StyledIcon,
  Row,
  StyledMessageCard,
} from "@/styles/StyledComponents";
import { Avatar, Heading, Image, Text } from "@chakra-ui/react";
import React from "react";
import ChatMessage from "./ChatMessage";

function ChatMessageList(props: any) {

  return (
    <>
      <Heading as="h4" size="md" className="m-b-1">
        Pinned Messages
      </Heading>
      {props?.pinnedMessageList.length ? (
        <>
          {props.pinnedMessageList?.map((message: any, index: number) => {
            return (
              <ChatMessage
                key={message?.id}
                message={message}
                hookChat={props.hookChat}
              />
            );
          })}
        </>
      ) : (
        <Col className="flex-hr-vr-center h-100">
          <Image src="/assets/nopin.png" className="w-40 m-b-2" />
          <Heading className="" size="xs">
            No Pinned Messages
          </Heading>
        </Col>
      )}
    </>
  );
}

export default ChatMessageList;
