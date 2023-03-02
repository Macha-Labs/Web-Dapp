import { Col, Row, StyledChatItem } from "@/styles/StyledComponents";
import { Avatar, Button, Checkbox, Text, useDisclosure, useToast } from "@chakra-ui/react";
import { useContext, useEffect } from "react";
import { ChatContext } from "@/providers/ChatProvider";
import { AuthContext, AuthContextType } from "@/providers/AuthProvider";
import useOrgChannels from "@/hooks/portal/useOrgChannels";
import ModalSlider from "../modal/ModalSlider";
import ChatNew from "./ChatNew";
import IconImage from "../icons/IconImage";
import { truncateAddress } from "@/helpers";
import ChatSearch from "./chatcontainer/ChatSearch";
import React, { useState } from "react";
import Pop from "../pop/Pop";
import { darkStyle } from "@/styles/StyledConstants";
import usePortalChannel from "@/hooks/portal/usePortalChannel";

const ChatList = (props: any) => {
  const chatProvider = useContext(ChatContext);
  const authContext = useContext(AuthContext) as AuthContextType;
  const hookOrgChannels = useOrgChannels("6246c7045cc31c36781d668e");
  const modalChatNew = useDisclosure();
  const toast = useToast();
  const [isClicked, setIsClicked] = useState<any>([]);
  const [channel, setChannel] = useState<any>();

  const hookPortalChannel = usePortalChannel(
    {},
    {
      mute: () => {
        toast({
          title: "Channel Muted",
          status: "success",
          duration: 3000,
          position: "bottom-right",
        });
        chatProvider?.streamContext?.reloadChannelList();
        chatProvider?.streamContext?.reloadChannel();
      },
      unmute: () => {
        toast({
          title: "Channel Unmuted",
          status: "success",
          duration: 3000,
          position: "bottom-right",
        });
        chatProvider?.streamContext?.reloadChannelList();
        chatProvider?.streamContext?.reloadChannel();
      },
    }
  );

  useEffect(() => {
    chatProvider.hookChannels.fetchUserChannels(chatProvider.streamClient);
  }, []);

  const TemplateChatNew = () => {
    return (
      <ModalSlider event={modalChatNew} size="md">
        <ChatNew modal={modalChatNew} />
      </ModalSlider>
    );
  };

  const TemplateActions = (props: any) => {
    return (
      <Pop
        trigger={<IconImage path="IconDarkMenu.png" />}
        placement="bottom-end"
      >
        <Col className="text-start">
          <Button
            variant="transparent"
            size="md"
            className="text-start"
            rightIcon={<IconImage path="IconDarkPinned.png" />}
          >
            <Row className="hr-between w-100" onClick={() => {}}>
              Pin Channel
            </Row>
          </Button>
          {!props.item.raw?.muteStatus()?.muted ? (
            <Button
              variant="transparent"
              size="md"
              className="text-start"
              rightIcon={<IconImage path="IconDarkMute.png" />}
            >
              <Row
                className="hr-between w-100"
                onClick={() => {
                  hookPortalChannel.muteChannel(props.item);
                }}
              >
                Mute Channel
              </Row>
            </Button>
          ) : (
            <Button
              variant="transparent"
              size="md"
              className="text-start"
              rightIcon={<IconImage path="IconDarkUnMute.png" />}
            >
              <Row
                className="hr-between w-100"
                onClick={() => {
                  hookPortalChannel.unMuteChannel(props.item);
                }}
              >
                Unmute Channel
              </Row>
            </Button>
          )}
          <Button
            variant="transparent"
            size="md"
            className="text-start"
            rightIcon={<IconImage path="IconRedDelete.png" />}
          >
            <Row className="hr-between w-100" onClick={() => {}}>
              Clear Chat
            </Row>
          </Button>
        </Col>
      </Pop>
    );
  };

  const TemplateChatList = () => {
    return (
      <>
        <Row className="header vr-center hr-between">
          <ChatSearch style={{ className: "w-80" }} />
          <IconImage
            path="IconDarkPlus.png"
            onClick={modalChatNew.onOpen}
            styled={{ className: "m-l-1" }}
          />
        </Row>
        {!chatProvider?.hookChannels?.channels ? (
          <Col className="body">
            Create your first channel
            <Button size="sm" onClick={props.channelNew}>
              First Channel
            </Button>
          </Col>
        ) : (
          <Col className="body verticlescroll hidescroll">
            {chatProvider?.hookChannels?.channels?.length ? (
              <ul>
                {/* <button onClick={() => chatProvider?.hookChannels?.handleChannelAction('MULTISELECT')}>Multiselect</button> */}
                {chatProvider?.hookChannels?.channels.map(
                  (item: any, index: number) => (
                    <StyledChatItem key={item?.index}>
                 {  chatProvider?.hookChannels?.actionMessage == 'MULTISELECT' &&   <Checkbox className="m-r-0-5" 
                      isChecked={chatProvider.hookChannels?.selectedChannels.includes(item?.id)}
                      onChange={() => chatProvider.hookChannels?.handleSelectChannel(item) }
                      />}
                      <Button
                        onClick={(e) => {
                          e.preventDefault()
                          e.stopPropagation()
                          chatProvider.initiate(item, authContext?.address);
                          setIsClicked((prevState: any) => [
                            ...prevState,
                            index,
                          ]);
                        }}
                        className="menu-item w-100 m-b-0-5"
                        size="xl"
                        variant={
                          chatProvider.hookChannel?.channel?.id == item?.id
                            ? "state_brand"
                            : "state_card_hover"
                        }
                        // overflow="hidden"
                      >
                        <Row
                          onClick={() => {
                            chatProvider.initiate(item, authContext?.address);
                            setIsClicked((prevState: any) => [
                              ...prevState,
                              index,
                            ]);
                          }}
                          className="w-11-12"
                        >
                          {/* <Checkbox defaultChecked className="m-r-0-5" /> */}
                          <Avatar
                            size="md"
                            className="m-r-0-5"
                            name={item?.name}
                          />
                          <Col className="w-100 d-flex flex-col">
                            <Row>
                              <Text>
                                {item?.name.length > 12
                                  ? `${item?.name.slice(0, 12)}...`
                                  : item?.name}
                              </Text>
                              {item?.raw && (
                                <>
                                  {" "}
                                  {item.raw?.muteStatus()?.muted && (
                                    <IconImage
                                      path="IconDarkMute.png"
                                      style={{ className: "m-l-0-5" }}
                                      size={10}
                                    />
                                  )}
                                </>
                              )}
                            </Row>
                            <Col>
                              <Text fontSize={"xs"}>
                                {item?.lastMessage?.created_at
                                  ? new Date(
                                      item?.lastMessage?.created_at
                                    ).toLocaleString()
                                  : ""}
                              </Text>
                            </Col>
                            {item?.lastMessage && (
                              <Col
                                style={{ paddingRight: "5px" }}
                                className="m-t-0-5"
                              >
                                <Text fontSize={"xs"}>
                                  {item?.lastMessage?.user?.lensUsername ||
                                    item?.lastMessage?.user?.lensHandle ||
                                    truncateAddress(
                                      item?.lastMessage?.user?.id
                                    )}
                                  :{" "}
                                  {item?.lastMessage?.text.length > 14
                                    ? `${item?.lastMessage?.text.slice(
                                        0,
                                        14
                                      )}...`
                                    : item?.lastMessage?.text}
                                </Text>
                              </Col>
                            )}
                          </Col>
                          {item?.unreadCountObject[authContext?.address]
                            ?.unread_messages > 0 &&
                            !isClicked.includes(index) && (
                              <Col>
                                <Text
                                  padding={1}
                                  background={darkStyle.color5}
                                  borderRadius="full"
                                >
                                  {
                                    item?.unreadCountObject[
                                      authContext?.address
                                    ]?.unread_messages
                                  }
                                </Text>
                              </Col>
                            )}
                        </Row>

                        <Col className="hr-center w-1-12 settingsIcon">
                          <TemplateActions item={item} />
                        </Col>
                      </Button>
                    </StyledChatItem>
                  )
                )}
              </ul>
            ) : (
              <>
                <Button onClick={modalChatNew.onOpen} variant="state_brand">
                  Create Channel
                </Button>
              </>
            )}
          </Col>
        )}
      </>
    );
  };

  return (
    <>
      <TemplateChatList />
      <TemplateChatNew />
    </>
  );
};

export default ChatList;
