import { DecodedMessage, SortDirection } from "@xmtp/xmtp-js";
import React, { createContext, useContext, useEffect, useState } from "react";
import { AuthContext } from "./AuthProvider";
import { ChannelXMTP$ } from "@/schema/channel";
import { XmtpMessage$ } from "@/schema/message";
import { logger, loggerInit } from "@/helpers/logger";

export type XmtpContextType = {
  fetchXmtpConversation: (text: string) => void;
  sendXmtpMessage: any | undefined;
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
  console.log('Rendering >>>>> XmtpProvider');
  const authContext = useContext(AuthContext);
  const xmtpClient = authContext.xmtpClient;
  const xmtpClientAddress = authContext.xmtpClientAddress;
  const [messages, setMessages] = useState<DecodedMessage[]>([]);
  const [conversation, setConversation] = useState<any>();
  const [allConversations, setAllConversations] = useState<any>();

  /**
   * @description Function to connect to XMTP to enable messaging
   *
   *
   **/
  // useEffect(() => {
  //   if (xmtpClientAddress) {
  //     const streamMessages = async () => {
  //       const newStream = await conversation.streamMessages();
  //       console.log("newStream", newStream);
  //       for await (const msg of newStream) {
  //         setMessages(prevMessages => {
  //           const messages = [...prevMessages];
  //           messages.unshift(msg);
  //           return messages;
  //         });
  //       }
  //     };
  //     streamMessages();
  //   }
  //   console.log("first");
  // }, [conversation, xmtpClientAddress, peerAddress]);

  useEffect(() => {
    console.log("fetching");
    console.log(xmtpClientAddress, "client address");
    if (xmtpClientAddress) {
      fetchXmtpConversationList();
    }
  }, [xmtpClientAddress]);


  const _loadMessages = async(convData: any) => {
    const messages = await convData?.messages({
      direction: SortDirection.SORT_DIRECTION_ASCENDING,
    });
    const messagesData = messages?.map((item: any) => {
      return XmtpMessage$(item);
    });
    logger('xmtp', 'XMTPProvider._loadMessages', 'Messages is', [messagesData])
    // console.log("conversation", conversation.send("hulle hula le hula"));

    setMessages(messagesData);
  }

  const fetchXmtpConversation = async (channel: any) => {
    loggerInit('XMTPProvider.fetchXmtpConversation');
    const result = await xmtpClient.conversations.newConversation(
      channel?.id
    );
    logger('xmtp', 'XMTPProvider.fetchXmtpConversation', 'Conversation is', [result])
    _loadMessages(result)
    setConversation(result);
  };

  const fetchXmtpConversationList = async () => {
    const conversationList = await xmtpClient.conversations.list();
    const data = conversationList.map((item: any) => {
      return ChannelXMTP$(item);
    });
    setAllConversations(data);
  };

  const sendXmtpMessage = async (data: any) => {
    return await conversation.send(data.text);
  };

  useEffect(() => {
    console.log('useEffect[conversation]')
    _loadMessages(conversation);
  }, [conversation != (undefined || null)])

  return (
    <XmtpContext.Provider
      value={{
        fetchXmtpConversation: fetchXmtpConversation,
        sendXmtpMessage: sendXmtpMessage,
        fetchXmtpConversationList,
        allConversations: allConversations,
        conversation: conversation,
        messages: messages,
        xmtpClientAddress: xmtpClientAddress,
      }}
    >
      {children}
    </XmtpContext.Provider>
  );
};
