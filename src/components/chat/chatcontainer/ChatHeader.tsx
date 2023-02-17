import ModalSlider from "@/components/modal/ModalSlider";
import UserList from "@/components/user/UserList";
import { Row } from "@/styles/StyledComponents";
import { Button, Avatar, Heading, Icon, useDisclosure } from "@chakra-ui/react";
import ChatMessageList from "./ChatMessageList";
import IconImage from "@/components/icons/IconImage";
import ChatSetting from "./ChatSetting";

const ChatHeader = (props) => {
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

  const TemplateSearch = () => {
    return <></>;
  };

  const TemplateMultiSelect = () => {
    return (
      <Row>
        <Button
          variant="state_brand"
          size="sm"
          className="m-r-0-5"
          onClick={props.hookChat.setSelectedMessages([])}
        >
          Clear
        </Button>
        <Button
          variant="state_brand"
          size="sm"
          onClick={props.hookChat.handleMultiSelectClose()}
        >
          Cancel
        </Button>
      </Row>
    );
  };

  const TemplateProfile = () => {
    return (
      <Row className="header w-100 hr-between vr-center">
          <Row className="vr-center">
            <Avatar
              size="sm"
              className="m-r-0-5"
              name={props?.hookChannel?.channel?.name}
            />
            <Heading as="h4" size="sm">
              {props?.hookChannel?.channel?.name}
            </Heading>
          </Row>

          <Row className="vr-center">
            <IconImage
              path="IconDarkMenu.png"
              onClick={channelSettingsModal.onOpen}
              style={{ className: "m-r-0-5" }}
            />

            <IconImage
              path="IconDarkPinned.png"
              onClick={pinneddMessageModal.onOpen}
              style={{ className: "m-r-0-5" }}
            />

            <IconImage path="IconDarkUsers.png" onClick={membersModal.onOpen} />
          </Row>
      </Row>
    );
  };

  const Template = () => {
    if (props.hookChat.searchActive) return <TemplateSearch />;
    else if (props.hookChat.actionMessage?.action === "MULTISELECT")
      return <TemplateMultiSelect />;
    else {
      return <TemplateProfile />;
    }
  };

  return (
    <>
      <div className="header hr-between vr-center">
        <Row className="w-100 h-100 hr-between vr-center">
          <Template />
        </Row>
      </div>
      <TemplateMembers />
      <TemplatePinnedMessages />
      <TemplateChannelSettings />
    </>
  );
};

export default ChatHeader;
