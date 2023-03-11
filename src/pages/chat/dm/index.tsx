import AuthCard from "@/components/auth/AuthCard";
import ChatList from "@/components/chat/ChatList";
import ModalWindow from "@/components/modal/ModalWindow";
import Nav from "@/components/nav/Nav";
import useLensProfile from "@/hooks/lens/useLensProfile";
import { AuthContext } from "@/providers/AuthProvider";
import { ChatContext } from "@/providers/ChatProvider";
import { StyledChat, StyledChatList, StyledWindow } from "@/styles/StyledComponents";
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
