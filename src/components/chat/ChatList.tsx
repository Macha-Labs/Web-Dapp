import { Col, Row, StyledCard, StyledChatItem } from "@/styles/StyledComponents";
import {
  Avatar,
  Button,
  Spinner,
  Text,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { useContext, useEffect } from "react";
import { AuthContext, AuthContextType } from "@/providers/AuthProvider";
import ChatNew from "./ChatNew";
import IconImage from "../icons/IconImage";
import { truncateAddress } from "@/helpers";
import ChatSearch from "./chatcontainer/ChatSearch";
import React, { useState } from "react";
import Pop from "../pop/Pop";
import { darkStyle } from "@/styles/StyledConstants";
import usePortalChannel from "@/hooks/portal/usePortalChannel";

import { ChatContext } from "@/providers/ChatProvider";
import LoadChannels from "../load/LoadChannels";
import { useRouter } from "next/router";
import ChatNewDm from "./ChatNewDm";
import useChatChannelsStore from "@/store/useChatChannelsStore";
import useChatChannelStore from "@/store/useChatChannelStore";


const ChatList = (props: any) => {
  console.log("Rendering >>>>> ChatList");
  const chatContext = useContext(ChatContext);
  const authContext = useContext(AuthContext) as AuthContextType;
  const router = useRouter();
  const modalChatNew = useDisclosure();
  const modalChatNewDm = useDisclosure();
  const toast = useToast();
  const [isClicked, setIsClicked] = useState<any>([]);
  const $channels = useChatChannelsStore((state: any) => state.channels);
  const $channel = useChatChannelStore((state: any) => state.channel);
  const $channelLoad = useChatChannelStore((state: any) => state.loading);
  const [channelSelected, setChannelSelected] = useState<any>();


  // TODO: Fix bandaging
  useEffect(() => {
    chatContext?.hookChannelList.load();
    chatContext?.hookChannel?.unload();
  }, [router.pathname]);

  const handleSelectChannel = (channel: any) => {
    setChannelSelected(channel);
    chatContext?.hookChannel?.fetch(channel);
  }

  const hookPortalChannel = usePortalChannel(null, {
    mute: () => {
      toast({
        title: "Channel Muted",
        status: "success",
        duration: 3000,
        position: "bottom-right",
      });
      chatContext?.hookChannelList.load();
    },
    unmute: () => {
      toast({
        title: "Channel Unmuted",
        status: "success",
        duration: 3000,
        position: "bottom-right",
      });
      chatContext?.hookChannelList?.load();
    },
    leave: (channelId: any) => {
      toast({
        title: "Channel Left",
        status: "success",
        duration: 3000,
        position: "bottom-right",
      });
      chatContext?.hookChannelList?.load();
      if (channelId == $channel.id)
        chatContext?.hookChannel?.remove();
    },
    delete: (channelId: any) => {
      toast({
        title: "Channel Deleted",
        status: "success",
        duration: 3000,
        position: "bottom-right",
      });
      chatContext?.hookChannelList?.load();
      if (channelId == $channel.id)
        chatContext?.hookChannel?.remove();
    },
  });

  const TemplateChatNew = () => {
    return (
      <ChatNew
        modal={modalChatNew}
      />
    );
  };

  const TemplateChatNewDm = (props: any) => {
    return <ChatNewDm modal={modalChatNewDm}></ChatNewDm>;
  };


  const TemplateActions = (props: any) => {
    return (
      <Pop
        trigger={<IconImage path="IconDarkMenu.png" />}
        placement="bottom-end"
      >
        <Col className="text-start">
          {/* <Button
            variant="transparent"
            size="sm"
            className="text-start"
            rightIcon={<IconImage path="IconDarkPinned.png" size="18" />}
          >
            <Row className="hr-between w-100" onClick={() => {}}>
              Pin Channel
            </Row>
          </Button> */}
          {!props?.item?.raw?.disconnected &&
          props?.item?.raw &&
          !props.item.raw?.muteStatus()?.muted ? (
            <Button
              variant="transparent"
              size="sm"
              className="text-start"
              rightIcon={<IconImage path="IconDarkMute.png" size="xs" />}
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
              size="sm"
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
          {props?.item?.isAdmin && (
            <Button
              variant="transparent"
              size="sm"
              className="text-start"
              rightIcon={<IconImage path="IconRedDelete.png" />}
            >
              <Row
                className="hr-between w-100"
                onClick={() => {
                  hookPortalChannel.deleteChannel(props.item);
                }}
              >
                Delete Channel
              </Row>
            </Button>
          )}

          {props.item.createdBy == authContext?.address ? (
            <Button
              variant="transparent"
              size="sm"
              className="text-start"
              rightIcon={<IconImage path="IconRedDelete.png" />}
            >
              <Row
                className="hr-between w-100"
                onClick={() => {
                  hookPortalChannel.deleteChannel(props.item);
                }}
              >
                Delete Channel
              </Row>
            </Button>
          ) : (
            <Button
              variant="transparent"
              size="sm"
              className="text-start"
              rightIcon={<IconImage path="IconDarkLeave.png" />}
            >
              <Row
                className="hr-between w-100"
                onClick={() => {
                  hookPortalChannel.leaveChannel(props.item);
                }}
              >
                Leave Channel
              </Row>
            </Button>
          )}
        </Col>
      </Pop>
    );
  };

  const TemplateNewHolder = () => {
    return (
      <Button onClick={modalChatNew.onOpen} variant="state_brand">
        Create Channel
      </Button>
    );
  };

  const TemplateLoading = () => {
    return <LoadChannels />;
  };

  const TemplateChatList = () => {
    return (
      <>
        <Row className="header vr-center hr-between">
          <ChatSearch style={{ className: "w-80" }} />
          <IconImage
            path="IconDarkPlus.png"
            onClick={triggerNew}
            styled={{ className: "m-l-1" }}
          />
        </Row>
        <Col className="body verticlescroll hidescroll">
          {!$channels ? (
            <TemplateLoading />
          ) : (
            <>
              {$channels?.length ? (
                <ul>
                  {/* <button onClick={() => chatContext?.hookChannels?.handleChannelAction('MULTISELECT')}>Multiselect</button> */}
                  {$channels.map((item: any, index: number) => (
                    <StyledChatItem key={item?.index}>
                      {/* {chatContext?.hookChannels?.actionMessage ==
                      "MULTISELECT" && (
                      <Checkbox
                        className="m-r-0-5"
                        isChecked={chatContext.hookChannels?.selectedChannels.includes(
                          item?.id
                        )}
                        onChange={() =>
                          chatContext.hookChannels?.handleSelectChannel(item)
                        }
                      />
                    )} */}
                      <StyledCard
                        className= {
                          $channel?.id == item?.id
                            ? "state_brand menu-item w-100 m-b-0-5"
                            : "state_card_hover menu-item w-100 m-b-0-5"
                        }
                        
                      >
                        <Row className="vr-center">
                        <Row
                          className="vr-center w-11-12"
                          onClick={() => {
                            handleSelectChannel(item)
                          }}
                        >
                          {/* <Checkbox defaultChecked className="m-r-0-5" /> */}
                          <Avatar
                            size="md"
                            className="m-r-0-5"
                            name={item?.name}
                          />
                          <Col className="w-100 d-flex flex-col vr-center">
                            <Row>
                              <Text>
                                {item?.name?.length > 12
                                  ? `${item?.name?.slice(0, 12)}...`
                                  : item?.name}
                              </Text>
                              {item?.raw && (
                                <>
                                  {!item?.raw?.disconnected &&
                                    item?.raw?.muteStatus()?.muted && (
                                      <IconImage
                                        path="IconDarkMute.png"
                                        size="2xs"
                                        style={{ className: "m-l-0-5" }}
                                      />
                                    )}
                                </>
                              )}
                            </Row>

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
                            {item?.lastMessage?.created_at && (
                              <Col>
                                <Text fontSize={"xs"}>
                                  {new Date(
                                    item?.lastMessage?.created_at
                                  ).toLocaleString()}
                                </Text>
                              </Col>
                            )}
                          </Col>
                          {item?.unreadCountObject &&
                            item?.unreadCountObject[authContext?.address]
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

                        {($channelLoad && (channelSelected?.id == item?.id)) && <Spinner size='xs' />}

                        <Col className="hr-center w-1-12 settingsIcon m-l-0-5">
                          <TemplateActions item={item} />
                          
                        </Col>
                        </Row>
                      </StyledCard>
                    </StyledChatItem>
                  ))}
                </ul>
              ) : (
                <>
                  <TemplateNewHolder />
                </>
              )}
            </>
          )}
        </Col>
      </>
    );
  };

  const triggerNew = () => {
    if (router.pathname == "/chat") {
      modalChatNew.onOpen();
    }
    if (router.pathname == "/chat/dm") {
      modalChatNewDm.onOpen();
    }
  };

  return (
    <>
      <TemplateChatList />

      {modalChatNew.isOpen && <TemplateChatNew />}

      {modalChatNewDm.isOpen && <TemplateChatNewDm modal={modalChatNewDm} />}
    </>
  );
};

export default ChatList;
