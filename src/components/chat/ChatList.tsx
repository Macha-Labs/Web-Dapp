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
import ModalSlider from "../modal/ModalSlider";
import ChatNew from "./ChatNew";
import IconImage from "../icons/IconImage";
import { truncateAddress } from "@/helpers";
import ChatSearch from "./chatcontainer/ChatSearch";
import React, { useState } from "react";
import Pop from "../pop/Pop";
import { darkStyle } from "@/styles/StyledConstants";
import usePortalChannel from "@/hooks/portal/usePortalChannel";
import useChatSelect from "@/hooks/chat/useChatSelect";
import useChatChannels from "@/hooks/chat/useChatChannels";
import { ChatContext } from "@/providers/ChatProvider";

const ChatList = (props: any) => {
  const chatContext = useContext(ChatContext);
  const authContext = useContext(AuthContext) as AuthContextType;
  const hookChatSelect = useChatSelect();
  const hookChatChannels = useChatChannels();
  const modalChatNew = useDisclosure();
  const toast = useToast();
  const [isClicked, setIsClicked] = useState<any>([]);
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
        hookChatChannels?.reload();
        chatContext?.streamContext?.reloadChannel();
      },
      unmute: () => {
        toast({
          title: "Channel Unmuted",
          status: "success",
          duration: 3000,
          position: "bottom-right",
        });
        hookChatChannels?.reload();
        chatContext?.streamContext?.reloadChannel();
      },
      leave: () => {
        toast({
          title: "Channel Left",
          status: "success",
          duration: 3000,
          position: "bottom-right",
        });
        hookChatChannels?.reload();
        chatContext?.streamContext?.reloadChannel();
      },
      delete: () => {
        toast({
          title: "Channel Deleted",
          status: "success",
          duration: 3000,
          position: "bottom-right",
        });
        hookChatChannels?.reload();
        chatContext?.streamContext?.reloadChannel();
      },
    }
  );

  const unreadCountRef = useRef<any>([]);


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
          {!props?.item?.raw?.disconnected && props?.item?.raw && !props.item.raw?.muteStatus()?.muted ? (
            <Button
              variant="transparent"
              size="sm"
              className="text-start"
              rightIcon={<IconImage path="IconDarkMute.png" size="18" />}
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
              rightIcon={<IconImage path="IconDarkUnMute.png" size="18" />}
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
          {/* <Button
            variant="transparent"
            size="sm"
            className="text-start"
            rightIcon={<IconImage path="IconRedDelete.png" size="18" />}
          >
            <Row className="hr-between w-100"
              onClick={() => {
                // hookPortalChannel.deleteChannel(props.item);
              }}
            >
              Clear Chat
            </Row>
          </Button> */}
          {!props?.item?.isAdmin && (
            <Button
              variant="transparent"
              size="sm"
              className="text-start"
              rightIcon={<IconImage path="IconDarkLeave.png" size="18" />}
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
        {!hookChatChannels?.channels ? (
          <Col className="body">
            Create your first channel
            <Button size="sm" onClick={props.channelNew}>
              First Channel
            </Button>
          </Col>
        ) : (
          <Col className="body verticlescroll hidescroll">
            {hookChatChannels?.channels?.length ? (
              <ul>
                {/* <button onClick={() => chatContext?.hookChannels?.handleChannelAction('MULTISELECT')}>Multiselect</button> */}
                {hookChatChannels?.channels.map((item: any, index: number) => (
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
                        chatContext.channel?.id == item?.id
                          ? "state_brand"
                          : "state_card_hover"
                      }
                      // overflow="hidden"
                    >
                      <Col>
                      {props?.chatContext?.channel?.id}
                      {/* {item?.name} */}
                      </Col>
                      <Row
                        className="vr-center w-11-12"
                        onClick={() => {
                          hookChatSelect?.initiate(item, authContext?.address);
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
                                {!item?.raw?.disconnected && item?.raw?.muteStatus()?.muted && (
                                  <IconImage
                                    path="IconDarkMute.png"
                                    style={{ className: "m-l-0-5" }}
                                    size={10}
                                  />
                                )}
                              </>
                            )}
                          </Row>
                          {item?.lastMessage?.created_at && (
                            <Col>
                              <Text fontSize={"xs"}>
                                {new Date(
                                  item?.lastMessage?.created_at
                                ).toLocaleString()}
                              </Text>
                            </Col>
                          )}

                          {item?.lastMessage && (
                            <Col
                              style={{ paddingRight: "5px" }}
                              className="m-t-0-5"
                            >
                              <Text fontSize={"xs"}>
                                {item?.lastMessage?.user?.lensUsername ||
                                  item?.lastMessage?.user?.lensHandle ||
                                  truncateAddress(item?.lastMessage?.user?.id)}
                                :{" "}
                                {item?.lastMessage?.text.length > 14
                                  ? `${item?.lastMessage?.text.slice(0, 14)}...`
                                  : item?.lastMessage?.text}
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
                                  item?.unreadCountObject[authContext?.address]
                                    ?.unread_messages
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
