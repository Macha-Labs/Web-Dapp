import AuthCard from "@/components/auth/AuthCard";
import ChatContainer from "@/components/chat/chatcontainer/ChatContainer";
import ChatList from "@/components/chat/ChatList";
import MobileEmptyState from "@/components/MobileEmptyState";
import ModalWindow from "@/components/modal/ModalWindow";
import Nav from "@/components/nav/Nav";
import useUserStore from "@/store/useUserStore";
import {
  StyledChat,
  StyledChatList,
  StyledWindow,
} from "@/styles/StyledComponents";
import { useDisclosure } from "@chakra-ui/react";
import { useEffect } from "react";

function ChatComponent() {
  console.log("Rendering >>>>> ChatComponent");
  const modalAuth = useDisclosure();
  const $connected = useUserStore((state: any) => state.connected);

  useEffect(() => {
    if ($connected && modalAuth.isOpen) {
      modalAuth.onClose();
    } else if (!$connected && !modalAuth.isOpen) {
      modalAuth.onOpen();
    }
  }, [$connected, modalAuth.isOpen]);

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
      {$connected && (
        <StyledWindow>
          <div className="left">
            <Nav />
          </div>

          <div className="right">
            <StyledChatList>
              {/* <ChatList /> */}
              <MobileEmptyState />
            </StyledChatList>
            <StyledChat>
              <ChatContainer />
            </StyledChat>
          </div>
        </StyledWindow>
      )}
      {modalAuth.isOpen && <TemplateAuth />}
    </>
  );
}

export default ChatComponent;
