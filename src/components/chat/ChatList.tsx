import { Col, Row, StyledChatItem } from "@/styles/StyledComponents";
import {
  Avatar,
  Button,
  Checkbox,
  Heading,
  Icon,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import OrgControl from "../org/OrgControl";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useContext } from "react";
import { ChatContext } from "@/providers/ChatProvider";
import { AuthContext, AuthContextType } from "@/providers/AuthProvider";
import useOrgChannels from "@/hooks/portal/useOrgChannels";
import ModalSlider from "../modal/ModalSlider";
import ChatNew from "./ChatNew";
import IconImage from "../icons/IconImage";
import { truncateAddress } from "@/helpers";
import ChatSearch from "./chatcontainer/ChatSearch";
import { Input, InputGroup, InputLeftElement } from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
import React, { useState } from "react";
import Pop from "../pop/Pop";
import { darkStyle } from "@/styles/StyledConstants";

const ChatList = (props: any) => {
  const chatProvider = useContext(ChatContext);
  const authContext = useContext(AuthContext) as AuthContextType;
  const hookOrgChannels = useOrgChannels("6246c7045cc31c36781d668e");
  const modalChatNew = useDisclosure();
  let filteredList = [...chatProvider?.hookChannels?.channels];
  const [isClicked, setIsClicked] = useState<any>([]);
  console.log("filteredList", filteredList);

  const TemplateChatNew = () => {
    return (
      <ModalSlider event={modalChatNew} size="lg">
        <ChatNew modal={modalChatNew} />
      </ModalSlider>
    );
  };

  const TemplateActions = () => {
    // console.log("helo") ;
    return (
      <Pop
        trigger={<IconImage path="IconDarkMenu.png" />}
        // placement="bottom-end"
      >
        <Col className="text-start">
          <Button
            variant="transparent"
            size="md"
            className="text-start"
            rightIcon={<IconImage path="IconDarkFiles.png" />}
          >
            <Row className="hr-between w-100" onClick={() => {}}>
              Pin Channel
            </Row>
          </Button>
          <Button
            variant="transparent"
            size="md"
            className="text-start"
            rightIcon={<IconImage path="IconDarkFiles.png" />}
          >
            <Row className="hr-between w-100" onClick={() => {}}>
              Mute Channel
            </Row>
          </Button>
          <Button
            variant="transparent"
            size="md"
            className="text-start"
            rightIcon={<IconImage path="IconDarkFiles.png" />}
          >
            <Row className="hr-between w-100" onClick={() => {}}>
              Clear Chat
            </Row>
          </Button>
        </Col>
      </Pop>
    );
  };

  const handleSearch = (query: any) => {
    filteredList = chatProvider?.hookChannels?.channels.filter((item: any) =>
      item.name.toLowerCase().includes(query.toLowerCase())
    );
    console.log("filter", filteredList);
    return filteredList;
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
                {filteredList.map((item: any, index: number) => (
                  <StyledChatItem key={index}>
                    <Button
                      onClick={() => {
                        console.log("Click on button", item);
                        chatProvider.initiate(item, authContext.address);
                        setIsClicked((prevState: any) => [...prevState, index]);
                      }}
                      className="menu-item w-100 m-b-0-5"
                      size="xl"
                      variant={
                        chatProvider.hookChannel.channel?.id == item?.id
                          ? "state_brand"
                          : "state_card_hover"
                      }
                    >
                      {/* <Checkbox defaultChecked className="m-r-0-5" /> */}
                      <Avatar size="md" className="m-r-0-5" name={item.name} />
                      <Col className="w-100 d-flex flex-col">
                        {item.name}
                        {item?.lastMessage && (
                          <Col className="m-t-0-5">
                            <Text fontSize={"sm"}>
                              {item.lastMessage?.user?.lensUsername ||
                                item.lastMessage?.user?.lensHandle ||
                                truncateAddress(item.lastMessage?.user?.id)}
                              : {item.lastMessage?.text}
                            </Text>
                          </Col>
                        )}
                      </Col>
                      {item.unreadCountObject[authContext.address]
                        .unread_messages > 0 &&
                        !isClicked.includes(index) && (
                          <Col>
                            <Text
                              padding={1}
                              background={darkStyle.color5}
                              borderRadius="full"
                            >
                              {
                                item.unreadCountObject[authContext.address]
                                  .unread_messages
                              }
                            </Text>
                          </Col>
                        )}

                      <Col className="hr-center settingsIcon">
                        <TemplateActions />
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
