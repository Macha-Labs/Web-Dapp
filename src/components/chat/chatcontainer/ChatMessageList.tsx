import ModalSlider from "@/components/modal/ModalSlider";
import { truncateAddress } from "@/helpers";
import {
  StyledCol,
  StyledIcon,
  StyledRow,
  StyledMessageCard,
} from "@/styles/StyledComponents";
import { Avatar, Heading, Image, Text } from "@chakra-ui/react";
import React from "react";
import ChatMessage from "./ChatMessage";

function ChatMessageList(props: any) {
  props?.modalSettings.onClose()
  return (
    <ModalSlider event={props.modal} size="sm" 
    
    header={<Heading as="h6" size="sm" className="m-b-1">
    Pinned Messages
    </Heading>
    }>
      
      {props.pinnedMessageList?.map((message: any, index: number) => {
        return (
          <ChatMessage key={message?.id} message={message} hookChat={props.hookChat} maxw="100"/>
        );
      })}
    </ModalSlider>
  );
}

export default ChatMessageList;
