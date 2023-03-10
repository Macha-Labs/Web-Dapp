import AuthCard from "@/components/auth/AuthCard";
import ChatContainer from "@/components/chat/chatcontainer/ChatContainer";
import ChatInput from "@/components/chat/chatcontainer/ChatInput";
import ChatMembers from "@/components/chat/chatcontainer/ChatMembers";
import ChatMessage from "@/components/chat/chatcontainer/ChatMessage";
import ChatList from "@/components/chat/ChatList";
import IconImage from "@/components/icons/IconImage";
import ModalWindow from "@/components/modal/ModalWindow";
import Nav from "@/components/nav/Nav";
import { truncateAddress } from "@/helpers";
import useLensProfile from "@/hooks/lens/useLensProfile";
import useXmtp from "@/hooks/xmtp/useXmtp";
import AuthProvider, { AuthContext } from "@/providers/AuthProvider";
import {
  StyledWindow,
  StyledChatList,
  StyledChat,
  Col,
  Row,
  StyledChatItem,
} from "@/styles/StyledComponents";
import { darkStyle } from "@/styles/StyledConstants";
import {
  Avatar,
  Button,
  Checkbox,
  useDisclosure,
  Text,
} from "@chakra-ui/react";
import React, { useContext, useEffect, useState } from "react";
import { useAccount } from "wagmi";

function IndexDM() {
  const { isConnected, address } = useAccount();
  const authContext = useContext(AuthContext);
  const hookLens = useLensProfile();

  useEffect(() => {
    hookLens.getOwnedProfiles(address).then(res => console.log(res, "res"));
  }, [address]);

  return (
    <div>
      {isConnected && authContext.xmtpClientAddress ? (
        <StyledWindow>
          <div className="left">
            <Nav />
          </div>

          <div className="right">
            <StyledChatList>
              <Col className="body verticlescroll hidescroll">
                {authContext.allConversations?.length ? (
                  <ul>
                    {/* <button onClick={() => chatProvider?.hookChannels?.handleChannelAction('MULTISELECT')}>Multiselect</button> */}
                    {authContext.allConversations?.map(
                      (item: any, index: number) => {
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
                                  authContext.fetchXmtpConversation();
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
                                        {item?.lastMessage?.user
                                          ?.lensUsername ||
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
                      }
                    )}
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
      ) : (
        <>
          <AuthCard />
        </>
      )}
    </div>
  );
}

export default IndexDM;
