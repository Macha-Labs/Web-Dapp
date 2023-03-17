import AuthCard from "@/components/auth/AuthCard";
import ChatContainer from "@/components/chat/chatcontainer/ChatContainer";
import ChatList from "@/components/chat/ChatList";
import ModalWindow from "@/components/modal/ModalWindow";
import Nav from "@/components/nav/Nav";
import useLensProfile from "@/hooks/lens/useLensProfile";
import { AuthContext } from "@/providers/AuthProvider";
import { ChatContext } from "@/providers/ChatProvider";
import {
  StyledChat,
  StyledChatList,
  StyledWindow,
} from "@/styles/StyledComponents";
import { useDisclosure } from "@chakra-ui/react";
import React, { useContext, useEffect, useState } from "react";

function IndexDM() {
  const authContext = useContext(AuthContext);
  const chatContext = useContext(ChatContext);
  const hookLens = useLensProfile();
  const modalAuth = useDisclosure();

  useEffect(() => {}, []);

  useEffect(() => {
    if (authContext?.isConnected) {
      modalAuth.onClose();
    } else {
      modalAuth.onOpen();
    }
  }, [authContext?.isConnected, modalAuth.isOpen]);

  const TemplateAuth = () => {
    return (
      <>
        <ModalWindow event={modalAuth}>
          <AuthCard />
        </ModalWindow>
      </>
    );
  };

  return (
    <>
      {authContext.isConnected && (
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
      )}
      <TemplateAuth />
    </>
  );
}

export default IndexDM;
