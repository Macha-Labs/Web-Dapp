import AuthCard from "@/components/auth/AuthCard";
import ChatMessage from "@/components/chat/chatcontainer/ChatMessage";
import ModalWindow from "@/components/modal/ModalWindow";
import Nav from "@/components/nav/Nav";
import { truncateAddress } from "@/helpers";
import useLensProfile from "@/hooks/lens/useLensProfile";
import { AuthContext } from "@/providers/AuthProvider";
import { XmtpContext } from "@/providers/XmtpProvider";
import {
  StyledWindow,
  StyledChatList,
  StyledChat,
  Col,
  Row,
  StyledChatItem,
} from "@/styles/StyledComponents";
import { Avatar, Button, Text, useDisclosure } from "@chakra-ui/react";
import React, { useContext, useEffect, useState } from "react";
import { ChatContext } from "../../../providers/ChatProvider";

function IndexDM() {
  const authContext = useContext(AuthContext);
  const chatContext = useContext(ChatContext);
  const hookLens = useLensProfile();
  const modalAuth = useDisclosure();

  useEffect(() => {}, []);

  useEffect(() => {
    if (authContext?.isConnected) {
      modalAuth.onClose();
    } else {
      modalAuth.onOpen();
    }
  }, [authContext?.isConnected]);

  const TemplateAuth = () => {
    return (
      <>
        <ModalWindow event={modalAuth}>
          <AuthCard />
        </ModalWindow>
      </>
    );
  };

  return (
    <>
      {authContext.isConnected && (
        <StyledWindow>
          <div className="left">
            <Nav />
          </div>

          <div className="right">
            <StyledChatList>
              <Col className="body verticlescroll hidescroll">
                {chatContext?.channels?.length ? (
                  <ul>
                    {/* <button onClick={() => chatProvider?.hookChannels?.handleChannelAction('MULTISELECT')}>Multiselect</button> */}
                    {chatContext?.channels?.map((item: any, index: number) => {
                      return (
                        <StyledChatItem key={index}>
                          <Button
                            className="menu-item w-100 m-b-0-5"
                            size="xl"
                            variant={"state_brand"}
                            // overflow="hidden"
                          >
                            <Row
                              className="vr-center w-11-12"
                              onClick={() => {
                                chatContext.fetchXmtpConversation();
                              }}
                            >
                              {/* <Checkbox defaultChecked className="m-r-0-5" /> */}
                              <Avatar
                                size="md"
                                className="m-r-0-5"
                                name={item?.peerAddress}
                              />
                              <Col className="w-100 d-flex flex-col vr-center">
                                <Row>
                                  <Text>
                                    {truncateAddress(item?.peerAddress)}
                                  </Text>
                                </Row>
                                {item?.createdAt && (
                                  <Col>
                                    <Text fontSize={"xs"}>
                                      {new Date(
                                        item?.createdAt
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
                            </Row>
                          </Button>
                        </StyledChatItem>
                      );
                    })}
                  </ul>
                ) : (
                  <>
                    <Button variant="state_brand">Create a DM</Button>
                  </>
                )}
              </Col>
            </StyledChatList>
            <div onClick={() => authContext.sendXmtpMessage()}>Send GM</div>
            <StyledChat>
              {authContext.messages.map(item => {
                return (
                  <>
                    <ChatMessage
                      message={{
                        html: item.content,
                        user: { id: item.senderAddress },
                        created_at: item.sent,
                      }}
                      authContext={authContext}
                    />
                  </>
                );
              })}
              {/* <ChatInput hookChat={{}} /> */}
            </StyledChat>
          </div>
        </StyledWindow>
      )}
      <TemplateAuth />
    </>
  );
}

export default IndexDM;
