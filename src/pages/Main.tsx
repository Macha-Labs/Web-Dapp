import { FlexWindow } from "@/_ui/flex/FlexWindow";
import ModalWindow from "@/_ui/modal/ModalWindow";
import Nav from "@/_ui/nav/Nav";
import AuthCard from "@/components/auth/AuthCard";
import ChatList from "@/components/chat/ChatList";
import ChatContainer from "@/components/chat/chatcontainer/ChatContainer";
import useAuthStore from "@/store/useAuthStore";
import { StyledChat, StyledChatList } from "@/styles/StyledComponents";
import { useDisclosure } from "@chakra-ui/react";
import "@rainbow-me/rainbowkit/styles.css";
import { useEffect } from "react";

function Main() {
  const modalAuth = useDisclosure();
  const $isConnected = useAuthStore((state: any) => state.isConnected);

  useEffect(() => {
    if ($isConnected && modalAuth.isOpen) {
      modalAuth.onClose();
    } else if (!$isConnected && !modalAuth.isOpen) {
      modalAuth.onOpen();
    }
  }, [$isConnected, modalAuth.isOpen]);
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
      {$isConnected && (
        <FlexWindow>
          <div className="left">
            <Nav />
          </div>

          <div className="right">
            <StyledChatList>
              <ChatList />
              {/* <MobileEmptyState /> */}
            </StyledChatList>
            <StyledChat>
              <ChatContainer />
            </StyledChat>
          </div>
        </FlexWindow>
      )}
      {modalAuth.isOpen && <TemplateAuth />}
    </>
  );
}

export default Main;
