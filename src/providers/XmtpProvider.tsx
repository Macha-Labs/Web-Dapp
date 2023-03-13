import { fetchSigner } from "@wagmi/core";
import { DecodedMessage, SortDirection } from "@xmtp/xmtp-js";
import React, { createContext, useContext, useEffect, useState } from "react";
import { Client } from "@xmtp/xmtp-js";
import { AuthContext } from "./AuthProvider";
import { ChannelXMTP$ } from "@/schema/channel";
import { XmtpMessage$ } from "@/schema/message";
export type XmtpContextType = {
  fetchXmtpConversation: (text: string) => void;
  sendXmtpMessage: () => void;
  fetchXmtpConversationList: any | undefined;
  allConversations: any | undefined;
  conversation: any | undefined;
  messages: any[] | undefined;
  xmtpClientAddress: any | undefined;
};

export const XmtpContext = createContext<XmtpContextType>({
  fetchXmtpConversation: () => {},
  sendXmtpMessage: () => {},
  fetchXmtpConversationList: null,
  allConversations: [],
  conversation: null,
  messages: [],
  xmtpClientAddress: null,
});

export const XmtpProvider = ({ children }: any) => {
  const authContext = useContext(AuthContext);
  const xmtpClient = authContext.xmtpClient;
  const xmtpClientAddress = authContext.xmtpClientAddress;
  const [messages, setMessages] = useState<DecodedMessage[]>([]);
  const [conversation, setConversation] = useState<any>();
  const [allConversations, setAllConversations] = useState<any>();
  const [peerAddress, setPeerAddress] = useState<string>("");
  const [state, setState] = useState<boolean>(false);

  /**
   * @description Function to connect to XMTP to enable messaging
   *
   *
   **/
  useEffect(() => {
    if (xmtpClientAddress) {
      // const streamMessages = async () => {
      //   const newStream = await conversation.streamMessages();
      //   for await (const msg of newStream) {
      //     setMessages(prevMessages => {
      //       const messages = [...prevMessages];
      //       messages.unshift(msg);
      //       return messages;
      //     });
      //   }
      // };
      // streamMessages();
    }
    console.log("first");
  }, [conversation, xmtpClientAddress, peerAddress]);

  useEffect(() => {
    console.log("fetching");
    console.log(xmtpClientAddress, "client address");
    if (xmtpClientAddress) {
      fetchXmtpConversationList();
    }
  }, [xmtpClientAddress]);

  const fetchXmtpConversation = async (channel: any) => {
    const conversation = await xmtpClient.conversations.newConversation(
      channel?.id
    );
    const messages = await conversation.messages({
      direction: SortDirection.SORT_DIRECTION_DESCENDING,
    });
    const messagesData = messages.map((item: any) => {
      return XmtpMessage$(item);
    });
    // console.log("conversation", conversation.send("hulle hula le hula"));

    setMessages(messagesData);
    setConversation(conversation);
  };
  const fetchXmtpConversationList = async () => {
    const conversationList = await xmtpClient.conversations.list();
    const data = conversationList.map((item: any) => {
      return ChannelXMTP$(item);
    });
    setAllConversations(data);
  };

  const sendXmtpMessage = async (text: string) => {
    console.log("sent");

    // if (conversation) {
    //   console.log("inside if sendXmtp");
    //   return await conversation.send(text);
    // } else {
    //   return console.log("inside else sendXmtp");
    // }
    conversation.send(text).then((res: any) => {
      console.log(res);
    });
  };

  return (
    <XmtpContext.Provider
      value={{
        fetchXmtpConversation,
        sendXmtpMessage,
        fetchXmtpConversationList,
        allConversations,
        conversation,
        messages,
        xmtpClientAddress,
      }}
    >
      {children}
    </XmtpContext.Provider>
  );
};
