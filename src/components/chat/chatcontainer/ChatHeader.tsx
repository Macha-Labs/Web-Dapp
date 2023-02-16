import ModalSlider from "@/components/modal/ModalSlider";
import UserList from "@/components/user/UserList";
import { Row } from "@/styles/StyledComponents";
import { Heading, Icon, useDisclosure } from "@chakra-ui/react";
import ChatMessageList from "./ChatMessageList";

const ChatHeader = props => {
  const membersModal = useDisclosure();
  const pinneddMessageModal = useDisclosure();

  const TemplateMembers = () => {
    return (
      <ModalSlider event={membersModal}>
        <UserList
          onlineUsers={props.hookMembers?.onlineUsers}
          offlineUsers={props.hookMembers?.offlineUsers}
        />
      </ModalSlider>
    );
  };

  const TemplatePinnedMessages = () => {
    return (
      <ModalSlider event={pinneddMessageModal}>
        <ChatMessageList
          pinnedMessageList={props.hookChannel?.pinnedMessages}
        />
      </ModalSlider>
    );
  };

  const templateProfile = () => {};

  return (
    <>
      <div className="header hr-between vr-center">
        <Row className="w-100 h-100 hr-between vr-center">
          <Heading as="h4" size="sm">
            #{props?.hookChannel?.channel?.name}
          </Heading>
          <div>
            <Row className="vr-center">
              <Icon className="m-r-0-5">
                {/* <PinIcon width="25" height="25" fill="#efefef" onClick={() => {}}></PinIcon> */}
              </Icon>
              <Icon className="m-r-0-5" onClick={pinneddMessageModal.onOpen}>
                {/* <SearchIcon width="25" height="25" fill="#efefef"></SearchIcon>/ */}
              </Icon>
              <Icon className="" onClick={membersModal.onOpen}>
                {/* <UserIcon width="25" height="25" fill="#efefef"></UserIcon> */}
              </Icon>
            </Row>
          </div>
        </Row>
      </div>
      <TemplateMembers />
      <TemplatePinnedMessages />
    </>
  );
};

export default ChatHeader;
