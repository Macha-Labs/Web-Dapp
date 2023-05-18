import ChatMembersList from "@/components/chat/chatcontainer/ChatMembersList";
import { StyledCol, StyledRow } from "@/styles/StyledComponents";
import {
  Button,
  Avatar,
  Heading,
  useDisclosure,
  Text,
  Tag,
} from "@chakra-ui/react";
import IconImage from "@/_ui/icons/IconImage";
import ChatSetting from "./ChatSetting";
import { useContext, useEffect } from "react";
import InputSearch from "../../../_ui/input/InputSearch";
import { useRouter } from "next/router";
import { truncateAddress } from "@/helpers";
import { ChatContext } from "@/providers/ChatProvider";
import useChatChannelStore from "@/store/useChatChannelStore";

const ChatHeader = (props: any) => {
  console.log("Rendering >>>>> ChatHeader");
  const membersModal = useDisclosure();
  const modalSettings = useDisclosure();
  const router = useRouter();
  const chatContext = useContext(ChatContext);
  const $channel = useChatChannelStore((state: any) => state.channel);

  const templateSearch = () => {
    return (
      <StyledRow className="header w-100 vr-center hr-between">
        <InputSearch />
        <Button
          size="xs"
          variant="state_default_hover"
          className="m-l-1"
          onClick={chatContext?.hookChat?.handleSearchClose}
        >
          Cancel
        </Button>
      </StyledRow>
    );
  };

  const templateMultiSelect = () => {
    return (
      <StyledRow className="header w-100 hr-between vr-center">
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
      </StyledRow>
    );
  };

  const templateProfile = () => {
    return (
      <StyledRow className="header w-100 hr-between vr-center">
        <StyledRow className="vr-center">
          <Avatar
            size="sm"
            className="m-r-0-5"
            name={$channel?.name}
            src={$channel?.image ? $channel?.image : $channel?.name}
          />
          <StyledCol>
            <StyledRow>
              <Heading
                as="h4"
                size="sm"
                paddingBottom="0px"
                marginBottom="0px"
                style={{ paddingBottom: "0px", marginBottom: "0px" }}
              >
                {$channel?.name || truncateAddress($channel?.peerAddress)}
              </Heading>
              {!$channel?.raw?.disconnected &&
                $channel?.raw?.muteStatus()?.muted && (
                  <IconImage
                    path="IconDarkMute.png"
                    style={{ className: "m-l-0-5" }}
                    size="2xs"
                  />
                )}
            </StyledRow>
            <Heading as="h6" size="xs">
              {chatContext?.hookChat?.usersWhoAreTyping && (
                <>
                  {chatContext?.hookChat?.usersWhoAreTyping?.map(
                    (user: any, index: number) => {
                      return (
                        <Text key={user?.id} fontSize="12">
                          {`${user}${
                            index! ==
                              chatContext?.hookChat?.usersWhoAreTyping.length -
                                1 && ","
                          } is typing...`}
                        </Text>
                      );
                    }
                  )}
                </>
              )}
            </Heading>
          </StyledCol>
        </StyledRow>

        <StyledRow>
          <Button
            className="m-r-1"
            size="xs"
            variant={$channel?.source == "xmtp" ? "state_xmtp" : ""}
          >
            {$channel?.source}
          </Button>

          {router.pathname == "/" && (
            <StyledRow className="vr-center">
              <IconImage
                path="IconDarkMenu.png"
                onClick={modalSettings.onOpen}
                style={{ className: "m-r-0-5" }}
              />

              <IconImage
                path="IconDarkUsers.png"
                onClick={membersModal.onOpen}
              />
            </StyledRow>
          )}
        </StyledRow>
      </StyledRow>
    );
  };

  const template = () => {
    if (chatContext?.hookChat.actionMessage?.action === "SEARCH")
      return templateSearch();
    else if (chatContext?.hookChat.actionMessage?.action === "MULTISELECT")
      return templateMultiSelect();
    else {
      return templateProfile();
    }
  };

  return (
    <>
      <div className="header hr-between vr-center">
        <StyledRow className="w-100 h-100 hr-between vr-center">
          {/* <Template /> */}
          {template()}
        </StyledRow>
      </div>

      <ChatMembersList modal={membersModal} />

      <ChatSetting
        modalSettings={modalSettings}
        hookChatChannels={props.hookChatChannels}
        hookChatChannel={props.hookChatChannel}
      />
    </>
  );
};

export default ChatHeader;
