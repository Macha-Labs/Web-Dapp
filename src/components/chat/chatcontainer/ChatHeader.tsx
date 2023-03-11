import ModalSlider from "@/components/modal/ModalSlider";
import UserList from "@/components/user/UserList";
import { Col, Row } from "@/styles/StyledComponents";
import {
  Button,
  Avatar,
  Heading,
  Icon,
  useDisclosure,
  Text,
} from "@chakra-ui/react";
import IconImage from "@/components/icons/IconImage";
import ChatSetting from "./ChatSetting";
import { useContext } from "react";
import { AuthContext } from "@/providers/AuthProvider";
import ChatSearch from "./ChatSearch";
import { ChatContext } from "@/providers/ChatProvider";

const ChatHeader = (props: any) => {
  const membersModal = useDisclosure();
  const modalSettings = useDisclosure();
  const chatContext = useContext(ChatContext);
  const authContext = useContext(AuthContext);

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

  const TemplateChannelSettings = () => {
    return (
      <ModalSlider event={modalSettings} size="sm">
        <ChatSetting
          event={modalSettings}
          chatContext={chatContext}
          authContext={authContext}
          hookChannel={chatContext.hookChannel}
          hookChat={chatContext.hookChat}
          modalSettings={modalSettings}
        />
      </ModalSlider>
    );
  };

  const TemplateSearch = () => {
    return (
      <Row className="header w-100 vr-center hr-between">
        <ChatSearch />
        <Button
          size="xs"
          variant="state_default_hover"
          className="m-l-1"
          onClick={props?.hookChat?.handleSearchClose}
        >
          Cancel
        </Button>
      </Row>
    );
  };

  const TemplateMultiSelect = () => {
    return (
      <Row className="header w-100 hr-between vr-center">
        <Button
          variant="state_brand"
          size="sm"
          className="m-r-0-5"
          onClick={() => {
            chatContext.hookChat?.setSelectedMessages([]);
          }}
        >
          Clear
        </Button>
        <Button
          variant="state_default_hover"
          size="xs"
          onClick={chatContext.hookChat.handleMultiSelectClose}
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
            name={chatContext?.channel?.name}
          />
          <Col>
            <Row>
              <Heading as="h4" size="sm">
                {chatContext?.channel?.name}
              </Heading>
              {chatContext?.channel?.raw?.muteStatus()?.muted && (
                <IconImage
                  path="IconDarkMute.png"
                  style={{ className: "m-l-0-5" }}
                  size={15}
                />
              )}
            </Row>
            <Heading as="h6" size="xs">
              {props.hookChat?.usersWhoAreTyping && (
                <>
                  {props.hookChat?.usersWhoAreTyping?.map(
                    (user: any, index: number) => {
                      return (
                        <Text key={user?.id} fontSize="12">
                          {`${user}${
                            index! ==
                              props.hookChat?.usersWhoAreTyping.length - 1 &&
                            ","
                          } is typing...`}
                        </Text>
                      );
                    }
                  )}
                </>
              )}
            </Heading>
          </Col>
        </Row>

        <Row className="vr-center">
          <IconImage
            path="IconDarkMenu.png"
            onClick={modalSettings.onOpen}
            style={{ className: "m-r-0-5" }}
          />

          <IconImage path="IconDarkUsers.png" onClick={membersModal.onOpen} />
        </Row>
      </Row>
    );
  };

  const Template = () => {
    if (props.hookChat.actionMessage?.action === "SEARCH")
      return <TemplateSearch />;
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
      {/* <TemplatePinnedMessages /> */}
      <TemplateChannelSettings />
    </>
  );
};

export default ChatHeader;
