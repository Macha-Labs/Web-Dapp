import { Col, Row, StyledChatItem } from "@/styles/StyledComponents";
import {
  Avatar,
  Button,
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
import useChatChannels from "@/hooks/chat/useChatChannels";
import { ChatContext } from "@/providers/ChatProvider";
import LoadChannels from "../load/LoadChannels";
import { useRouter } from "next/router";
import useChatChannel from "@/hooks/chat/useChatChannel";
import { DataContext } from "@/providers/DataProvider";
import ChatNewDm from "./ChatNewDm";

const ChatList = (props: any) => {
  console.log("Rendering >>>>> ChatList");
  const chatContext = useContext(ChatContext);
  const authContext = useContext(AuthContext) as AuthContextType;
  const dataContext = useContext(DataContext);
  const hookChatChannel = useChatChannel();
  const hookChatChannels = useChatChannels();
  const router = useRouter();
  const modalChatNew = useDisclosure();
  const modalChatNewDm = useDisclosure();
  const toast = useToast();
  const [isClicked, setIsClicked] = useState<any>([]);

  // TODO: Fix bandaging
  useEffect(() => {
    hookChatChannels.load();
  }, [router.pathname, chatContext.streamContext?.client?.user?.id]);

  const hookPortalChannel = usePortalChannel(null, {
    mute: () => {
      toast({
        title: "Channel Muted",
        status: "success",
        duration: 3000,
        position: "bottom-right",
      });
      hookChatChannels?.load();
      hookChatChannel.reload();
    },
    unmute: () => {
      toast({
        title: "Channel Unmuted",
        status: "success",
        duration: 3000,
        position: "bottom-right",
      });
      hookChatChannels?.load();
      hookChatChannel.reload();
    },
    leave: () => {
      toast({
        title: "Channel Left",
        status: "success",
        duration: 3000,
        position: "bottom-right",
      });
      hookChatChannels?.load();
      hookChatChannel.remove();
    },
    delete: () => {
      toast({
        title: "Channel Deleted",
        status: "success",
        duration: 3000,
        position: "bottom-right",
      });
      hookChatChannels?.load();
      hookChatChannel.remove();
    },
  });

  const TemplateChatNew = () => {
    return (
      <ChatNew
        modal={modalChatNew}
        hookChatChannels={hookChatChannels}
        hookChatChannel={hookChatChannel}
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
          {!dataContext?.channels ? (
            <TemplateLoading />
          ) : (
            <>
              {dataContext?.channels?.length ? (
                <ul>
                  {/* <button onClick={() => chatContext?.hookChannels?.handleChannelAction('MULTISELECT')}>Multiselect</button> */}
                  {dataContext?.channels.map((item: any, index: number) => (
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
                      <Button
                        className="menu-item w-100 m-b-0-5"
                        size="xl"
                        variant={
                          dataContext.channel?.id == item?.id
                            ? "state_brand"
                            : "state_card_hover"
                        }
                        // overflow="hidden"
                      >
                        <Row
                          className="vr-center w-11-12"
                          onClick={() => {
                            hookChatChannel?.fetch(item);
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

                        <Col className="hr-center w-1-12 settingsIcon">
                          <TemplateActions item={item} />
                        </Col>
                      </Button>
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
