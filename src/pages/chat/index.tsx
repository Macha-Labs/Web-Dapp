import { FlexWindow } from "@/_ui/flex/FlexWindow";
import AuthCard from "@/components/auth/AuthCard";
import ChatContainer from "@/components/chat/chatcontainer/ChatContainer";
import ChatList from "@/components/chat/ChatList";
import ModalWindow from "@/_ui/modal/ModalWindow";
// import Nav from "@/_ui/nav/Nav";
import { AuthContext } from "@/providers/AuthProvider";
import { StyledChat, StyledChatList } from "@/styles/StyledComponents";
import { Divider, Flex, useColorMode, useDisclosure } from "@chakra-ui/react";
import React, { useContext, useEffect, useState } from "react";
import NavTop from "@/_ui/nav/NavTop";
import NavLeft from "@/_ui/nav/NavLeft";
import NewChatList from "@/components/chat/NewChatList";
import FlexRow from "@/_ui/flex/FlexRow";
import NavMeta from "@/_ui/nav/NavMeta";
import { style } from "@/styles/StyledConstants";
import NavSearch from "@/_ui/nav/NavSearch";

const Chat = () => {
  const { colorMode } = useColorMode();
  const renderNavLeft = () => {
    return <>{/* <NavLeft /> */}</>;
  };

  const renderNavTop = () => {
    return <NavSearch showLogo={true} />;
  };

  const renderBody = () => {
    return (
      <Flex
        justifyContent="flex-start"
        background={colorMode == "light" ? "#fff" : style.input.bg.default}
        padding={style.padding.sm}
        borderRadius={style.card.borderRadius.default}
        marginTop="4.6rem"
      >
        <NewChatList />
        <ChatContainer />
      </Flex>
    );
  };
  return (
    <>
      <FlexWindow
        view="col"
        navLeft={renderNavLeft()}
        navTop={renderNavTop()}
        bodyElem={renderBody()}
      ></FlexWindow>
    </>
  );
};

export default Chat;
