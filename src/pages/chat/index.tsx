import { FlexWindow } from "@/_ui/flex/FlexWindow";
import ChatContainer from "@/components/chat/chatcontainer/ChatContainer";
// import Nav from "@/_ui/nav/Nav";
import NavHeader from "@/_ui/nav/NavHeader";
import NewChatList from "@/components/chat/NewChatList";
import { style } from "@/styles/StyledConstants";
import { Flex, useColorMode } from "@chakra-ui/react";

const Chat = () => {
  const { colorMode } = useColorMode();
  const renderNavLeft = () => {
    return <>{/* <NavLeft /> */}</>;
  };

  const renderNavTop = () => {
    return <NavHeader showLogo={true} />;
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
