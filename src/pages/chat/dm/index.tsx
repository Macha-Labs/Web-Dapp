import AuthCard from "@/components/auth/AuthCard";
import ChatList from "@/components/chat/ChatList";
import ModalWindow from "@/components/modal/ModalWindow";
import Nav from "@/components/nav/Nav";
import { truncateAddress } from "@/helpers";
import useLensProfile from "@/hooks/lens/useLensProfile";
import { AuthContext } from "@/providers/AuthProvider";
<<<<<<< HEAD
import { ChatContext } from "@/providers/ChatProvider";
=======
import { XmtpContext } from "@/providers/XmtpProvider";
>>>>>>> f947f102ec69783f4a5c98162addecd9daba68ef
import {
  StyledWindow,
  StyledChatList,
  StyledChat,
  Col,
  Row,
  StyledChatItem,
} from "@/styles/StyledComponents";
import { Avatar, Button, Text, useDisclosure } from "@chakra-ui/react";
import React, { useContext, useEffect, useState } from "react";
<<<<<<< HEAD
=======
import { ChatContext } from "../../../providers/ChatProvider";
>>>>>>> f947f102ec69783f4a5c98162addecd9daba68ef

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
  }, [authContext?.isConnected]);

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
            <div onClick={() => authContext.sendXmtpMessage()}>Send GM</div>
            <StyledChat>
              {/* {authContext.messages.map(item => {
                return (
                  <>
                    <ChatMessage
                      message={{
                        html: item.content,
                        user: { id: item.senderAddress },
                        created_at: item.sent,
                      }}
                      authContext={authContext}
                    />
                  </>
                );
              })} */}
              {/* <ChatInput hookChat={{}} /> */}
            </StyledChat>
          </div>
        </StyledWindow>
      )}
      <TemplateAuth />
    </>
  );
}

export default IndexDM;
