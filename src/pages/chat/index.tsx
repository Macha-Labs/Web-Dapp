import ChatList from "@/components/chat/ChatList";
import { StyledChat, StyledChatList, StyledWindow } from "@/styles/StyledComponents";
import React, { useEffect} from "react";
import ChatContainer from "@/components/chat/chatcontainer/ChatContainer";
import Nav from "@/components/nav/Nav";
import ModalWindow from "@/components/modal/ModalWindow";
import AuthCard from "@/components/auth/AuthCard";
import { useDisclosure } from "@chakra-ui/react";
import { useContext } from "react";
import { AuthContext } from "@/providers/AuthProvider";

function ChatComponent() {
  const modalAuth = useDisclosure();
  const authContext = useContext(AuthContext);

  useEffect(() => {
    if (authContext?.isConnected) {
      modalAuth.onClose()
    }
    else {
      modalAuth.onOpen();
    }

  }, [authContext?.isConnected])

  const TemplateAuth = () => {
    return (
      <>
        <ModalWindow event={modalAuth}>
          <AuthCard/>
        </ModalWindow>
      </>
    )
  }

  return (
    <>
      {authContext?.user?.lens?.id && 
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
    } 
      <TemplateAuth />
    </>
  );
}

export default ChatComponent;
