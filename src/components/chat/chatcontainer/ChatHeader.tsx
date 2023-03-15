import ModalSlider from "@/components/modal/ModalSlider";
import UserList from "@/components/user/UserList";
import { Col, Row } from "@/styles/StyledComponents";
import {
  Button,
  Avatar,
  Heading,
  useDisclosure,
  Text,
} from "@chakra-ui/react";
import IconImage from "@/components/icons/IconImage";
import ChatSetting from "./ChatSetting";
import { useContext } from "react";
import { AuthContext } from "@/providers/AuthProvider";
import ChatSearch from "./ChatSearch";
import { useRouter } from "next/router";
import { truncateAddress } from "@/helpers";

const ChatHeader = (props: any) => {
  const membersModal = useDisclosure();
  const modalSettings = useDisclosure();
  const authContext = useContext(AuthContext);
  const router = useRouter();

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
          chatContext={props?.chatContext}
          authContext={authContext}
          hookChannel={props?.chatContext.hookChannel}
          hookChat={props?.chatContext.hookChat}
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
          onClick={props?.chatContext?.hookChat?.handleSearchClose}
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
            props?.chatContext.hookChat?.setSelectedMessages([]);
          }}
        >
          Clear
        </Button>
        <Button
          variant="state_default_hover"
          size="xs"
          onClick={props?.chatContext.hookChat.handleMultiSelectClose}
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
            name={
              props?.chatContext?.channel?.name || props?.chatContext?.channel?.peerAddress
            }
          />
          <Col>
            <Row>
              <Heading as="h4" size="sm">
                {props?.chatContext?.channel?.name ||
                  truncateAddress(props?.chatContext?.channel?.peerAddress)}
              </Heading>
              {!props?.chatContext?.channel?.raw?.disconnected && props?.chatContext?.channel?.raw?.muteStatus()?.muted && (
                <IconImage
                  path="IconDarkMute.png"
                  style={{ className: "m-l-0-5" }}
                  size={15}
                />
              )}
            </Row>
            <Heading as="h6" size="xs">
              {props?.chatContext?.hookChat?.usersWhoAreTyping && (
                <>
                  {props?.chatContext?.hookChat?.usersWhoAreTyping?.map(
                    (user: any, index: number) => {
                      return (
                        <Text key={user?.id} fontSize="12">
                          {`${user}${
                            index! ==
                              props?.chatContext?.hookChat?.usersWhoAreTyping.length - 1 &&
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

        {router.pathname == '/chat' && <Row className="vr-center">
          <IconImage
            path="IconDarkMenu.png"
            onClick={modalSettings.onOpen}
            style={{ className: "m-r-0-5" }}
          />

          <IconImage path="IconDarkUsers.png" onClick={membersModal.onOpen} />
        </Row>}

        
      </Row>
    );
  };

  const Template = () => {
    if (props?.chatContext?.hookChat.actionMessage?.action === "SEARCH")
      return <TemplateSearch />;
    else if (props?.chatContext?.hookChat.actionMessage?.action === "MULTISELECT")
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
