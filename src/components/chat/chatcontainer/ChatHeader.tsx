import ModalSlider from "@/components/modal/ModalSlider";
import UserList from "@/components/user/UserList";
import { Row } from "@/styles/StyledComponents";
import { Heading, Icon, useDisclosure } from "@chakra-ui/react";
import ChatMessageList from "./ChatMessageList";
import IconImage from "@/components/icons/IconImage";
import ChatSetting from "./ChatSetting";

const ChatHeader = props => {
  const membersModal = useDisclosure();
  const pinneddMessageModal = useDisclosure();
  const channelSettingsModal = useDisclosure();

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
      <ModalSlider event={pinneddMessageModal} size="md">
        <ChatMessageList
          pinnedMessageList={props.hookChannel?.pinnedMessages}
        />
      </ModalSlider>
    );
  };

  const TemplateChannelSettings = () => {
    return (
      <ModalSlider event={channelSettingsModal}>
        <ChatSetting />
      </ModalSlider>
    );
  };
  return (
    <>
      <div className="header hr-between vr-center">
        <Row className="w-100 h-100 hr-between vr-center">
          <Heading as="h4" size="sm">
            #{props?.hookChannel?.channel?.name}
          </Heading>
          <div>
            <Row className="vr-center">
              <IconImage path="IconDarkMenu.png"
              onClick={channelSettingsModal.onOpen}
              style={{className:"m-r-0-5"}} />

              <IconImage
                path="IconDarkPinned.png"
                onClick={pinneddMessageModal.onOpen}
                style={{className:"m-r-0-5"}}
              />

              <IconImage
                path="IconDarkUsers.png"
                onClick={membersModal.onOpen}
              />
            </Row>
          </div>
        </Row>
      </div>
      <TemplateMembers />
      <TemplatePinnedMessages />
      <TemplateChannelSettings />
    </>
  );
};

export default ChatHeader;
