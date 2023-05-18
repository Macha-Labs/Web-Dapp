import {
  StyledCol,
  StyledRow,
  StyledCard,
  StyledCardPannel,
  StyledChatItem,
  StyledXMTPCard,
} from "@/styles/StyledComponents";
import {
  Avatar,
  Box,
  Button,
  CloseButton,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  Heading,
  Image,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Spinner,
  Tag,
  Text,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { useContext, useEffect } from "react";
import { AuthContext, AuthContextType } from "@/providers/AuthProvider";
import ChatNew from "./ChatNew";
import IconImage from "@/_ui/icons/IconImage";
import { truncateAddress } from "@/helpers";
import InputSearch from "../../_ui/input/InputSearch";
import React, { useState } from "react";
import PopoverNative from "../pop/Pop";
import { darkStyle } from "@/styles/StyledConstants";
import usePortalChannel from "@/hooks/portal/usePortalChannel";

import { ChatContext } from "@/providers/ChatProvider";
import LoadChannels from "../load/LoadChannels";
import { useRouter } from "next/router";
import ChatNewDm from "./ChatNewDm";
import useChatChannelsStore from "@/store/useChatChannelsStore";
import useChatChannelStore from "@/store/useChatChannelStore";

import ModalWindow from "../modal/ModalWindow";
import Link from "next/link";
const ChatList = (props: any) => {
  console.log("Rendering >>>>> ChatList");
  const chatContext = useContext(ChatContext);
  const authContext = useContext(AuthContext) as AuthContextType;
  const router = useRouter();
  const modalChatNew = useDisclosure();
  const modalChatNewDm = useDisclosure();
  const modalXMTP = useDisclosure();
  const toast = useToast();
  const [isClicked, setIsClicked] = useState<any>([]);
  const $channels = useChatChannelsStore((state: any) => state.channels);
  const $channel = useChatChannelStore((state: any) => state.channel);
  const $channelLoad = useChatChannelStore((state: any) => state.loading);
  const [channelSelected, setChannelSelected] = useState<any>();

  const [cross, setCross] = useState(false);
  const [showCard, setShowCard] = useState(true);
  // TODO: Fix bandaging
  useEffect(() => {
    console.log(router, "router is here");
    chatContext?.hookChannelList.load();
    chatContext?.hookChannel?.unload();
  }, [router.pathname]);

  const handleSelectChannel = (channel: any) => {
    setChannelSelected(channel);
    chatContext?.hookChannel?.fetch(channel);
  };

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
      if (channelId == $channel.id) chatContext?.hookChannel?.remove();
    },
    delete: (channelId: any) => {
      toast({
        title: "Channel Deleted",
        status: "success",
        duration: 3000,
        position: "bottom-right",
      });
      chatContext?.hookChannelList?.load();
      if (channelId == $channel.id) chatContext?.hookChannel?.remove();
    },
  });

  const templateChatNew = () => {
    return <ChatNew modal={modalChatNew} />;
  };

  const TemplateChatNewDm = (props: any) => {
    return <ChatNewDm modal={modalChatNewDm}></ChatNewDm>;
  };

  const TemplateActions = (props: any) => {
    return (
      // <Text>asdf</Text>
      // <Popover placement="bottom" size="md">
      //   <PopoverTrigger>
      //     <IconImage path="IconDarkMenu.png" />
      //   </PopoverTrigger>
      //   <PopoverContent>
      //     <Text>asdf</Text>
      //   </PopoverContent>
      // </Popover>
      <div style={{ position: "absolute", marginTop: -14 }}>
        <PopoverNative
          trigger={<IconImage path="IconDarkMenu.png" />}
          placement="bottom-end"
        >
          <StyledCol className="text-start">
            {!props?.item?.raw?.disconnected &&
            props?.item?.raw &&
            !props.item.raw?.muteStatus()?.muted ? (
              <Button
                variant="transparent"
                size="sm"
                className="text-start"
                rightIcon={<IconImage path="IconDarkMute.png" size="xs" />}
              >
                <StyledRow
                  className="hr-between w-100"
                  onClick={() => {
                    hookPortalChannel.muteChannel(props.item);
                  }}
                >
                  Mute Channel
                </StyledRow>
              </Button>
            ) : (
              <Button
                variant="transparent"
                size="sm"
                className="text-start"
                rightIcon={<IconImage path="IconDarkUnMute.png" />}
              >
                <StyledRow
                  className="hr-between w-100"
                  onClick={() => {
                    hookPortalChannel.unMuteChannel(props.item);
                  }}
                >
                  Unmute Channel
                </StyledRow>
              </Button>
            )}
            {props?.item?.isAdmin && (
              <Button
                variant="transparent"
                size="sm"
                className="text-start"
                rightIcon={<IconImage path="IconRedDelete.png" />}
              >
                <StyledRow
                  className="hr-between w-100"
                  onClick={() => {
                    hookPortalChannel.deleteChannel(props.item);
                  }}
                >
                  Delete Channel
                </StyledRow>
              </Button>
            )}

            {props.item.createdBy == authContext?.address ? (
              <Button
                variant="transparent"
                size="sm"
                className="text-start"
                rightIcon={<IconImage path="IconRedDelete.png" />}
              >
                <StyledRow
                  className="hr-between w-100"
                  onClick={() => {
                    hookPortalChannel.deleteChannel(props.item);
                  }}
                >
                  Delete Channel
                </StyledRow>
              </Button>
            ) : (
              <Button
                variant="transparent"
                size="sm"
                className="text-start"
                rightIcon={<IconImage path="IconDarkLeave.png" />}
              >
                <StyledRow
                  className="hr-between w-100"
                  onClick={() => {
                    hookPortalChannel.leaveChannel(props.item);
                  }}
                >
                  Leave Channel
                </StyledRow>
              </Button>
            )}
          </StyledCol>
        </PopoverNative>
      </div>
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
  const XMTPpopup = () => {
    const handleClose = () => {
      setShowCard(false);
    };

    const handleButtonClick = () => {
      // code to redirect to other page
    };
    return (
      <>
        {showCard && (
          <StyledXMTPCard>
            <Flex alignItems="center" justifyContent="space-between">
              {router.pathname == "/" ? (
                <Image
                  src="/assets/xmtp-white.png"
                  alt="Logo"
                  mr={2}
                  width="100px"
                />
              ) : (
                <Image
                  src="/assets/getStream-white.png"
                  alt="Logo"
                  mr={2}
                  width="100px"
                />
              )}
              <IconImage path="IconDarkCross.png" onClick={handleClose} />
            </Flex>
            {router.pathname == "/" ? (
              <Text fontSize="md" my={4}>
                Discover 1:1 encrypted DMs with your Lens frens powered by XMTP
              </Text>
            ) : (
              <Text fontSize="md" my={4}>
                Discover Public and Token Gated communities to join group chats
              </Text>
            )}
            {router.pathname == "/" ? (
              <Link href="/chat/dm">
                <Button
                  variant="state_xmtp"
                  onClick={handleButtonClick}
                  width="100%"
                  // mb={2}
                >
                  Explore 1:1 Inbox
                </Button>
              </Link>
            ) : (
              <Link href="/">
                <Button
                  variant=""
                  onClick={handleButtonClick}
                  width="100%"
                  // mb={2}
                >
                  Explore Channels
                </Button>
              </Link>
            )}
          </StyledXMTPCard>
        )}
      </>
    );
  };
  const templateChatList = () => {
    return (
      <>
        <StyledRow className="header vr-center hr-between">
          <InputSearch style={{ className: "w-80" }} />
          <IconImage
            path="IconDarkPlus.png"
            onClick={triggerNew}
            styled={{ className: "m-l-1" }}
          />
        </StyledRow>
        <StyledCol className="body verticlescroll hidescroll">
          {!$channels ? (
            <TemplateLoading />
          ) : (
            <>
              {$channels?.length ? (
                <ul style={{ padding: "0px  " }}>
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
                        className={
                          $channel?.id == item?.id
                            ? "state_brand menu-item w-100 m-b-0-5"
                            : "state_card_hover menu-item w-100 m-b-0-5"
                        }
                      >
                        <StyledRow className="vr-center">
                          <StyledRow
                            className="vr-center w-11-12"
                            onClick={() => {
                              handleSelectChannel(item);
                            }}
                          >
                            {/* <Checkbox defaultChecked className="m-r-0-5" /> */}
                            <Avatar
                              size="md"
                              className="m-r-0-5"
                              name={item?.name}
                              src={item?.image ? item?.image : item?.name}
                            />
                            <StyledCol className="w-100 d-flex flex-col vr-center">
                              <StyledRow>
                                <Text
                                  paddingBottom={"0px"}
                                  marginBottom="0px"
                                  style={{
                                    paddingBottom: "0px",
                                    marginBottom: "0px",
                                  }}
                                >
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
                              </StyledRow>

                              {item?.lastMessage && (
                                <StyledCol
                                  style={{ paddingRight: "5px" }}
                                  className="m-t-0-5"
                                >
                                  <Text
                                    fontSize={"xs"}
                                    paddingBottom={"0px"}
                                    marginBottom="0px"
                                    style={{
                                      paddingBottom: "0px",
                                      marginBottom: "0px",
                                    }}
                                  >
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
                                </StyledCol>
                              )}
                              {item?.lastMessage?.created_at && (
                                <StyledCol>
                                  <Text
                                    fontSize={"xs"}
                                    paddingBottom={"0px"}
                                    marginBottom="0px"
                                    style={{
                                      paddingBottom: "0px",
                                      marginBottom: "0px",
                                    }}
                                  >
                                    {new Date(
                                      item?.lastMessage?.created_at
                                    ).toLocaleString()}
                                  </Text>
                                </StyledCol>
                              )}

                              {item?.private == false && (
                                <StyledRow className="m-t-0-5">
                                  <Tag size="sm">Public</Tag>
                                </StyledRow>
                              )}
                            </StyledCol>
                            {item?.unreadCountObject &&
                              item?.unreadCountObject[authContext?.address]
                                ?.unread_messages > 0 &&
                              !isClicked.includes(index) && (
                                <StyledCol>
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
                                </StyledCol>
                              )}
                          </StyledRow>

                          {$channelLoad && channelSelected?.id == item?.id && (
                            <Spinner size="xs" />
                          )}

                          <StyledCol className="hr-center w-1-12 settingsIcon m-l-0-5">
                            <TemplateActions item={item} />
                          </StyledCol>
                        </StyledRow>
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
          <XMTPpopup />
        </StyledCol>
      </>
    );
  };

  const triggerNew = () => {
    if (router.pathname == "/") {
      modalChatNew.onOpen();
    }
    if (router.pathname == "/chat/dm") {
      modalChatNewDm.onOpen();
    }
  };

  return (
    <>
      {templateChatList()}

      {modalChatNew.isOpen && templateChatNew()}

      {modalChatNewDm.isOpen && <TemplateChatNewDm modal={modalChatNewDm} />}
    </>
  );
};

export default ChatList;
