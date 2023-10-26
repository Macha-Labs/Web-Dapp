import IconImage from "@/_ui/icons/IconImage";
import PopoverNative from "@/_ui/popover/PopoverNative";
import { truncateAddress } from "@/helpers";
// import usePortalChannel from "@/hooks/portal/usePortalChannel";
import { AuthContext, AuthContextType } from "@/providers/AuthProvider";
import {
  StyledCard,
  StyledChatItem,
  StyledCol,
  StyledRow,
  StyledXMTPCard,
} from "@/styles/StyledComponents";
import { darkStyle } from "@/styles/StyledConstants";
import {
  Avatar,
  Button,
  Flex,
  Image,
  Spinner,
  Tag,
  Text,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { useContext, useEffect, useState } from "react";
import InputSearch from "../../_ui/input/InputSearch";
import ChatNew from "./ChatNew";

// import { ChatContext } from "@/providers/ChatProvider";
import useChatChannelStore from "@/store/useChatChannelStore";
import useChatChannelsStore from "@/store/useChatChannelsStore";
import { useRouter } from "next/router";
// import LoadChannels from "../load/LoadChannels";
import ChatNewDm from "./ChatNewDm";

import Link from "next/link";
import FlexRow from "@/_ui/flex/FlexRow";
import FlexColumn from "@/_ui/flex/FlexColumn";
const ChatList = (props: any) => {
  //console.log("Rendering >>>>> ChatList");
  // const chatContext = useContext(ChatContext);
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

  const templateChatNew = () => {
    return <ChatNew modal={modalChatNew} />;
  };

  const TemplateChatNewDm = (props: any) => {
    return <ChatNewDm modal={modalChatNewDm}></ChatNewDm>;
  };

  const TemplateActions = (props: any) => {
    return (
      <div style={{ position: "absolute", marginTop: -14 }}>
        <PopoverNative
          trigger={<IconImage slug="IconDarkMenu.png" />}
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
                rightIcon={<IconImage slug="IconDarkMute.png" size="xs" />}
              >
                <StyledRow
                  className="hr-between w-100"
                  onClick={() => {
                    // hookPortalChannel.muteChannel(props.item);
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
                rightIcon={<IconImage slug="IconDarkUnMute.png" />}
              >
                <StyledRow
                  className="hr-between w-100"
                  onClick={() => {
                    // hookPortalChannel.unMuteChannel(props.item);
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
                rightIcon={<IconImage slug="IconRedDelete.png" />}
              >
                <StyledRow
                  className="hr-between w-100"
                  onClick={() => {
                    // hookPortalChannel.deleteChannel(props.item);
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
                rightIcon={<IconImage slug="IconRedDelete.png" />}
              >
                <StyledRow
                  className="hr-between w-100"
                  onClick={() => {
                    // hookPortalChannel.deleteChannel(props.item);
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
                rightIcon={<IconImage slug="IconDarkLeave.png" />}
              >
                <StyledRow
                  className="hr-between w-100"
                  onClick={() => {
                    // hookPortalChannel.leaveChannel(props.item);
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
              <IconImage slug="IconDarkCross.png" onClick={handleClose} />
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
      <FlexColumn marginLeft="5rem">
        <FlexRow className="header vr-center hr-between" marginLeft="15rem">
          <InputSearch style={{ className: "w-80" }} />
          <IconImage
            slug="IconDarkPlus.png"
            onClick={triggerNew}
            style={{ className: "m-l-1" }}
          />
        </FlexRow>
        <StyledCol className="body verticlescroll hidescroll">
          <>
            
              <ul style={{ padding: "0px  " }}>
                {/* <button onClick={() => chatContext?.hookChannels?.handleChannelAction('MULTISELECT')}>Multiselect</button> */}
               
                  <StyledChatItem >
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
                   
                           "state_brand menu-item w-100 m-b-0-5"
                          
                      }
                    >
                      <StyledRow className="vr-center">
                        <StyledRow
                          className="vr-center w-11-12"
                          // onClick={() => {
                          //   handleSelectChannel(item);
                          // }}
                        >
                          {/* <Checkbox defaultChecked className="m-r-0-5" /> */}
                          <Avatar
                            size="md"
                            className="m-r-0-5"
                            name="avatar"
                           
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
                               Lorem ipsum dolor sit, amet consectetur adipisicing elit. Sint repellendus corporis sit!
                              </Text>
                              
                            </StyledRow>

                            
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
                                  Lorem, ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis consequatur dignissimos beatae architecto pariatur?
                                </Text>
                              </StyledCol>
                            
                           
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
                                  Date
                                </Text>
                              </StyledCol>
                            

                            
                              <StyledRow className="m-t-0-5">
                                <Tag size="sm">Public</Tag>
                              </StyledRow>
                            
                          </StyledCol>
                         
                        </StyledRow>

                       

                        <StyledCol className="hr-center w-1-12 settingsIcon m-l-0-5">
                          {/* <TemplateActions item={item} /> */}
                        </StyledCol>
                      </StyledRow>
                    </StyledCard>
                  </StyledChatItem>
             
              </ul>
            
          </>

          {/* <XMTPpopup /> */}
        </StyledCol>
      </FlexColumn>
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

      {/* {modalChatNew.isOpen && templateChatNew()}

      {modalChatNewDm.isOpen && <TemplateChatNewDm modal={modalChatNewDm} />} */}
    </>
  );
};

export default ChatList;
