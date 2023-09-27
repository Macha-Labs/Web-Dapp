import { FlexWindow } from "@/_ui/flex/FlexWindow";
import AuthCard from "@/components/auth/AuthCard";
import ChatContainer from "@/components/chat/chatcontainer/ChatContainer";
import ChatList from "@/components/chat/ChatList";
import ModalWindow from "@/_ui/modal/ModalWindow";
// import Nav from "@/_ui/nav/Nav";
import { AuthContext } from "@/providers/AuthProvider";
import { StyledChat, StyledChatList } from "@/styles/StyledComponents";
import { Divider, useDisclosure } from "@chakra-ui/react";
import React, { useContext, useEffect, useState } from "react";
import NavTop from "@/_ui/nav/NavTop";
import NavLeft from "@/_ui/nav/NavLeft";
import NewChatList from "@/components/chat/NewChatList";
import FlexRow from "@/_ui/flex/FlexRow";
import NavMeta from "@/_ui/nav/NavMeta";

const Chat = () => {
  const renderNavLeft = () => {
    return (
      <>
        <NavLeft />
      </>
    );
  };

  const renderNavTop = () => {
    return <NavMeta />;
  };

  const renderBody = () => {
    return (
      <FlexRow vrAlign="flex-start" >
        <NewChatList />
        
        <ChatContainer />
      </FlexRow>
    );
  };
  return (
    <>
      <FlexWindow
        view="both"
        navLeft={renderNavLeft()}
        navTop={renderNavTop()}
        bodyElem={renderBody()}
      ></FlexWindow>
    </>
  );
};

export default Chat;
