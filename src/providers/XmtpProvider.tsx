import { fetchSigner } from "@wagmi/core";
import { DecodedMessage, SortDirection } from "@xmtp/xmtp-js";
import React, { createContext, useEffect, useState } from "react";
import { Client } from "@xmtp/xmtp-js";
export type XmtpContextType = {};

export const XmtpContext = createContext<XmtpContextType>({});

export const XmtpProvider = ({ children }: any) => {
  const [messages, setMessages] = useState<DecodedMessage[]>([]);
  const [conversation, setConversation] = useState<any>();
  const [xmtpClientAddress, setXmtpClientAddress] = useState<any>();
  const [allConversations, setAllConversations] = useState<any>();
  const [peerAddress, setPeerAddress] = useState<string>("");
  const [xmtpClient, setXmtpClient] = useState<any>();

  /**
   * @description Function to connect to XMTP to enable messaging
   *
   *
   **/
  useEffect(() => {
    if (xmtpClientAddress) {
      const streamMessages = async () => {
        const newStream = await conversation.streamMessages();
        for await (const msg of newStream) {
          setMessages(prevMessages => {
            const messages = [...prevMessages];
            messages.unshift(msg);
            return messages;
          });
        }
      };
      streamMessages();
    }
    console.log("first");
  }, [conversation, xmtpClientAddress, peerAddress]);

  const connectXmtp = async () => {
    const signer = await fetchSigner();
    const xmtp = await Client.create(signer, { env: "production" });
    setXmtpClient(xmtp);
    setXmtpClientAddress(xmtp.address);
  };

  const fetchXmtpConversation = async (peerAddress: any) => {
    const conversation = await xmtpClient.conversations.newConversation(
      peerAddress
    );
    const messages = await conversation.messages({
      direction: SortDirection.SORT_DIRECTION_DESCENDING,
    });
    setMessages(messages);
    setConversation(conversation);
  };
  const fetchXmtpConversationList = async () => {
    const conversationList = await xmtpClient.conversations.list();
    setAllConversations(conversationList);
  };

  const sendXmtpMessage = async () => {
    await conversation.send("gm ser");
  };

  return (
    <XmtpContext.Provider
      value={{
        connectXmtp,
        fetchXmtpConversation,
        sendXmtpMessage,
        fetchXmtpConversationList,
        allConversations,
        conversation,
        messages,
        xmtpClientAddress,
      }}
    ></XmtpContext.Provider>
  );
};
