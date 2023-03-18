import ChatMembersList from "@/components/chat/chatcontainer/ChatMembersList";
import { Col, Row } from "@/styles/StyledComponents";
import {
  Button,
  Avatar,
  Heading,
  useDisclosure,
  Text,
  Tag,
} from "@chakra-ui/react";
import IconImage from "@/components/icons/IconImage";
import ChatSetting from "./ChatSetting";
import { useContext, useEffect } from "react";
import { AuthContext } from "@/providers/AuthProvider";
import ChatSearch from "./ChatSearch";
import { useRouter } from "next/router";
import { truncateAddress } from "@/helpers";
import useChatMembers from "@/hooks/chat/useChatMembers";
import { ChatContext } from "@/providers/ChatProvider";
import useChatChannelsReload from "@/hooks/chat/useChatChannelsReload";
import useChatChannel from "@/hooks/chat/useChatChannel";
import useChatChannelStore from "@/store/useChatChannelStore";

const ChatHeader = (props: any) => {
  const membersModal = useDisclosure();
  const modalSettings = useDisclosure();
  const authContext = useContext(AuthContext);
  const chatContext = useContext(ChatContext);
  const hookChatMembers = useChatMembers();
  const hookChatChannels = useChatChannelsReload();
  const hookChatChannel = useChatChannel();
  const router = useRouter();
  const $channel = useChatChannelStore((state: any) => state.channel);

  useEffect(() => {
    hookChatMembers.load();
  }, [$channel?.id])

  const TemplateMembers = () => {
    return (
      <ChatMembersList membersModal={membersModal}/>
    );
  };

  const TemplateChannelSettings = () => {
    return (
      <ChatSetting
          event={modalSettings}
          authContext={authContext}
          modalSettings={modalSettings}
          hookChatChannels={hookChatChannels}
          hookChatChannel={hookChatChannel}
        />
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
          onClick={chatContext?.hookChat?.handleSearchClose}
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
            name={
              $channel?.name || $channel?.peerAddress
            }
          />
          <Col>
            <Row>
              <Heading as="h4" size="sm">
                {$channel?.name ||
                  truncateAddress($channel?.peerAddress)}
              </Heading>
              {!$channel?.raw?.disconnected && $channel?.raw?.muteStatus()?.muted && (
                <IconImage
                  path="IconDarkMute.png"
                  style={{ className: "m-l-0-5" }}
                  size="2xs"
                />
              )}
            </Row>
            <Heading as="h6" size="xs">
              {chatContext?.hookChat?.usersWhoAreTyping && (
                <>
                  {chatContext?.hookChat?.usersWhoAreTyping?.map(
                    (user: any, index: number) => {
                      return (
                        <Text key={user?.id} fontSize="12">
                          {`${user}${
                            index! ==
                              chatContext?.hookChat?.usersWhoAreTyping.length - 1 &&
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

        <Row>
         <Tag className="m-r-1" variant={$channel?.source == 'xmtp' ? 'state_xmtp' : ''}>{$channel?.source}</Tag> 

         {router.pathname == '/chat' && <Row className="vr-center">
          
          <IconImage
            path="IconDarkMenu.png"
            onClick={modalSettings.onOpen}
            style={{ className: "m-r-0-5" }}
          />

          <IconImage path="IconDarkUsers.png" onClick={membersModal.onOpen} />
        </Row>}
        </Row>
                
      </Row>
    );
  };

  const Template = () => {
    if (chatContext?.hookChat.actionMessage?.action === "SEARCH")
      return <TemplateSearch />;
    else if (chatContext?.hookChat.actionMessage?.action === "MULTISELECT")
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
      {membersModal.isOpen && <TemplateMembers />}
      {modalSettings.isOpen && <TemplateChannelSettings />}
      
    </>
  );
};

export default ChatHeader;
